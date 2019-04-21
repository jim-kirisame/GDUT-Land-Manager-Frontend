<template>
  <div class="tasks">
    <taskTable :tasks="searchResult"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import TaskTable from "../components/taskTable.vue";
import { TaskInfo, UserInfo } from "../model/generic";

@Component({
  components: {
    taskTable: TaskTable
  }
})
export default class Tasks extends Vue {
  searchResult: Array<TaskInfo> = [
    {
      taskID: 0,
      title: "测试数据。标题",
      taskType: 0,
      description: "测试数据，描述",
      updateAt: 0,
      status: 0,
      createAt: 0,
      assigner: {
        uid: 0,
        name: "测试人",
        mail: "asd",
        type: 3,
        status: 0
      }
    },
    {
      taskID: 1,
      title: "测试标题",
      taskType: 1,
      description: "测试描述。这个描述应该会非常非常非常非常非常的长长长长长长长长长长",
      updateAt: 2,
      status: 1,
      createAt: 0,
      assigner: {
        uid: 0,
        name: "测试人",
        mail: "asd",
        type: 3,
        status: 0
      }
    }
  ];
}
</script>

<style lang="scss">
</style>
