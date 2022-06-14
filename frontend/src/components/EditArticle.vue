<template>
  <div id="modifyArticle">
    <form action="/editarticle" method="put" id="formArticle">
      <div class="formInput">
        <label class="label" for="title"> Titre: </label><br />
        <input v-model="title" type="title" name="title" id="title" required />
      </div>
      <div class="formInput">
        <label class="label" for="description">Description: </label><br />
        <textarea
          v-model="desc"
          type="description"
          name="description"
          id="description"
          required
        ></textarea>
      </div>
      <div class="formInput">
        <img class="cardImg" v-if="imageUrl !== undefined" :src="imageUrl" />
        <label class="label" for="inputFile">Image: </label><br />
        <input
          type="file"
          name="inputFile"
          id="fileImg"
          @change="onFileChange"
        />
      </div>
      <div class="btnSignIn">
        <input
          type="submit"
          @click.prevent="modifyArticle"
          value="Sauvegarder"
        />
      </div>
    </form>
  </div>
</template>

<script>
import { modifyArticle } from "../utils/api";
import router from "../router/index.js";
import axios from "axios";

export default {
  name: "EditArticle",
  data() {
    return {
      imageUrl: null,
      title: null,
      desc: null,
    };
  },
  computed: {
    articleId() {
      return this.$route.params.articleId;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    async modifyArticle() {
      const data = new FormData();
      if (this.imageUrl !== null) {
        data.append("inputFile", this.imageUrl);
      }

      data.append("title", this.title);
      data.append("description", this.desc);
      data.append("isAdmin", this.user.isAdmin);

      if (this.titleChange === null && this.descChange === null) {
        alert("veuillez remplir le formulaire");
      } else {
        const response = await modifyArticle(this.articleId, data);
        try {
          console.log(response);
          router.push({ name: "home" });
        } catch (error) {
          console.log(error);
        }
      }
    },
    onFileChange(e) {
      this.imageUrl = e.target.files[0];
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/articles/" + this.articleId, {
        headers: {
          Authorization: "Bearer " + this.user.token,
        },
      })
      .then((response) => {
        (this.title = response.data.title),
          (this.desc = response.data.description);
        if (response.data.imageUrl !== undefined) {
          this.imageUrl = response.data.imageUrl;
        }
      })
      .catch((error) => console.log(error));
  },
};
</script>

<style scoped lang="scss">
.addArticle {
  background-color: white;
  width: 50%;
  margin: 50px auto auto auto;
  border-radius: 20px;
  padding: 10px 0 20px 0;
  box-shadow: 1px 1px 10px rgb(212 212 212);
}

.formInput {
  margin: 20px;
}

#title {
  width: 50%;
  height: 25px;
}

textarea {
  width: 50%;
  height: 100px;
  margin-top: 15px;
}

input {
  margin-top: 20px;
}
</style>
