<template>
  <div id="app">
    <img alt="Land logo" src="./assets/logo.svg" style="width: 300px">
    <HelloWorld msg="欢迎使用土地调查管理平台"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from './components/HelloWorld.vue'

// import stylesheet
import 'bulma'

// import fontawesome icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faCoffee)
Vue.component('font-awesome-icon', FontAwesomeIcon)

@Component({
  components: {
    HelloWorld
  }
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
