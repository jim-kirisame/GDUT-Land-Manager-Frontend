<template>
  <div class="box">
    <Notify :msg="message" @clear="clear"/>
    <h1 class="title" v-if="task.taskID <= 0">添加任务</h1>
    <h1 class="title" v-else>编辑任务</h1>
    <div class="field">
      <label class="label">任务名称</label>
      <div class="control">
        <input class="input" type="text" placeholder="任务的名称" v-model="task.title" :disabled="!editable">
      </div>
    </div>
    <div class="field">
      <label class="label">任务描述</label>
      <div class="control">
        <textarea class="textarea" placeholder="简要描述一下任务的要求" v-model="task.description" :disabled="!editable"></textarea>
      </div>
    </div>
    <div class="field">
      <label class="label">任务类型</label>
      <div class="control">
        <div class="select">
          <select v-model="task.taskType" :disabled="!editable">
            <option value="0">初步调查任务</option>
            <option value="1" disabled>初布点任务</option>
            <option value="2" disabled>布点采样任务</option>
          </select>
        </div>
      </div>
    </div>
    <div class="field">
      <label class="label">指派人</label>
      <SingleInput v-model="task.assignee" :disabled="!editable"/>
    </div>
    <div class="field">
      <div class="control">
        <button class="button is-link" @click="submit" :disabled="!editable">提交</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import singleInput from "../components/singleInput.vue";
import multiInput from "../components/multiInput.vue";
import Callback, { UserInfo, TaskInfo } from "../model/generic";
import Task from "../model/task";
import Notification from "../components/notification.vue";
import User from "../model/user";
import { faAtlas } from "@fortawesome/free-solid-svg-icons";

@Component({
  components: {
    SingleInput: singleInput,
    Notify: Notification
  }
})
export default class AddTask extends Vue {
  task = new TaskInfo();

  @Prop()
  id!: number;

  @Watch("id")
  onIdChange() {
    if (this.id > 0) {
      new Task().GetTask(
        this.id,
        new Callback(this.onLoadSuccess, this.onFail)
      );
    } else {
      this.task = new TaskInfo();
      this.message = "";
      this.editable = true;
    }
  }

  mounted() {
    this.onIdChange();
  }

  callback = new Callback(this.onSubmitSuccess, this.onFail);
  submit() {
    if (this.task.taskID > 0) {
      new Task().AlterTask(this.task, this.callback);
    } else {
      new Task().CreateTask(this.task, this.callback);
    }
  }

  onSubmitSuccess(data: any) {
    let id = this.task.taskID > 0 ? this.task.taskID.toString() : data;
    this.$router.push({
      name: "task",
      params: { id: id }
    });
  }

  editable = true;

  onLoadSuccess(data: any) {
    this.task = data;
    if (this.task.status !== 0) {
      this.message = "当前任务状态下无法编辑任务详情";
      this.editable = false;
      return;
    }
    if (this.task.assigner.uid !== User.UID) {
      this.message = "此任务不是当前用户创建的，无法编辑。";
      this.editable = false;
      return;
    }
    this.message = "";
    this.editable = true;
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
