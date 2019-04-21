<template>
  <div class="panel user-panel">
    <div class="panel-heading user-image">
      <figure class="image is-square">
        <img :src="imgUrl">
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
    <a class="panel-block" v-if="user.group !== undefined" @click="jumpToUser(user.group.uid)">
      <span class="icon">
        <font-awesome-icon icon="building"/>
      </span>
      <p>{{user.group.name}}</p>
    </a>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { UserInfo, UserUtils } from "../model/generic";
import { Md5 } from "ts-md5";

@Component
export default class UserInfoPage extends Vue {
  @Prop() id!: number;
  @Watch("id")
  onIDChange(id: number) {}

  user: UserInfo = {
    uid: 0,
    mail: "jim@lotlab.org",
    name: "Jim Jiang",
    type: 1,
    status: 0,
    group: {
      name: "宇宙工业大学",
      mail: "xxx@xxx.xxx",
      uid: 3
    }
  };

  get imgUrl() {
    let mail = this.user.mail.toLowerCase().trim();
    let hash = Md5.hashStr(mail);
    return "https://www.gravatar.com/avatar/" + hash + "?size=300";
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
}
</script>

<style lang="scss">
.user-panel {
  max-width: 300px;
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
