<template>
  <div class="box" id="login-form">
    <h1 class="title has-text-centered">用户登录</h1>
    <div class="field">
      <p class="control has-icons-left">
        <input class="input" type="text" placeholder="用户名或邮箱" v-model="user">
        <span class="icon is-small is-left">
          <font-awesome-icon icon="user"/>
        </span>
      </p>
    </div>
    <div class="field">
      <p class="control has-icons-left">
        <input class="input" type="password" placeholder="密码" v-model="password">
        <span class="icon is-small is-left">
          <font-awesome-icon icon="lock"/>
        </span>
      </p>
    </div>
    <div class="field has-addons">
      <div class="control has-icons-left">
        <input class="input" type="text" placeholder="验证码" v-model="captcha">
        <span class="icon is-small is-left">
          <font-awesome-icon icon="code"/>
        </span>
      </div>
      <div class="control">
        <Capt ref="captcha" />
      </div>
    </div>
    <Notify :msg="message" :level="'is-danger'" @clear="clearMsg"/>
    <div class="field is-grouped">
      <p class="control">
        <a class="button is-primary" @click="login">登录</a>
      </p>
      <p class="control">
        <a class="button is-light" @click="jumpToRegister">注册</a>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import User from "../model/user";
import Callback from "../model/generic";
import Notification from "@/components/notification.vue";
import CaptchaImg from "@/components/CaptchaImg.vue";

@Component({
  components: {
    Notify: Notification,
    Capt: CaptchaImg
  }
})
export default class LoginPage extends Vue {
  user: string = "";
  password: string = "";
  captcha: string = "";
  message: string = "";

  jumpToRegister() {
    this.$router.push({ name: "register" });
  }
  login() {
    new User().Login(
      this.user,
      this.password,
      this.captcha,
      new Callback(
        resp => {
          this.$router.push({ name: "home" });
        },
        (code, msg) => {
          this.message = msg;
          (this.$refs.captcha as CaptchaImg).reload();
        }
      )
    );
  }
  clearMsg() {
    this.message = "";
  }
}
</script>

<style lang="scss">
#login-form {
  max-width: 400px;
  margin: auto;
  margin-top: 10vh;
}
</style>
