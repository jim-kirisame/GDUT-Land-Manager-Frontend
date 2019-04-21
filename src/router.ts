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
        component: () => import("./views/userSetting.vue"),
        meta: {
          title: "我的信息"
        }
      },
      {
        path: "/user/:id",
        name: "userInfo",
        component: () => import("./views/user.vue"),
        props: (route) => ({ id: route.params.id }),
        meta: {
          title: "用户信息"
        }
      },
      {
        path: "/task",
        name: "tasks",
        component: () => import("./views/tasks.vue"),
        meta: {
          title: "任务列表"
        }
      },
      {
        path: "/task/:id",
        name: "task",
        component: () => import("./views/task.vue"),
        props: (route) => ({ id: route.params.id }),
        meta: {
          title: "任务信息"
        }
      }
    ]
});
