<template>
  <div class="columns">
    <div class="panel user-panel column is-one-quarter" v-if="user.uid > 0">
      <div class="panel-heading user-image">
        <figure class="image is-square">
          <img :src="imgUrl" @error="onImageLoadError">
        </figure>
      </div>
      <div class="panel-tabs user-name">{{user.name}}</div>
      <a class="panel-block" :href="mailHref">
        <span class="icon">
          <font-awesome-icon icon="envelope"/>
        </span>
        <p>{{user.mail}}</p>
      </a>
      <div class="panel-block">
        <span class="icon">
          <font-awesome-icon icon="user"/>
        </span>
        <p>{{userType}}</p>
      </div>
      <a class="panel-block" v-if="user.group !== null" @click="jumpToUser(user.group.uid)">
        <span class="icon">
          <font-awesome-icon icon="building"/>
        </span>
        <p>{{user.group.name}}</p>
      </a>
    </div>
    <notify :msg="message" level="is-danger" @clear="clear"/>
    <div class="column" v-if="id === 0">
      <UserSet />
      <Users v-if="user.type === 2"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import Callback, { UserInfo, UserUtils } from "../model/generic";
import User from "../model/user";
import Notification from "../components/notification.vue";
import UserSetting from "../components/userSetting.vue";
import GroupUsers from "../components/groupUsers.vue";

@Component({
  components: {
    notify: Notification,
    UserSet: UserSetting,
    Users: GroupUsers
  }
})
export default class UserInfoPage extends Vue {
  user: UserInfo = new UserInfo();

  @Prop() id!: number;
  @Watch("id")
  onIDChange(id: number) {
    if (id === 0) new User().GetMe(new Callback(this.onSuccess, this.onFail));
    else new User().GetUser(id, new Callback(this.onSuccess, this.onFail));
  }

  mounted() {
    this.onIDChange(this.id);
  }

  onSuccess(data: any) {
    this.user = data;
    this.imgUrl = this.calcImgUrl;
    this.clear();
  }
  onFail(code: number, msg: string) {
    this.user = new UserInfo();
    this.message = msg;
  }

  imgUrl = "";

  get calcImgUrl() {
    return UserUtils.getPicUrl(this.user.mail) + "?size=300&d=404";
  }

  onImageLoadError() {
    this.imgUrl = "/logo.svg";
  }

  get userType() {
    return UserUtils.typeStr(this.user.type);
  }

  get mailHref() {
    return "mailto:" + this.user.mail;
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

<style lang="scss">
.user-panel {
  background: white;
}
.user-image {
  padding: 0;
}
.user-name {
  font-size: 22px;
  height: 40px;
  line-height: 40px;
}
.icon + p {
  margin-left: 0.25em;
}
</style>
