<template>
  <div class="home" v-if="this.user.token !== null">
    <AddArticle />
    <div class="row row-cols-md-3">
      <CardArticle v-for="post in allPosts" v-bind:key="post.id" :post="post" />
    </div>
  </div>
</template>

<script>
import CardArticle from "../components/CardArticle.vue"
import axios from "axios";
import AddArticle from "@/components/AddArticle.vue"


export default {
  name: 'HomeArticle',
  data () {
    return {
      post: {
        title: "",
        description: "",
        imageUrl: "",
        username: "",
        date: ""
      },
      allPosts: [],
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  components: {
    CardArticle,
    AddArticle
},
  mounted() {
    axios.get("http://localhost:3000/api/articles", {
      headers: {
        Authorization: "Bearer " + this.user.token
        }
      })
        .then(response => { 
          this.allPosts = response.data;
        })
        .catch(error => {
          return error;
        })
  }
}

</script>

<style scoped lang="scss">


.row {
  margin: 0 10px;
  justify-content: center;
  flex-wrap: wrap-reverse;
  flex-direction: row-reverse;
}

h2 {
  font-size: 1.3em;
}

</style>