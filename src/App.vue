<template>
  <div class="container">
    <div class="container main-content">
      <div class="info-placeholder">
        <nav class="navbar header" role="navigation" aria-label="main navigation">
          <div class="navbar-brand">
            <a @click="home">
              <img src="@/assets/logo.svg" class="logo">
            </a>
          </div>

          <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
              <a
                class="navbar-item"
                v-for="(item, index) in nav"
                :key="index"
                :class="navIndex === index ? 'item-active' : ''"
                @click="routerLink(index, item.path, item.abs)"
              >{{ item.title }}</a>
            </div>
            <div class="navbar-end">
              <navUser/>
            </div>
          </div>
        </nav>
        <div class="container" id="main-vp">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

// import stylesheet
import "bulma";

// import fontawesome icons
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCoffee,
  faEnvelope,
  faLock,
  faCheck,
  faCode,
  faUser,
  faUserLock
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import userNav from "./components/nav_user.vue";

library.add(faCoffee, faEnvelope, faLock, faCheck, faCode, faUser, faUserLock);
Vue.component("font-awesome-icon", FontAwesomeIcon);

@Component({
  components: {
    navUser: userNav
  }
})
export default class App extends Vue {
  nav = [
    { title: "登录", path: "/login" },
    { title: "Swagger", path: "/swagger/", abs: true }
  ];
  navIndex = 0;

  routerLink(index: number, path: string, abs: boolean) {
    if (abs !== undefined && abs) {
      window.location.href = path;
    } else {
      this.navIndex = index;
      this.$router.push(path);
    }
  }
  home() {
    this.navIndex = -1;
    this.$router.push("home");
  }
}
</script>

<style lang="scss">
body {
  background: #e6e6e6;
  color: #464646;
}

a:hover {
  color: #6591d8;
}
.main-content {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.info-placeholder {
  flex: 1;
}
$header-height: 60px;
.header {
  height: $header-height;
  nav {
    height: $header-height;
    line-height: $header-height;
    ul {
      display: inline;
    }
  }
}
.nav-item {
  display: inline-block;
  text-align: center;
  a {
    display: inline-block;
    padding: 0 20px 0 20px;
  }
  a,
  a:hover,
  a:active a:visited {
    color: #f0f0f0;
  }
  .item-active {
    background: #202020;
  }
}

$logo-margin: 5px;
.logo {
  height: $header-height - $logo-margin * 2;
  margin: $logo-margin;
  float: left;
}
</style>
