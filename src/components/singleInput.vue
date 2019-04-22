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
      >
      <div class="search-result box" id="search-result" v-if="users.length > 0">
        <ul>
          <a v-for="(item, index) in users" :key="index" :data-id="index" @click="itemClick(index)">
            <li>
              {{item.name}}
              <span class="has-text-weight-light">({{item.mail}})</span>
            </li>
          </a>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import Callback, { UserInfo } from "../model/generic";
import User from "../model/user";

@Component
export default class singleInput extends Vue {
  users: UserInfo[] = [];

  textInput: string = "";
  savedUser: UserInfo = new UserInfo();

  @Prop()
  value!: UserInfo;

  @Watch("value")
  watchVal(newVal: UserInfo, oldVal: UserInfo) {
    this.savedUser = newVal;
  }

  onInput(text: string) {
    this.textInput = text;
    this.setUser(new UserInfo());

    this.reload();
  }

  itemClick(index: number) {
    this.setUser(this.users[index]);
    this.textInput = this.savedUser.name;

    this.users = [];
  }

  setUser(user: UserInfo) {
    this.savedUser = user;
    this.$emit("input", this.savedUser);
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
$padding: 6px;

.search-result {
  position: absolute;
  background: white;
  width: inherit;
  z-index: 1;
  padding: $padding 0;
  ul {
    margin: 0px;
    li {
      padding: $padding $padding * 2;
    }
    a:hover li {
      background: #f5f5f5;
    }
  }
}
</style>
