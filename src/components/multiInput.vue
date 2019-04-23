<template>
  <div class="single-search">
    <div class="field has-addons">
      <div class="control tags are-medium added-tag" v-if="savedUser.length > 0">
        <span class="tag" v-for="(item, index) in savedUser" :key="index">
          {{item.name}}
          <button class="delete is-small" @click="delUser(index)" :disabled="disabled"></button>
        </span>
      </div>
      <div class="control is-expanded">
        <input
          class="input"
          type="text"
          placeholder="搜索……"
          :value="textInput"
          @input="onInput($event.target.value)"
          :disabled="disabled"
        >
        <div class="search-result box" id="search-result" v-if="searchUser.length > 0">
          <ul>
            <a v-for="(item, index) in searchUser" :key="index" @click="itemClick(index)">
              <li>
                {{item.name}}
                <span class="has-text-weight-light">({{item.mail}})</span>
              </li>
            </a>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import Callback, { UserInfo } from "../model/generic";
import UserGroup from "../model/userGroup";

@Component
export default class multiInput extends Vue {
  @Prop()
  inputUser!: UserInfo[];

  searchUser: UserInfo[] = [];

  textInput: string = "";
  savedUser: UserInfo[] = [];

  @Prop()
  disabled!: boolean;

  @Prop()
  value!: UserInfo[];

  @Watch("value")
  watchVal(newVal: UserInfo[], oldVal: UserInfo[]) {
    this.savedUser = newVal;
    // 更新内容后去重
    this.setSearchUser(this.searchUser);
  }

  @Watch("inputUser")
  watchUser(newVal: UserInfo[], oldVal: UserInfo[]) {
    // 更新内容后去重
    this.setSearchUser(newVal);
  }

  onInput(text: string) {
    this.textInput = text;
    this.$emit("onInput", text);
  }

  // 添加一个
  itemClick(index: number) {
    this.setUser(this.searchUser[index]);
  }

  setUser(user: UserInfo) {
    this.savedUser.push(user);
    this.setSearchUser(this.searchUser);
    this.$emit("input", this.savedUser);
  }
  // 删除一个
  delUser(index: number) {
    this.savedUser.splice(index, 1);
    this.$emit("input", this.savedUser);
  }

  // 去重
  setSearchUser(user: UserInfo[]) {
    this.searchUser = [];
    user.forEach(element => {
      let hasKey = false;
      this.savedUser.forEach(a => {
        if (a.uid === element.uid) {
          hasKey = true;
        }
      });
      if (!hasKey) this.searchUser.push(element);
      else console.log("wtf");
    });
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

.added-tag {
  padding-right: 1em;
}
</style>
