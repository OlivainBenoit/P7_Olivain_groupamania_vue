<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <img v-if="imageUrl !== null" class="card-img-top" :src="imageUrl" />
        <img
          v-else
          class="card-img-top"
          src="@/../public/Images/No_image_available.jpg"
        />
        <div class="card-body">
          <h5 class="card-title">{{ title }}</h5>
          <p class="card-text">{{ desc }}</p>
          <div class="card-btn-group">
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                @click="deletePost"
                v-if="userId === this.user.userId || this.user.isAdmin === true"
              >
                <i class="fa-solid fa-trash-can"></i>
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                @click="modifyPost"
                v-if="userId === this.user.userId || this.user.isAdmin === true"
              >
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
            </div>
            <div class="btn-like">
              <a @click="sendLike">
                <i
                  v-if="onLike === false"
                  class="fa-solid fa-thumbs-up iconLike"
                ></i>
                <i v-else class="fa-solid fa-thumbs-up iconOnLike"></i>
              </a>
              <div class="countLike">
                {{ likes }}
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <small class="text-muted">Posté par {{ username }}</small>
          <small class="text-muted">{{ date }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router/index.js";

export default {
  name: "CardArticle",
  data() {
    return {
      likes: 0,
      onLike: false,
      title: null,
      desc: null,
      username: null,
      date: null,
      imageUrl: null,
      userId: null,
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
    deletePost() {
      var confirmPopUp = confirm(
        `Voulez-vous supprimer le post ${this.title} ?`
      );

      if (confirmPopUp) {
        axios
          .delete("http://localhost:3000/api/articles/" + this.articleId, {
            headers: {
              Authorization: "Bearer " + this.user.token,
            },
            data: {
              postId: this.articleId,
              isAdmin: this.user.isAdmin,
            },
          })
          .then(() => {
            window.location.reload();
          })
          .catch((error) => console.log(error));
      }
    },
    modifyPost() {
      router.push({
        name: "editarticle",
        params: { articleId: this.articleId },
      });
    },
    sendLike() {
      console.log(this.userId);
      axios
        .post(
          "http://localhost:3000/api/articles/" + this.articleId + "/like",
          {
            userId: this.user.userId,
          },
          {
            headers: {
              Authorization: "Bearer " + this.user.token,
            },
          }
        )
        .then((response) => {
          this.likes = response.data.article.likes;
          const userInArray = response.data.article.usersLiked.includes(
            this.user.userId
          );
          if (userInArray) {
            this.onLike = true;
          } else {
            this.onLike = false;
          }
        })
        .catch((error) => console.log(error));
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
          (this.desc = response.data.description),
          (this.username = response.data.username),
          (this.date = response.data.date),
          (this.userId = response.data.userId);
        if (response.data.imageUrl !== undefined) {
          this.imageUrl = response.data.imageUrl;
        }
        this.likes = response.data.likes;
        const userInArray = response.data.usersLiked.includes(this.user.userId);
        if (userInArray) {
          this.onLike = true;
        }
      })
      .catch((error) => console.log(error));
  },
};
</script>

<style scoped lang="scss">
.row {
  justify-content: center;
  margin: 30px 0;
}
.col {
  flex: 0 0 80%;
  margin: 10px 0;
}

.card-img-top {
  max-height: 400px;
  width: auto;
  object-fit: cover;
}

.card-footer {
  display: flex;
  justify-content: space-between;
}

.card-btn-group {
  display: flex;
  justify-content: space-between;
}

.btn-like {
  display: flex;
  align-items: center;
}

.countLike {
  display: flex;
  align-items: center;
  margin: 0 5px;
}

.iconLike {
  font-size: 20px;
  &:hover {
    color: green;
  }
}

.iconOnLike {
  color: green;
  font-size: 20px;
}

.btn-sm:hover {
  background-color: #fd2d01;
}
</style>
