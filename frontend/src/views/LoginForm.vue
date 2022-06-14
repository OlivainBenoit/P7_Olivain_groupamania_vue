<template>
  <div class="cardForm">
    <h2>Connexion</h2>
    <div class="formLoginSignup">
      <p>
        Vous n'avez pas de compte ?<router-link to="/signin">
          Inscrivez-vous</router-link
        >
      </p>
      <form>
        <div class="form-floating mb-3">
          <input
            v-model="userLogin.email"
            type="email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            required
          />
          <label for="floatingInput">Adresse email</label>
        </div>
        <div class="form-floating">
          <input
            v-model="userLogin.password"
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
            required
          />
          <label for="floatingPassword">Mot de passe</label>
        </div>
        <button type="submit" class="btn btn-primary" @click.prevent="login">
          Se connecter
        </button>
      </form>
      <!-- <div>
        <form action="" method="get" id="formLogin">
          <div class="formEmail">
            <label class="label" for="email">Email: </label><br>
            <input v-model="userLogin.email" type="email" name="email" id="email" required>
          </div>
          <div class="formPassword">
            <label class="label" for="password">Mot de passe: </label><br>
            <input v-model="userLogin.password" type="password" name="password" id="password" required>
          </div>
          <div class="btnSignIn">
            <button type="submit" @click.prevent="login">Se connecter</button>
          </div>
        </form>
      </div> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "../store/index.js";
import router from "../router/index.js";

export default {
  name: "LoginForm",
  store,
  data() {
    return {
      userLogin: {
        email: null,
        password: null,
      },
    };
  },
  methods: {
    login() {
      if (this.userLogin.email === null || this.userLogin.password === null) {
        alert("veuillez remplir le formulaire");
      } else {
        axios
          .post("http://localhost:3000/api/auth/login", {
            email: this.userLogin.email,
            password: this.userLogin.password,
          })
          .then((response) => {
            console.log(response.data);
            const user = {
              userId: response.data.userId,
              email: this.userLogin.email,
              token: response.data.token,
              isAdmin: response.data.isAdmin,
              username: response.data.username,
            };
            console.log("réponse: ", response);
            this.$store.commit("setUser", user);
            router.push({ name: "home" });
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.cardForm {
  background-color: white;
  width: 50%;
  margin: 50px auto auto auto;
  border-radius: 20px;
  padding: 10px 0 20px 0;
  box-shadow: 1px 1px 10px rgb(212 212 212);
}

.form-floating {
  width: 80%;
  margin: auto;
}

.btn-primary {
  background-color: #fd2d01;
  margin-top: 20px;
  &:hover {
    background-color: #4e5166;
  }
  &:focus {
    background-color: #fd2d01;
  }
  &-top {
    margin: 20px 0;
  }
}
</style>
