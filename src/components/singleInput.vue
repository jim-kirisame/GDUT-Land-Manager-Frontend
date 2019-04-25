<template>
  <div class="field">
    <div class="control">
      <input
        class="input"
        type="text"
        placeholder="输入公司名字搜索……"
        :value="textInput"
        @input="onInput($event.target.value)"
        :class="{'is-success': savedUser.uid>0}"
        :disabled="disabled"
      >
      <UserList :users="users" @onSelect="itemClick"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import Callback, { UserInfo } from "../model/generic";
import User from "../model/user";
import UserSelectList from "./userSelectList.vue";

@Component({
  components: {
    UserList: UserSelectList
  }
})
export default class singleInput extends Vue {
  users: UserInfo[] = [];

  textInput: string = "";
  savedUser: UserInfo = new UserInfo();

  @Prop()
  value!: UserInfo;

  @Prop()
  disabled!: boolean;

  @Watch("value")
  watchVal(newVal: UserInfo) {
    if (newVal !== undefined) {
      this.savedUser = newVal;
      if (this.savedUser.name !== "") {
        this.textInput = this.savedUser.name;
      }
    }
  }

  mounted() {
    this.watchVal(this.value);
  }

  onInput(text: string) {
    this.textInput = text;
    if (this.savedUser.uid > 0) this.setUser(new UserInfo());

    this.reload();
  }

  itemClick(index: number) {
    this.setUser(this.users[index]);
    this.textInput = this.savedUser.name;

    this.users = [];
  }

  setUser(user: UserInfo) {
    if (this.savedUser !== user) {
      this.savedUser = user;
      this.$emit("input", this.savedUser);
    }
  }

  reload() {
    if (this.textInput.trim() !== "") {
      new User().SearchGroup(
        this.textInput.trim(),
        new Callback(this.onSuccess, this.onFail)
      );
    }
  }

  onSuccess(resp: any) {
    this.users = resp;
  }

  onFail(code: number, msg: string) {
    this.users = [];
    console.log(msg);
  }
}
</script>

<style lang="scss" scoped>
</style>
