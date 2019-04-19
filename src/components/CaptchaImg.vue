<template>
  <div class="image">
    <img :src="imgSrc" @click="reload">
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class CaptchaImg extends Vue {
  ts: number = new Date().getTime();

  get imgSrc() {
    return "https://land.bigkeer.cn/api/Captcha/image?ts=" + this.ts;
  }
  reload() {
    this.ts = new Date().getTime();
  }
}
</script>
