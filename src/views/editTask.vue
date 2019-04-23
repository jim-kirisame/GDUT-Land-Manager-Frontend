<template>
  <div class="box">
    <h1 class="title" v-if="task.taskID <= 0">添加任务</h1>
    <h1 class="title" v-else>编辑任务</h1>
    <Notify :msg="message" @clear="clear"/>
    <div class="fields">
      <h4 class="title is-4">任务信息</h4>
      <div class="field">
        <label class="label">任务名称</label>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="任务的名称"
            v-model="task.title"
            :disabled="!editable"
          >
        </div>
      </div>
      <div class="field">
        <label class="label">任务描述</label>
        <div class="control">
          <textarea
            class="textarea"
            placeholder="简要描述一下任务的要求"
            v-model="task.description"
            :disabled="!editable"
          ></textarea>
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
    <div class="fields" v-if="task.taskID > 0">
      <!-- 仅在修改任务时显示 -->
      <h4 class="title is-4">任务状态</h4>
      <label class="label">任务状态</label>
      <div class="field has-addons">
        <div class="control">
          <div class="select">
            <select v-model="task.status">
              <option value="0" :disabled="!canSetStatus(0)">新建</option>
              <option value="1" :disabled="!canSetStatus(1)">进行中</option>
              <option value="2" :disabled="!canSetStatus(2)">待审核</option>
              <option value="3" :disabled="!canSetStatus(3)">已完成</option>
            </select>
          </div>
        </div>
        <div class="control">
          <a class="button is-info" @click="updateTaskStatus">更新</a>
        </div>
      </div>
    </div>
    <div class="fields" v-if="task.taskID > 0 && isGroup">
      <!-- 仅在修改任务时显示 -->
      <h4 class="title is-4">任务分配</h4>
      <div class="field">
        <label class="label">任务分配</label>
        <MultiInput
          v-model="assign"
          :inputUser="assignSearch"
          @onInput="onInput"
          :disabled="!assignEditable"
        />
      </div>
      <div class="field">
        <div class="control">
          <a class="button is-link" @click="updateAssign" :disabled="!assignEditable">更新</a>
        </div>
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

@Component({
  components: {
    SingleInput: singleInput,
    Notify: Notification,
    MultiInput: multiInput
  }
})
export default class AddTask extends Vue {
  task = new TaskInfo();

  @Prop()
  id!: number;

  // preload
  @Watch("id")
  onIdChange() {
    if (this.id > 0) {
      new Task().GetTask(
        this.id,
        new Callback(this.onLoadSuccess, this.onFail)
      );
      if (this.isGroup) {
        new Task().GetAssign(
          this.id,
          new Callback(this.onAssignLoadSuccess, this.onFail)
        );
      }
    } else {
      this.task = new TaskInfo();
      this.message = "";
      this.editable = true;
    }
  }

  get isGroup() {
    return User.ACL === "2";
  }

  mounted() {
    this.onIdChange();
  }

  onLoadSuccess(data: any) {
    this.task = data;

    this.editable = true;
    this.message = "";

    if (this.task.status !== 0) {
      this.message += "当前任务状态下无法编辑任务详情";
      this.editable = false;
      return;
    }

    // 判断是否本人创建的
    this.editable = this.editable && this.task.assigner.uid === User.UID;

    // 判断是否可编辑
    this.assignEditable =
      this.task.assignee !== undefined && this.task.assignee.uid === User.UID;
  }

  message = "";
  clear() {
    this.message = "";
  }

  onFail(code: number, msg: string) {
    this.message = msg;
  }

  // submit
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

  // status
  canSetStatus(id: number) {
    let table1 = [
      [true, true, false, false],
      [true, true, true, false],
      [false, true, true, false],
      [false, false, false, true]
    ];
    let table2 = [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, true],
      [false, false, true, true]
    ];
    var acl = Number(User.ACL);
    if (acl === 2) {
      return table1[this.task.status][id];
    } else if (acl === 3) {
      return table2[this.task.status][id];
    }
  }

  updateTaskStatus() {
    new Task().SetStatus(
      this.task.taskID,
      this.task.status,
      new Callback(this.onUpdateStatusSuccess, this.onFail)
    );
  }

  onUpdateStatusSuccess(data: any) {
    this.message = "更新成功";
  }

  assign = new Array<UserInfo>();
  savedAssign = new Array<UserInfo>();
  onAssignLoadSuccess(data: any) {
    let res = data as UserInfo[];
    this.assign = data;
    this.savedAssign = [];
    Object.assign(this.savedAssign, this.assign);
  }

  assignSearch = new Array<UserInfo>();
  onInput(query: string) {
    if (query.trim() !== "") {
      new User().SearchUser(
        query.trim(),
        new Callback(this.onSearchCallback, this.onFail)
      );
    }
  }

  onSearchCallback(data: any) {
    let users = data as UserInfo[];
    this.assignSearch = users.filter(ele => {
      return ele.group !== undefined && ele.group.uid === User.UID;
    });
  }

  updateAssign() {
    new Task().AlterAssign(
      this.task.taskID,
      this.savedAssign,
      this.assign,
      new Callback(this.onUpdateAssignSuccess, this.onFail)
    );
  }

  onUpdateAssignSuccess(data: any) {
    this.message = "更新成功";
    this.savedAssign = [];
    Object.assign(this.savedAssign, this.assign);
  }

  assignEditable = true;
  editable = true;
}
</script>

<style>
.fields {
  margin-top: 1em;
}
.fields + .fields {
  border-top: 1px solid #ccc;
  padding-top: 1em;
}
</style>
