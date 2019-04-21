<template>
  <div class="tasks">
    <taskTable :tasks="searchResult"/>
    <notify :msg="message" level="is-danger" @clear="clear"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import TaskTable from "../components/taskTable.vue";
import Callback, { TaskInfo, UserInfo } from "../model/generic";
import User from "../model/user";
import Task from "../model/task";
import Notification from "../components/notification.vue";

@Component({
  components: {
    taskTable: TaskTable,
    notify: Notification
  }
})
export default class Tasks extends Vue {
  searchResult: Array<TaskInfo> = [];

  message: string = "";

  mounted() {
    this.reload();
  }

  reload() {
    let acl = Number(User.ACL);
    new Task().GetSelf(acl, new Callback(this.onSuccess, this.onFail));
  }

  onSuccess(data: any) {
    this.searchResult = data.data;
    this.clear();
  }
  onFail(code: number, msg: string) {
    this.message = msg;
  }
  clear() {
    this.message = "";
  }
}
</script>

<style lang="scss">
</style>
