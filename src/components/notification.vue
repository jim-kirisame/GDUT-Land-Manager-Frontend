<template>
  <div class="notification" :class="level" v-if="msg !== undefined && msg !== ''">
    <button class="delete" @click="click"></button>
    {{msg}}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Notification extends Vue {
  @Prop() private msg!: string;
  @Prop() private level!: string;
  click() {
    this.$emit("clear");
  }
}
</script>
