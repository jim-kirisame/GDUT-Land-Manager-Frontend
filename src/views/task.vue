<template>
  <div class="box">
    <h1 class="title">{{task.title}}</h1>
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
      <a class="tag is-info" @click="jumpToUser(task.assigner.id)">
        <span class="icon">
          <font-awesome-icon icon="user-tie"/>
        </span>
        <span>{{task.assigner.name}}</span>
      </a>
      <a
        class="tag is-info"
        v-if="task.assignee !== undefined"
        @click="jumpToUser(task.assignee.id)"
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
      <span class="tag is-info" v-if="task.finishAt !== undefined">
        <span class="icon">
          <font-awesome-icon icon="user-clock"/>
        </span>
        <span>{{timeStr(task.finishAt)}}</span>
      </span>
    </div>
    <p>{{task.description}}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import TaskTable from "../components/taskTable.vue";
import { TaskInfo, UserInfo, TaskUtils } from "../model/generic";

@Component
export default class TaskPage extends Vue {
  @Prop()
  id!: number;

  task: TaskInfo = {
    taskID: 0,
    title: "测试初步调查任务 - 广东工业大学大学城校区生活西区",
    taskType: 0,
    description:
      "此任务需要调查广东工业大学大学城校区生活西区的各项土地指标，包括各宿舍区、饭堂和绿化区域的土地状况。这个按理来说应该要写很多很多很多很多东西才对，但是我暂时并不想在这里放下那么多东西了。asd",
    updateAt: 0,
    status: 0,
    createAt: 0,
    finishAt: 0,
    assigner: {
      uid: 0,
      name: "测试人",
      mail: "asd",
      type: 3,
      status: 0
    },
    assignee: {
      uid: 0,
      name: "指派人",
      mail: "asd",
      type: 3,
      status: 0
    }
  };

  @Watch("id")
  onIDChange(id: number) {}

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
}
</script>

<style lang="scss" scoped>
</style>
