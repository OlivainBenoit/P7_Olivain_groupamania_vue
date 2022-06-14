import axios from "axios";
import store from "@/store/index.js";

export async function modifyArticle(postId, data) {
  return await axios.put("http://localhost:3000/api/articles/" + postId, data, {
    headers: {
      Authorization: "Bearer " + store.getters.user.token,
    },
  });
}
