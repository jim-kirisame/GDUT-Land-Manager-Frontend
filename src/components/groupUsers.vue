<template>
  <div>
    <Notify :msg="message" @clear="clear"/>
    <div class="fields">
      <div class="field">
        <label class="label">成员列表</label>
        <MultiInput
          v-model="users"
          :inputUser="usersSearch"
          :disabled="disabled"
          @onInput="onInput"
          @remove="onDel"
          @add="onAdd"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import multiInput from "../components/multiInput.vue";
import Callback, { UserInfo, GroupInfo } from "../model/generic";
import User from "../model/user";
import UserGroup from "../model/userGroup";
import Notification from "../components/notification.vue";

@Component({
  components: {
    MultiInput: multiInput,
    Notify: Notification
  }
})
export default class GroupUsers extends Vue {
  users: UserInfo[] = [];
  onInput(query: string) {
    if (query.trim() !== "") {
      new User().SearchUser(
        query.trim(),
        new Callback(this.onSearchCallback, this.onFail)
      );
    }
  }

  mounted() {
    this.reload();
  }

  reload() {
    new UserGroup().GetSelfGroup(
      new Callback(this.onReloadSuccess, this.onLoadFail)
    );
  }

  disabled = false;

  onLoadFail(code: number, msg: string) {
    if (code === 403) {
      this.disabled = true;
    }
    this.onFail(code, msg);
  }

  onReloadSuccess(resp: any) {
    let data = resp as GroupInfo;
    this.users = data.users !== undefined ? data.users : [];
  }

  usersSearch: UserInfo[] = [];
  onSearchCallback(data: any) {
    let users = data as UserInfo[];
    this.usersSearch = users.filter(ele => {
      return (
        ele.group === undefined || ele.group === null || ele.group.uid === 0
      );
    });
  }

  message: string = "";
  clear() {
    this.message = "";
  }

  onFail(code: number, msg: string) {
    this.message = msg;
  }
  onDel(user: UserInfo) {
    new UserGroup().DelUser(
      user.uid,
      new Callback(s => {
        this.reload();
      }, this.onFail)
    );
  }
  onAdd(user: UserInfo) {
    new UserGroup().AddUser(
      user.uid,
      new Callback(s => {
        this.reload();
      }, this.onFail)
    );
  }
}
</script>

<style lang="scss">
</style>
