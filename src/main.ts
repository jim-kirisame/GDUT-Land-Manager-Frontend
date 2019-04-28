import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import BaiduMap from "vue-baidu-map";

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

Vue.use(BaiduMap, {
  ak: "bi3cM05CiqzBraXrhif02TOSiCkpq3y1"
});

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});
