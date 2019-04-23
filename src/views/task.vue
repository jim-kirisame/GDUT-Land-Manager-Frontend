<template>
  <div>
    <div class="box" v-if="task.taskID > 0">
      <div class="columns">
        <div class="column is-four-fifths">
          <h1 class="title">{{task.title}}</h1>
        </div>
        <div class="column" v-if="editable">
          <a class="button is-primary is-pulled-right" @click="editTask">
            <span class="icon">
              <font-awesome-icon icon="edit"/>
            </span>
            <span>编辑</span>
          </a>
        </div>
      </div>

      <div class="tags">
        <span class="tag is-info">
          <span class="icon">
            <font-awesome-icon icon="capsules"/>
          </span>
          <span>{{taskStatus}}</span>
        </span>
        <span class="tag is-info">
          <span class="icon">
            <font-awesome-icon icon="book"/>
          </span>
          <span>{{taskType}}</span>
        </span>
        <a class="tag is-info" @click="jumpToUser(task.assigner.uid)">
          <span class="icon">
            <font-awesome-icon icon="user-tie"/>
          </span>
          <span>{{task.assigner.name}}</span>
        </a>
        <a
          class="tag is-info"
          v-if="task.assignee !== undefined && task.assignee.uid !== 0"
          @click="jumpToUser(task.assignee.uid)"
        >
          <span class="icon">
            <font-awesome-icon icon="user"/>
          </span>
          <span>{{task.assignee.name}}</span>
        </a>
        <span class="tag is-info">
          <span class="icon">
            <font-awesome-icon icon="clock"/>
          </span>
          <span>{{timeStr(task.createAt)}}</span>
        </span>
        <span class="tag is-info">
          <span class="icon">
            <font-awesome-icon icon="history"/>
          </span>
          <span>{{timeStr(task.updateAt)}}</span>
        </span>
        <span class="tag is-info" v-if="task.finishAt !== 0">
          <span class="icon">
            <font-awesome-icon icon="user-clock"/>
          </span>
          <span>{{timeStr(task.finishAt)}}</span>
        </span>
      </div>
      <p>{{task.description}}</p>
    </div>
    <Notify :msg="message" level="is-danger" @clear="clear"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import TaskTable from "../components/taskTable.vue";
import Callback, { TaskInfo, UserInfo, TaskUtils } from "../model/generic";
import Task from "../model/task";
import Notification from "../components/notification.vue";
import User from "../model/user";

@Component({
  components: {
    Notify: Notification
  }
})
export default class TaskPage extends Vue {
  @Prop()
  id!: number;
  task: TaskInfo = new TaskInfo();

  @Watch("id")
  onIDChange(id: number) {
    new Task().GetTask(id, new Callback(this.onSuccess, this.onFail));
  }

  mounted() {
    this.onIDChange(this.id);
  }

  onSuccess(resp: any) {
    this.task = resp;
    this.clear();
    this.editable = this.task.assigner.uid === User.UID || (this.task.assignee !== undefined && this.task.assignee.uid === User.UID);
  }

  editable = false;
  editTask() {
    this.$router.push({
      name: "editTask",
      params: { id: this.task.taskID.toString() }
    });
  }

  onFail(code: number, msg: string) {
    this.message = msg;
    this.task = new TaskInfo();
  }

  get taskStatus() {
    return TaskUtils.statusStr(this.task.status);
  }
  get taskType() {
    return TaskUtils.typeStr(this.task.taskType);
  }
  timeStr(ts: number) {
    return TaskUtils.dateStr(ts);
  }

  jumpToUser(id: number) {
    this.$router.push({ name: "userInfo", params: { id: id.toString() } });
  }

  message: string = "";
  clear() {
    this.message = "";
  }
}
</script>

<style lang="scss" scoped>
</style>
