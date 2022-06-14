import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import LoginForm from "../views/LoginForm.vue";
import SignIn from "../views/SignIn.vue";
import EditArticle from "../components/EditArticle.vue";
import GetOneArticle from "@/components/GetOneArticle.vue";
// ~/ racine donc p7_réseau ou frontend....

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: LoginForm,
  },
  {
    path: "/signin",
    name: "signin",
    component: SignIn,
  },
  {
    path: "/:articleId",
    name: "editarticle",
    component: EditArticle,
  },
  {
    path: "/:articleId",
    name: "getonearticle",
    component: GetOneArticle,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
