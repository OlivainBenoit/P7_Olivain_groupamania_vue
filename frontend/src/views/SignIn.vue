<template>
  <div class="cardForm">
    <h2>Inscription</h2>
    <div class="formLoginSignup">
      <p>
        Vous avez déja un compte ?<router-link to="/login">
          Connectez-vous</router-link
        >
      </p>
      <form>
        <div class="form-floating mb-3">
          <input
            v-model="userSignin.username"
            type="email"
            class="form-control"
            id="floatingUsername"
            placeholder="Bernard"
            required
          />
          <label for="floatingUsername">Nom d'utilisateur</label>
        </div>
        <div class="form-floating mb-3">
          <input
            v-model="userSignin.email"
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
            v-model="userSignin.password"
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
            required
          />
          <label for="floatingPassword">Mot de passe</label>
        </div>
        <button type="submit" class="btn btn-primary" @click.prevent="SignIn">
          S'inscrire
        </button>
      </form>
      <!-- <div>
        <form action="" method="get" id="formLogin">
          <div class="formUsername">
            <label class="label" for="username">Pseudo: </label><br>
            <input v-model="userSignin.username" type="username" name="username" id="username" required>
          </div>
          <div class="formEmail">
            <label class="label" for="email">Email: </label><br>
            <input v-model="userSignin.email" type="email" name="email" id="email" required>
          </div>
          <div class="formPassword">
            <label class="label" for="password">Mot de passe: </label><br>
            <input v-model="userSignin.password" type="password" name="password" id="password" required>
          </div>
          <div class="divBtnSignIn">
            <button class="btnSignIn" type="submit" @click.prevent="SignIn">S'inscrire</button>
          </div>
        </form>
      </div> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import router from "@/router/index.js";

export default {
  name: "SignIn",
  data() {
    return {
      userSignin: {
        email: null,
        password: null,
        username: null,
      },
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    SignIn() {
      if (this.userSignin.email === null || this.userSignin.password === null) {
        alert("veuillez remplir le formulaire");
      } else {
        axios
          .post("http://localhost:3000/api/auth/signup", this.userSignin, {})
          .then(function (response) {
            console.log(response);
            router.push({ name: "login" });
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
