const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = (request, response) => {
  bcrypt
    .hash(request.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: request.body.email,
        password: hash,
        username: request.body.username,
      });
      user
        .save()
        .then(() =>
          response.status(201).json({ message: "Utilisateur crée !" })
        )
        .catch((error) => response.status(400).json({ error }));
    })
    .catch((error) => response.status(500).json({ error }));
};

exports.login = (request, response) => {
  console.log("request :", request.body);
  User.findOne({ email: request.body.email })
    .then((user) => {
      console.log(user);
      if (!user) {
        return response.status(401).json({ error: "Utilisateur non trouvé" });
      }
      bcrypt
        .compare(request.body.password, user.password)
        .then((valid) => {
          console.log("valid :", valid);
          if (!valid) {
            return response
              .status(401)
              .json({ error: "Mot de passe incorrect" });
          }
          response.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
            isAdmin: user.isAdmin,
            username: user.username,
          });
        })
        .catch((error) => response.status(500).json({ error }));
    })
    .catch((error) => response.status(500).json({ error }));
};
