const Article = require("../models/articles");
const fs = require("fs");
const { request } = require("http");

// exports.createArticles = (request, response) => {
//   const articleObject = request.body;
//   if (request.file !== undefined) {
//     const article = new Article({
//       ...articleObject,
//       imageUrl: `${request.protocol}://${request.get("host")}/images/${
//         request.file.filename
//       }`,
//     });
//     article
//       .save()
//       .then(() => response.status(201).json({ message: "Objet enregistré !" }))
//       .catch((error) => response.status(400).json({ error }));
//   } else {
//     const article = new Article({
//       ...articleObject,
//     });
//     article
//       .save()
//       .then(() => response.status(201).json({ message: "Objet enregistré !" }))
//       .catch((error) => response.status(400).json({ error }));
//   }
// };

exports.createArticles = async (request, response) => {
  try {
    const articleObject = request.body;
    if (request.file !== undefined) {
      const article = new Article({
        ...articleObject,
        imageUrl: `${request.protocol}://${request.get("host")}/images/${
          request.file.filename
        }`,
      });
      await article.save();

      response.status(201).json({ message: "Objet enregistré !" });
    } else {
      const article = new Article({
        ...articleObject,
      });
      await article.save();
      response.status(201).json({ message: "Objet enregistré !" });
    }
  } catch (e) {
    response.status(400).json({ e });
  }
};

// exports.modifyArticles = (request, response) => {
//   const articleObject = request.file
//     ? {
//         ...request.body,
//         imageUrl: `${request.protocol}://${request.get("host")}/images/${
//           request.file.filename
//         }`,
//       }
//     : { ...request.body };
//   Article.findOne({ _id: request.params.id })
//     .then((article) => {
//       if (
//         request.auth.userId !== article.userId &&
//         request.body.isAdmin === false
//       ) {
//         return response.status(401).json({ message: "Requete non autorisée" });
//       }
//       if (request.file !== undefined) {
//         const filename = article.imageUrl.split("/images/")[1];
//         fs.unlink(`images/${filename}`, () => {});
//       }
//       Article.updateOne(
//         { _id: request.params.id },
//         { ...articleObject, _id: request.params.id }
//       )
//         .then(() => response.status(200).json({ message: "Objet modifié" }))
//         .catch((error) => response.status(400).json({ error }));
//     })
//     .catch((error) => response.status(500).json({ error }));
// };

exports.modifyArticles = async (request, response) => {
  const articleObject = request.file
    ? {
        ...request.body,
        imageUrl: `${request.protocol}://${request.get("host")}/images/${
          request.file.filename
        }`,
      }
    : { ...request.body };
  const article = await Article.findOne({ _id: request.params.id });
  try {
    if (
      request.auth.userId !== article.userId &&
      request.body.isAdmin === false
    ) {
      return response.status(401).json({ message: "Requete non autorisée" });
    }
    if (article.imageUrl !== undefined) {
      const filename = article.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {});
    }
    await Article.updateOne(
      { _id: request.params.id },
      { ...articleObject, _id: request.params.id }
    );
    response.status(200).json({ message: "Objet modifié" });
  } catch (e) {
    response.status(500).json({ e });
  }
};

// exports.deleteArticles = (request, response) => {
//   Article.findOne({ _id: request.body.postId })
//     .then((article) => {
//       if (
//         request.auth.userId !== article.userId &&
//         request.body.isAdmin === false
//       ) {
//         return response.status(401).json({ message: "Requete non autorisée" });
//       }
//       if (article.imageUrl !== undefined) {
//         const filename = article.imageUrl.split("/images/")[1];
//         fs.unlink(`images/${filename}`, () => {});
//       }
//       Article.deleteOne({ _id: request.body.postId })
//         .then(() => response.status(200).json({ message: "Objet supprimé" }))
//         .catch((error) => response.status(400).json({ error }));
//     })
//     .catch((error) => response.status(500).json({ error }));
// };

exports.deleteArticles = async (request, response) => {
  const article = await Article.findOne({ _id: request.body.postId });
  try {
    if (
      request.auth.userId !== article.userId &&
      request.body.isAdmin === false
    ) {
      return response.status(401).json({ message: "Requete non autorisée" });
    }
    if (article.imageUrl !== undefined) {
      const filename = article.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {});
    }

    await Article.deleteOne({ _id: request.body.postId });

    response.status(200).json({ message: "Objet supprimé" });
  } catch (e) {
    response.status(500).json({ e });
  }
};

// exports.getAllArticles = (request, response) => {
//   Article.find()
//     .then((articles) => response.status(200).json(articles))
//     .catch((e) => response.status(400).json({ e }));
// };

exports.getAllArticles = async (request, response) => {
  const article = await Article.find();
  try {
    response.status(200).json(article);
  } catch (e) {
    response.status(404).json({ e });
  }
};

// exports.getOneArticles = (request, response) => {
//   Article.findOne({ _id: request.params.id })
//     .then((article) => response.status(200).json(article))
//     .catch((e) => response.status(404).json({ e }));
// };

exports.getOneArticles = async (request, response) => {
  const article = await Article.findOne({ _id: request.params.id });
  try {
    response.status(200).json(article);
  } catch (e) {
    response.status(404).json({ e });
  }
};

// exports.like = (request, response) => {
//   Article.findOne({ _id: request.params.id })
//     .then((article) => {
//       const liked = article.usersLiked.includes(request.body.userId);
//       if (liked) {
//         article.likes--;
//         article.usersLiked = article.usersLiked.filter(
//           (user) => user !== request.body.userId
//         );
//       } else {
//         article.likes++;
//         article.usersLiked.push(request.body.userId);
//       }

//       Article.updateOne({ _id: request.params.id }, article)
//         .then(() => response.status(200).json({ article }))
//         .catch((err) => response.status(400).json({ err }));
//     })
//     .catch((error) => response.status(400).json({ error }));
// };

exports.like = async (request, response) => {
  try {
    const article = await Article.findOne({ _id: request.params.id });
    const liked = article.usersLiked.includes(request.body.userId);
    if (liked) {
      article.likes--;
      article.usersLiked = article.usersLiked.filter(
        (user) => user !== request.body.userId
      );
    } else {
      article.likes++;
      article.usersLiked.push(request.body.userId);
    }

    await Article.updateOne({ _id: request.params.id }, article);

    response.status(200).json({ article });
  } catch (e) {
    response.status(400).send("[Error]: " + e);
  }
};
