<template>
  <button
    type="button"
    class="btn btn-primary btn-primary-top"
    data-bs-toggle="modal"
    data-bs-target="#staticBackdrop"
  >
    Creer un post
  </button>

  <!-- Modal -->
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="modal-close">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form
            action=""
            method="get"
            id="formArticle"
            class="form-floating mb-3"
          >
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"></label>
              <input
                v-model="title"
                type="email"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Titre"
              />
            </div>
            <div class="mb-3">
              <label
                for="exampleFormControlTextarea1"
                class="form-label"
              ></label>
              <textarea
                v-model="description"
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="Description"
              ></textarea>
            </div>
            <div class="mb-3">
              <label for="formFile" class="form-label"></label>
              <input
                class="form-control"
                type="file"
                name="inputFile"
                id="formFile"
                @change="onFileChange"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary btn-primary-center"
            @click.prevent="postArticle"
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddArticle",
  data() {
    return {
      title: null,
      description: null,
      imageUrl: null,
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    postArticle() {
      let dateNow = new Date();

      let dateLocal = dateNow.toLocaleString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });

      const data = new FormData();
      if (this.imageUrl !== null) {
        data.append("inputFile", this.imageUrl);
      }
      data.append("description", this.description);
      data.append("title", this.title);
      data.append("userId", this.user.userId);
      data.append("username", this.user.username);
      data.append("date", dateLocal);

      if (this.title === null && this.description === null) {
        alert("veuillez remplir le formulaire");
      } else {
        axios
          .post("http://localhost:3000/api/articles", data, {
            headers: {
              Authorization: "Bearer " + this.user.token,
            },
          })
          .then(function (response) {
            console.log(response);
            window.location.reload();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    onFileChange(e) {
      this.imageUrl = e.target.files[0];
    },
  },
};
</script>

<style scoped lang="scss">
.modal-footer {
  display: flex;
  justify-content: center;
}

.modal-close {
  display: flex;
  justify-content: flex-end;
}

.btn-primary {
  background-color: #fd2d01;
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

// .addArticle {
// background-color: white;
// width: 50%;
// margin: 50px auto auto auto;
// border-radius: 20px;
// padding: 10px 0 20px 0;
// box-shadow: 1px 1px 10px rgb(212 212 212);
// }

// .formInput{
//   margin: 20px;
// }

// #title{
//   width: 50%;
//   height: 25px;
// }

// textarea{
//   width: 50%;
//   height: 100px;
//   margin-top: 15px;
// }

// input {
//   margin-top: 20px;
// }
</style>
