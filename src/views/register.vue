<template>
  <div class="box" id="login-form">
    <h1 class="title has-text-centered">用户注册</h1>
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input
          class="input"
          type="text"
          placeholder="用户名"
          v-model="user"
          :class="{'is-success': validateUser, 'is-danger': !validateUser}"
        >
        <span class="icon is-small is-left">
          <font-awesome-icon icon="user"/>
        </span>
        <span class="icon is-small is-right" v-if="validateUser">
          <font-awesome-icon icon="check"/>
        </span>
      </p>
    </div>
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input
          class="input"
          type="text"
          placeholder="昵称"
          v-model="nick"
          :class="{'is-success': validateNick, 'is-danger': !validateNick}"
        >
        <span class="icon is-small is-left">
          <font-awesome-icon icon="user"/>
        </span>
        <span class="icon is-small is-right" v-if="validateNick">
          <font-awesome-icon icon="check"/>
        </span>
      </p>
    </div>
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input
          class="input"
          type="email"
          placeholder="邮箱"
          v-model="mail"
          :class="{'is-success': validateMail, 'is-danger': !validateMail}"
        >
        <span class="icon is-small is-left">
          <font-awesome-icon icon="envelope"/>
        </span>
        <span class="icon is-small is-right" v-if="validateMail">
          <font-awesome-icon icon="check"/>
        </span>
      </p>
    </div>
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input
          class="input"
          type="password"
          placeholder="密码"
          v-model="pass"
          :class="{'is-success': validatePass, 'is-danger': !validatePass}"
        >
        <span class="icon is-small is-left">
          <font-awesome-icon icon="lock"/>
        </span>
        <span class="icon is-small is-right" v-if="validatePass">
          <font-awesome-icon icon="check"/>
        </span>
      </p>
    </div>
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input
          class="input"
          type="password"
          placeholder="重复密码"
          v-model="passRepeat"
          :class="{'is-success': validatePassMatch, 'is-danger': !validatePassMatch}"
        >
        <span class="icon is-small is-left">
          <font-awesome-icon icon="user-lock"/>
        </span>
        <span class="icon is-small is-right" v-if="validatePassMatch">
          <font-awesome-icon icon="check"/>
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
        <Captcha ref="captcha"/>
      </div>
    </div>
    <Notify :msg="message" :level="'is-danger'" @clear="clearMsg"/>
    <div class="field is-grouped">
      <p class="control">
        <a class="button is-primary" @click="register">注册</a>
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
import CaptchaImg from "../components/CaptchaImg.vue";
import Notification from "../components/notification.vue";
import User from "../model/user";
import Callback from "../model/generic";

@Component({
  components: {
    Captcha: CaptchaImg,
    Notify: Notification
  }
})
export default class RegisterPage extends Vue {
  jumpToLogin() {
    this.$router.push({ name: "login" });
  }

  message: string = "";
  clearMsg() {
    this.message = "";
  }

  user: string = "";
  mail: string = "";
  pass: string = "";
  passRepeat: string = "";
  captcha: string = "";
  nick = "";

  get validateMail() {
    return this.mail.match(".+@.+\\..+");
  }
  get validatePass() {
    return this.pass.length >= 6;
  }
  get validatePassMatch() {
    return this.validatePass && this.pass === this.passRepeat;
  }
  get validateUser() {
    return this.user.length > 2;
  }
  get validateNick() {
    return this.nick.length >= 2;
  }

  register() {
    if (!this.validateUser) {
      this.message = "用户名长度不能低于两位";
      return;
    }
    if (!this.validateNick) {
      this.message = "昵称长度不能低于两位";
      return;
    }
    if (!this.validateMail) {
      this.message = "邮箱格式不正确";
      return;
    }
    if (!this.validatePass) {
      this.message = "密码长度不能低于6位";
      return;
    }
    if (!this.validatePassMatch) {
      this.message = "两次输入的密码不匹配";
      return;
    }
    this.message = "";

    new User().Register(
      this.user,
      this.pass,
      this.mail,
      this.nick,
      this.captcha,
      new Callback(
        resp => {
          this.$router.push({ name: "login" });
        },
        (code, msg) => {
          this.message = msg;
          (this.$refs.captcha as CaptchaImg).reload();
        }
      )
    );
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
