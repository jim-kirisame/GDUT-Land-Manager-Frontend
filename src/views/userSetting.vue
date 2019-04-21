<template>
  <div class="user-info box">
    <div class="field">
      <label class="label">昵称</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="填写你的新昵称"
          v-model="nick"
          :class="{'is-success': validateNick, 'is-danger': !validateNick}"
        >
      </div>
    </div>

    <div class="field">
      <label class="label">Email</label>
      <div class="control has-icons-left">
        <input class="input" type="email" disabled v-model="mail">
        <span class="icon is-small is-left">
          <font-awesome-icon icon="envelope"/>
        </span>
      </div>
    </div>
    <div class="field">
      <label class="label">当前密码</label>
      <p class="control has-icons-left has-icons-right">
        <input
          class="input"
          type="password"
          placeholder="旧密码"
          v-model="oldPass"
          :class="{'is-success': oldPass.length > 0 && validateOldPass, 'is-danger': oldPass.length > 0 && !validateOldPass}"
        >
        <span class="icon is-small is-left">
          <font-awesome-icon icon="lock"/>
        </span>
        <span class="icon is-small is-right" v-if="validateOldPass">
          <font-awesome-icon icon="check"/>
        </span>
      </p>
    </div>
    <div class="field">
      <label class="label">新的密码</label>
      <p class="control has-icons-left has-icons-right">
        <input
          class="input"
          type="password"
          placeholder="新密码"
          v-model="pass"
          :class="{'is-success': oldPass.length > 0 && validatePass, 'is-danger': oldPass.length > 0 && !validatePass}"
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
      <label class="label">重复输入新的密码</label>
      <p class="control has-icons-left has-icons-right">
        <input
          class="input"
          type="password"
          placeholder="重复密码"
          v-model="passRepeat"
          :class="{'is-success': oldPass.length > 0 && validatePassMatch, 'is-danger': oldPass.length > 0 && !validatePassMatch}"
        >
        <span class="icon is-small is-left">
          <font-awesome-icon icon="user-lock"/>
        </span>
        <span class="icon is-small is-right" v-if="validatePassMatch">
          <font-awesome-icon icon="check"/>
        </span>
      </p>
    </div>
    <Notify :msg="message" :level="messageLevel" @clear="clearMsg"/>
    <div class="field">
      <p class="control">
        <a class="button is-primary" @click="edit">修改用户信息</a>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import User from "../model/user";
import Callback from "../model/generic";
import Notification from "../components/notification.vue";

@Component({
    components: {
        Notify: Notification
    }
})
export default class UserPage extends Vue {
  mail: string = "";
  pass: string = "";
  passRepeat: string = "";
  oldPass: string = "";
  nick = "";

  get validatePass() {
    return this.pass.length >= 6;
  }
  get validatePassMatch() {
    return this.validatePass && this.pass === this.passRepeat;
  }
  get validateNick() {
    return this.nick.length >= 2;
  }
  get validateOldPass() {
    return this.oldPass.length >= 6;
  }

  mounted() {
    if (!User.IsLogin) {
      this.$router.push({ name: "login" });
      return;
    }
    this.reload();
  }

  reload() {
    let u = new User();
    u.GetMe(new Callback(this.onGetUserSuccess, this.onGetUserFail));
  }

  onGetUserSuccess(data: any) {
    this.mail = data.mail;
    this.nick = data.name;
  }
  onGetUserFail(code: number, msg: string) {
    this.$router.push({ name: "login" });
  }
  edit() {
    new User().AlterMe(
      this.nick,
      this.oldPass,
      this.pass,
      new Callback(this.onEditSuccess, this.onEditFail)
    );
  }

  message: string = "";
  messageLevel: string = "is-success";
  clearMsg() {
    this.message = "";
  }

  onEditSuccess(result: any) {
    this.message = "操作成功";
    this.messageLevel = "is-success";
    this.reload();
  }
  onEditFail(code: number, msg: string) {
    this.message = msg;
    this.messageLevel = "is-danger";
  }
}
</script>

<style lang="scss">
</style>
