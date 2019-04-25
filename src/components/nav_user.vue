<template>
  <div class="navbar-item has-dropdown is-hoverable" v-if="logined">
    <a class="navbar-link" @click="jumpTo('userMe')">{{userName}}</a>

    <div class="navbar-dropdown">
      <p class="navbar-item">{{userName}} ({{userACL}})</p>
      <hr class="navbar-divider">
      <a class="navbar-item" @click="jumpTo('tasks')" v-if="!isAdmin">我的任务</a>
      <a class="navbar-item" @click="jumpTo('groupManager')" v-if="isGroup">成员管理</a>
      <a class="navbar-item" @click="jumpTo('admin')" v-if="isAdmin">管理</a>
      <a class="navbar-item" @click="jumpTo('userSetting')">用户设置</a>
      <hr class="navbar-divider">
      <a class="navbar-item" @click="logout">注销</a>
    </div>
  </div>
  <div class="navbar-item" v-else>
    <div class="buttons">
      <a class="button is-primary" @click="jumpTo('register')">
        <strong>注册</strong>
      </a>
      <a class="button is-light" @click="jumpTo('login')">登录</a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import User from "../model/user";
import Callback, { UserUtils } from "../model/generic";

@Component
export default class userNav extends Vue {
  jumpTo(name: string) {
    this.$router.push({ name: name });
    this.$emit("onNav");
  }

  logout() {
    new User().Logout(
      new Callback(
        a => {
          this.jumpTo("home");
        },
        (a, b) => {}
      )
    );
  }

  mounted() {
    this.onLoginStatusChange();
    User.OnLoginStatusChange.on(this.onLoginStatusChange);
  }

  private onLoginStatusChange() {
    this.logined = User.IsLogin;
    this.userName = User.Name;
    this.acl = Number(User.ACL);
    this.userACL = UserUtils.typeStr(this.acl);
  }

  logined = User.IsLogin;
  userName = User.Name;
  acl = 1;
  userACL = "";

  get isAdmin() {
    return this.acl === 0;
  }
  get isGroup() {
    return this.acl === 2;
  }
}
</script>
