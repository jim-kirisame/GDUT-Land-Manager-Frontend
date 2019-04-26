<template>
  <div>
    <div class="user-table">
      <div class="task-header columns">
        <div class="column is-1">ID</div>
        <div class="column">名称</div>
        <div class="column">邮箱</div>
        <div class="column">所属</div>
        <div class="column">类别</div>
        <div class="column"></div>
      </div>
      <div
        class="columns task-item"
        v-for="(item, index) in users"
        :key="index"
        :class="index%2==0?'even':'odd'"
      >
        <div class="column is-1">{{item.uid}}</div>
        <div class="column">{{item.name}}</div>
        <div class="column">{{item.mail}}</div>
        <div class="column">{{item.group === null ? "" : item.group.name}}</div>
        <div class="column">
          <div class="select">
            <select v-model="item.type">
              <option value="0">管理员</option>
              <option value="1">用户</option>
              <option value="2">企业</option>
              <option value="3">监管部门</option>
            </select>
          </div>
        </div>
        <div class="column">
          <div class="control">
            <a class="button is-link" @click="modify(index)">修改</a>
          </div>
        </div>
      </div>
      <div v-if="users.length == 0">用户数据加载失败了</div>
    </div>
    <nav class="pagination" role="navigation" aria-label="pagination">
      <a class="pagination-previous" :disabled="page === 0" @click="page--">上一页</a>
      <a class="pagination-next" :disabled="page >= maxPage - 1" @click="page++">下一页</a>
      <ul class="pagination-list">
        <li v-if="page >= 2">
          <a class="pagination-link" @click="page=0">1</a>
        </li>
        <li v-if="page >= 3">
          <span class="pagination-ellipsis">&hellip;</span>
        </li>
        <li v-if="page >= 1">
          <a class="pagination-link" @click="page=page-1">{{page}}</a>
        </li>
        <li>
          <a class="pagination-link is-current" aria-current="page">{{page + 1}}</a>
        </li>
        <li v-if="page + 1 < maxPage">
          <a class="pagination-link" @click="page=page+1">{{page + 2}}</a>
        </li>
        <li v-if="page + 3 < maxPage">
          <span class="pagination-ellipsis">&hellip;</span>
        </li>
        <li v-if="page + 2 < maxPage">
          <a class="pagination-link" @click="page=maxPage-1">{{maxPage}}</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import Callback, { UserInfo, UserUtils } from "../model/generic";
import User from "../model/user";

@Component
export default class UserList extends Vue {
  users: UserInfo[] = [];

  page = 0;
  maxPage = 1;

  @Watch("page")
  reload() {
    new User().GetUsers(
      10,
      this.page * 10,
      new Callback(this.onLoadSuccess, this.onLoadFail)
    );
  }

  mounted() {
    this.reload();
  }
  modify(index: number) {
    let user = this.users[index];
    new User().AlterUserACL(
      user.uid,
      user.type,
      new Callback(this.onModifySuccess, this.onLoadFail)
    );
  }

  onModifySuccess(data: any) {
    this.reload();
  }

  onLoadSuccess(data: any) {
    this.users = data.users;
    this.maxPage = Math.ceil(data.count / 10);
  }
  onLoadFail(code: number, msg: string) {
    this.maxPage = 0;
    this.users = [];
  }
  typeStr(arg: number) {
    return UserUtils.typeStr(arg);
  }
}
</script>

<style lang="scss">
.pagination {
  margin-top: 1em;
}
</style>
