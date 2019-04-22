<template>
  <div class="box">
    <Notify :msg="message" @clear="clear"/>
    <h1 class="title">添加任务</h1>
    <div class="field">
      <label class="label">任务名称</label>
      <div class="control">
        <input class="input" type="text" placeholder="任务的名称" v-model="task.title">
      </div>
    </div>
    <div class="field">
      <label class="label">任务描述</label>
      <div class="control">
        <textarea class="textarea" placeholder="简要描述一下任务的要求" v-model="task.description"></textarea>
      </div>
    </div>
    <div class="field">
      <label class="label">任务类型</label>
      <div class="control">
        <div class="select">
          <select v-model="task.taskType">
            <option value="0">初步调查任务</option>
            <option value="1" disabled>初布点任务</option>
            <option value="2" disabled>布点采样任务</option>
          </select>
        </div>
      </div>
    </div>
    <div class="field">
      <label class="label">指派人</label>
      <SingleInput v-model="task.assignee"/>
    </div>
    <div class="field">
      <div class="control">
        <button class="button is-link" @click="submit">提交</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import singleInput from "../components/singleInput.vue";
import multiInput from "../components/multiInput.vue";
import Callback, { UserInfo, TaskInfo } from "../model/generic";
import Task from "../model/task";
import Notification from "../components/notification.vue";

@Component({
  components: {
    SingleInput: singleInput,
    Notify: Notification
  }
})
export default class AddTask extends Vue {
  task = new TaskInfo();

  callback = new Callback(this.onSuccess, this.onFail);

  submit() {
    if (this.task.taskID > 0) {
      new Task().AlterTask(this.task, this.callback);
    } else {
      new Task().CreateTask(this.task, this.callback);
    }
  }

  onSuccess(data: any) {
    let id = this.task.taskID > 0 ? this.task.taskID.toString() : data;
    this.$router.push({
      name: "task",
      params: { id: id }
    });
  }

  message = "";
  clear() {
    this.message = "";
  }

  onFail(code: number, msg: string) {
    this.message = msg;
  }
}
</script>

<style>
</style>
