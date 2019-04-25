<template>
  <div class="search-result box" id="search-result" v-if="users.length > 0">
    <ul>
      <a v-for="(item, index) in users" :key="index" @click="itemClick(index)">
        <li>
          <span>
            <figure class="image is-32x32">
              <img class="is-rounded" :src="imgUrl(item)">
            </figure>
            {{item.name}}
            <span class="has-text-weight-light">({{item.mail}})</span>
          </span>
        </li>
      </a>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { UserInfo, UserUtils } from "../model/generic";

@Component
export default class UserSelectList extends Vue {
  @Prop()
  users!: UserInfo[];

  itemClick(index: number) {
    this.$emit("onSelect", index);
  }
  imgUrl(user: UserInfo) {
    return UserUtils.getPicUrl(user.mail) + "?size=50";
  }
}
</script>

<style lang="scss" scoped>
$padding: 6px;
$lineHeight: 50px;
.search-result {
  position: absolute;
  background: white;
  width: inherit;
  z-index: 1;
  padding: $padding 0;
  ul {
    margin: 0px;
    li {
      padding: $padding $padding * 2;
      span {
        display: flex;
        align-items: center;
        figure {
          margin-right: 0.3em;
        }
      }
    }
    a:hover li {
      background: #f5f5f5;
    }
  }
}
</style>
