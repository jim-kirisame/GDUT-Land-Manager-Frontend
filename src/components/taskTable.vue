<template>
  <div class="task-table">
    <div class="task-header columns">
      <div class="column is-1">编号</div>
      <div class="column is-1">状态</div>
      <div class="column is-1">任务类型</div>
      <div class="column is-3">名称</div>
      <div class="column is-3">描述</div>
      <div class="column is-2">发布人</div>
      <div class="column is-1">更新日期</div>
    </div>
    <a
      class="columns task-item"
      v-for="(item, index) in tasks"
      :key="index"
      :class="index%2==0?'even':'odd'"
       @click="onClick(item.taskID)"
    >
      <div class="column is-1">{{item.taskID}}</div>
      <div class="column is-1">{{statusStr(item.status)}}</div>
      <div class="column is-1">{{typeStr(item.taskType)}}</div>
      <div class="column is-3">{{item.title}}</div>
      <div class="column is-3">{{item.description}}</div>
      <div class="column is-2">{{item.assigner.name}}</div>
      <div class="column is-1">{{dateStr(item.updateAt)}}</div>
    </a>
    <div v-if="tasks.length == 0">任务空空如也，快去添加一些吧！</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { TaskInfo, TaskUtils } from "../model/generic";

@Component
export default class TaskTable extends Vue {
  @Prop() private tasks: any;

  onClick(taskID: number) {
      this.$router.push({ name: "task", params: { id: taskID.toString() } });
  }

  dateStr(ts: number) {
    return TaskUtils.dateStr(ts);
  }

  statusStr(s: number) {
    return TaskUtils.statusStr(s);
  }

  typeStr(s: number) {
    return TaskUtils.typeStr(s);
  }
}
</script>

<style lang="scss" scoped>
.task-table {
  clear: both;
  font-size: 14px;
  .task-header {
    border-bottom: 1px solid #999;
  }
  .task-item {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  a.columns {
    color: inherit;
  }
  .task-item.odd {
    background: #f9f9f9;
  }
  .task-item:hover {
    background: #f3f3f3;
  }
  .task-item div {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
