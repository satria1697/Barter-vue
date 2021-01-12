import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Goods from "../views/Goods";
import frame from "../components/frame";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "frame",
    component: frame,
    children: [
      {
        path: "/home",
        name: "Home",
        component: Home
      },
      {
        path: "/goods/:goods_id",
        name: "goods",
        component: Goods
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
