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
      }/*,
      {
        path: "/playing",
        name: "playing",
        component: () => import("./views/Playing.vue"),
        meta: {
          title: "正在播放 - Touhou Music Library"
        }
      },
      {
        path: "/search",
        name: "search",
        component: () => import("./views/Search.vue"),
        props: (route) => ({ query: route.query.q }),
        meta: {
          title: "搜索 - Touhou Music Library"
        }
      },
      {
        path: "/album/:id",
        name: "album",
        component: () => import("./views/Album.vue"),
        props: (route) => ({ id: route.params.id }),
        meta: {
          title: "专辑信息 - Touhou Music Library"
        }
      }*/
    ]
});
