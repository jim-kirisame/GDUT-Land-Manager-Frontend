<template>
  <div class="root-container">
    <div class="main-content">
      <nav class="navbar has-shadow header" role="navigation" aria-label="main navigation">
        <div class="container">
          <div class="navbar-brand">
            <a @click="home">
              <img src="@/assets/logo.svg" class="logo">
            </a>
            <p class="navbar-item">土地调查管理系统</p>
            <a
              role="button"
              class="navbar-burger"
              data-target="navMenu"
              aria-label="menu"
              aria-expanded="false"
              :class="menuState ? 'is-active' : ''"
              @click="toggle"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasicExample" class="navbar-menu" :class="menuState ? 'is-active' : ''">
            <div class="navbar-start"></div>
            <div class="navbar-end">
              <a
                class="navbar-item"
                v-for="(item, index) in nav"
                :key="index"
                :class="navIndex === index ? 'item-active' : ''"
                @click="routerLink(index, item.path, item.abs)"
              >{{ item.title }}</a>
              <navUser @onNav="onNav"/>
            </div>
          </div>
        </div>
      </nav>
      <div class="container" id="main-vp">
        <router-view/>
      </div>
      <div class="push"></div>
    </div>
    <footer class="footer has-shadow">
      <div class="container">
        Copyright &copy; 2019 Lotlab
        <a class="is-pulled-right" target="_blank" href="/swagger/">API文档</a>
        </div>
    </footer>
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
  faUserLock,
  faTimes,
  faCapsules,
  faBook,
  faTasks,
  faClock,
  faUserClock,
  faUserTie,
  faHistory,
  faBuilding,
  faPlus,
  faEdit,
  faBackward
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import userNav from "./components/nav_user.vue";

library.add(
  faCoffee,
  faEnvelope,
  faLock,
  faCheck,
  faCode,
  faUser,
  faUserLock,
  faHistory,
  faCapsules,
  faBook,
  faTasks,
  faClock,
  faUserClock,
  faUserTie,
  faBuilding,
  faPlus,
  faEdit,
  faBackward
);
Vue.component("font-awesome-icon", FontAwesomeIcon);

@Component({
  components: {
    navUser: userNav
  }
})
export default class App extends Vue {
  nav = [];
  navIndex = 0;

  routerLink(index: number, path: string, abs: boolean) {
    if (abs !== undefined && abs) {
      window.location.href = path;
    } else {
      this.navIndex = index;
      this.$router.push(path);
    }
    this.onNav();
  }
  onNav() {
    // close menu
    this.menuState = false;
  }
  home() {
    this.navIndex = -1;
    this.$router.push({ name: "home" });
    this.onNav();
  }

  menuState = false;
  toggle() {
    this.menuState = !this.menuState;
  }
}
</script>

<style lang="scss">
body {
  color: #464646;
  font-family: "Noto Sans CJK SC", BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif
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

$secondary-bkg: #fafafa;
// footer style
.footer {
  padding: 1rem 1.5rem 1rem;
  background-color: $secondary-bkg;
}

$header-height: 50px;
.header {
  height: $header-height;
  background-color: $secondary-bkg;
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
