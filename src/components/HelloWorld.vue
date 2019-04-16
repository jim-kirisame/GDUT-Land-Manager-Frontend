<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>本网站正在开发中</h3>
    <ul>
      <li>
        <a href="/swagger/" target="_blank" rel="noopener">
        <font-awesome-icon icon="swagger" />Swagger API Document</a>
      </li>
      <li>
        <a
          href="https://code.lotlab.org/GDUT-Graduation/Land-Manager-Frontend"
          target="_blank"
          rel="noopener"
        >Frontend</a>
      </li>
      <li>
        <a
          href="https://code.lotlab.org/GDUT-Graduation/Land-Manager-Backend"
          target="_blank"
          rel="noopener"
        >Backend</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
