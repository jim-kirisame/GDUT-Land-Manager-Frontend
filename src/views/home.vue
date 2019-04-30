<template>
  <div class="content">
    <figure class="image big-logo is-clearfix">
      <img src="@/assets/logo.svg" class="logo">
    </figure>
    <h1 class="title has-text-centered">土地调查管理系统</h1>
    <h2 class="subtitle has-text-centered">（这里写一句简短的概括性的话）</h2>
    <div class="description">
      <div class="columns">
        <div class="column has-text-centered">
          <p class="title is-4">全过程</p>
          <p class="subtitle is-6">对调查过程全程管理</p>
          <span class="icon is-large">
            <font-awesome-icon icon="tasks" size="3x"/>
          </span>
        </div>
        <div class="column has-text-centered">
          <p class="title is-4">可视化</p>
          <p class="subtitle is-6">将复杂的数据信息以图表形式列出</p>
          <span class="icon is-large">
            <font-awesome-icon icon="chart-area" size="3x"/>
          </span>
        </div>
      </div>
      <div class="columns">
        <div class="column has-text-centered">
          <p class="title is-4">开源化</p>
          <p class="subtitle is-6">所有代码都开源于Github上</p>
          <span class="icon is-large">
            <font-awesome-icon icon="code" size="3x"/>
          </span>
        </div>
        <div class="column has-text-centered">
          <p class="title is-4">轻量级</p>
          <p class="subtitle is-6">仅需一台手机即可完成繁复的调查任务</p>
          <span class="icon is-large">
            <font-awesome-icon icon="mobile-alt" size="3x"/>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.big-logo {
  max-width: 400px;
  margin: auto;
}
.description {
  margin-top: 6em;
  .icon {
    color: #22ac38;
  }
}
</style>
