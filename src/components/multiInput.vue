<template>
  <div class="multi-search">
    <div class="field has-addons">
      <div class="control tags are-medium added-tag" v-if="savedUser.length > 0">
        <span class="tag" v-for="(item, index) in savedUser" :key="index">
          <figure class="image is-32x32">
            <img class="is-rounded" :src="imgUrl(item)">
          </figure>
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
        <UserList :users="searchUser" @onSelect="itemClick" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import Callback, { UserInfo, UserUtils } from "../model/generic";
import UserGroup from "../model/userGroup";
import UserSelectList from "./userSelectList.vue";

@Component({
  components:{
    UserList: UserSelectList
  }
})
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
    this.updateList();
  }

  mounted() {
    this.savedUser = this.value;
  }

  @Watch("inputUser")
  watchUser(newVal: UserInfo[], oldVal: UserInfo[]) {
    // 更新内容后去重
    this.updateList();
  }

  onInput(text: string) {
    this.textInput = text;
    this.$emit("onInput", text);
  }

  // 添加一个
  itemClick(index: number) {
    this.$emit("add", this.searchUser[index]);
    this.setUser(this.searchUser[index]);
  }

  setUser(user: UserInfo) {
    this.savedUser.push(user);
    this.updateList();
    this.$emit("input", this.savedUser);
  }
  // 删除一个
  delUser(index: number) {
    this.$emit("remove", this.savedUser[index]);
    this.savedUser.splice(index, 1);
    this.$emit("input", this.savedUser);
  }

  // 去重
  updateList() {
    this.searchUser = [];
    this.inputUser.forEach(element => {
      let hasKey = false;
      this.savedUser.forEach(a => {
        if (a.uid === element.uid) {
          hasKey = true;
        }
      });
      if (!hasKey) this.searchUser.push(element);
    });
  }
  
  imgUrl(user: UserInfo) {
    return UserUtils.getPicUrl(user.mail) + "?size=50";
  }
}
</script>

<style lang="scss" scoped>
$lineHeight: 50px;

.multi-search {
  height: $lineHeight;
  .tag {
    height: $lineHeight;
    figure {
      margin-right: 0.5em;
    }
    button {
      margin-left: 0.5rem;
    }
  }
  input {
    height: $lineHeight;
  }
}

.added-tag {
  padding-right: 1em;
}
</style>
