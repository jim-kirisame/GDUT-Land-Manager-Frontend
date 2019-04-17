<template>
  <div class="box" id="login-form">
    <h1 class="title has-text-centered">用户注册</h1>
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input class="input" type="text" placeholder="用户名">
        <span class="icon is-small is-left">
          <font-awesome-icon icon="user"/>
        </span>
        <span class="icon is-small is-right">
          <font-awesome-icon icon="check"/>
        </span>
      </p>
    </div>
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input class="input" type="email" placeholder="邮箱">
        <span class="icon is-small is-left">
          <font-awesome-icon icon="envelope"/>
        </span>
        <span class="icon is-small is-right">
          <font-awesome-icon icon="check"/>
        </span>
      </p>
    </div>
    <div class="field">
      <p class="control has-icons-left">
        <input class="input" type="password" placeholder="密码">
        <span class="icon is-small is-left">
          <font-awesome-icon icon="lock"/>
        </span>
      </p>
    </div>
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input class="input" type="password" placeholder="重复密码">
        <span class="icon is-small is-left">
          <font-awesome-icon icon="user-lock"/>
        </span>
        <span class="icon is-small is-right">
          <font-awesome-icon icon="check"/>
        </span>
      </p>
    </div>
    <div class="field has-addons">
      <div class="control has-icons-left">
        <input class="input" type="text" placeholder="验证码">
        <span class="icon is-small is-left">
          <font-awesome-icon icon="code"/>
        </span>
      </div>
      <div class="control">
        <img src="https://land.bigkeer.cn/api/Captcha/image">
      </div>
    </div>
    <div class="field is-grouped">
      <p class="control">
        <a class="button is-primary">注册</a>
      </p>
      <p class="control">
        <a class="button is-light" @click="jumpToLogin">登录</a>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class RegisterPage extends Vue {
  jumpToLogin() {
    this.$router.push({ name: "login" });
  }
}
</script>

<style lang="scss">
#login-form {
  max-width: 400px;
  margin: auto;
  margin-top: 25vh;
}
</style>
