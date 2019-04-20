<template>
  <div class="container root-container">
    <div class="main-content">
      <nav class="navbar header" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a @click="home">
            <img src="@/assets/logo.svg" class="logo">
          </a>
          <p class="navbar-item">土地调查管理系统</p>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start"></div>
          <div class="navbar-end">
            <a
              class="navbar-item"
              v-for="(item, index) in nav"
              :key="index"
              :class="navIndex === index ? 'item-active' : ''"
              @click="routerLink(index, item.path, item.abs)"
            >{{ item.title }}</a>
            <navUser/>
          </div>
        </div>
      </nav>
      <div class="container" id="main-vp">
        <router-view/>
      </div>
      <div class="push"></div>
    </div>
    <footer class="footer">Copyright &copy; 2019 Lotlab</footer>
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
  nav = [{ title: "Swagger", path: "/swagger/", abs: true }];
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
    this.$router.push({ name: "home" });
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

// sticky footer
html,
body,
.root-container {
  height: 100%;
}
.main-content {
  min-height: 100%;
  margin-bottom: -50px;
}
footer,
.push {
  height: 50px;
}

// footer style
.footer {
  padding: 1rem 1.5rem 1rem;
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

#main-vp {
  padding: 1rem;
}
</style>
