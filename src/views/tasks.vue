<template>
  <div class="tasks">
    <div class="button-group is-clearfix" v-if="addAble">
      <a class="button is-primary is-pulled-right" @click="addTask">
        <span class="icon">
          <font-awesome-icon icon="plus"/>
        </span>
        <span>添加任务</span>
      </a>
    </div>
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
    let aclStr = User.ACL;
    if (aclStr !== undefined) {
      let acl = Number(User.ACL);
      new Task().GetSelf(acl, new Callback(this.onSuccess, this.onFail));
    } else {
      this.$router.push({ name: "login" });
    }
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

  addTask() {
    this.$router.push({ name: "addTask" });
  }

  get addAble() {
    return User.ACL === "3";
  }
}
</script>

<style lang="scss">
.button-group {
  display: block;
}
.task-table {
  padding: 1em;
}
</style>
