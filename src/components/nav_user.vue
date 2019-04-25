<template>
  <div class="navbar-item has-dropdown is-hoverable" v-if="logined">
    <a class="navbar-link">{{userName}}</a>

    <div class="navbar-dropdown">
      <a class="navbar-item" @click="jumpTo('userMe')">{{userACL}}</a>
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
    User.OnLoginStatusChange.on(this.onLoginStatusChange);
  }

  private onLoginStatusChange() {
    this.logined = User.IsLogin;
    this.userName = User.Name;
  }

  logined = User.IsLogin;
  userName = User.Name;

  get isAdmin() {
    return User.ACL === "0";
  }
  get isGroup() {
    return User.ACL === "2";
  }
  get userACL() {
    let acl = User.ACL;
    return UserUtils.typeStr(Number(acl));
  }
}
</script>
