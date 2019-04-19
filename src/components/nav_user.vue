<template>
  <div class="navbar-item has-dropdown is-hoverable" v-if="logined">
    <a class="navbar-link">{{userName}}</a>

    <div class="navbar-dropdown">
      <a class="navbar-item">管理</a>
      <a class="navbar-item">用户设置</a>
      <hr class="navbar-divider">
      <a class="navbar-item" @click="logout">注销</a>
    </div>
  </div>
  <div class="navbar-item" v-else>
    <div class="buttons">
      <a class="button is-primary" @click="register">
        <strong>注册</strong>
      </a>
      <a class="button is-light" @click="login">登录</a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import User from "../model/user";
import Callback from '../model/generic';

@Component
export default class userNav extends Vue {
  register() {
    this.$router.push("register");
  }
  login() {
    this.$router.push("login");
  }
  logout() {
    new User().Logout(new Callback((a)=>{}, (a,b)=>{}));
  }
  get logined() {
    return User.IsLogin;
  }
  get userName() {
    return User.Name;
  }
}
</script>
