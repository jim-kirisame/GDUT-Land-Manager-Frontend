import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    routes: [
      {
        path: "/login",
        name: "login",
        component: () => import("./views/login.vue"),
        meta: {
          title: "登录"
        }
      },
      {
        path: "/register",
        name: "register",
        component: () => import("./views/register.vue"),
        meta: {
          title: "注册"
        }
      },
      {
        path: "/",
        name: "home",
        component: () => import("./views/home.vue"),
        meta: {
          title: "主页 - 土地调查管理系统"
        }
      },
      {
        path: "/user",
        name: "user",
        component: () => import("./views/user.vue"),
        meta: {
          title: "我的信息"
        }
      },
      {
        path: "/user/:id",
        name: "userSet",
        component: () => import("./views/user.vue"),
        props: (route) => ({ id: route.params.id }),
        meta: {
          title: "专辑信息 - Touhou Music Library"
        }
      }
    ]
});
