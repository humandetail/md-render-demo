<template>
  <div id="app">
    <header class="header">
      这里Header
    </header>
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style lang="scss">
* { margin: 0; padding: 0; }
#app {
  padding-top: 60px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  & > .header {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60px;
    font-size: 18px;
    color: #fff;
    background-color: #0098ff;
  }
}
</style>
