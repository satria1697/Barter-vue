import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Goods from "../views/Goods";
import frame from "../components/frame";
import Login from "../views/Login";
import Basket from "../views/Basket";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: frame,
    children: [
      {
        path: "/",
        name: "Home",
        component: Home
      },
      {
        path: "/goods/:goods_id",
        name: "goods",
        component: Goods
      },
      {
        path: "/basket",
        name: "basket",
        component: Basket
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: Login
  }
];

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

export default router;
