<template>
  <div id="app" class="container">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}

</script>
<!-- 手机端模式 -->
<script src="../static/js/mobile.js"></script>

<style>
@import '../static/css/common.css';
@import '../static/css/style.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
    width: 3.75rem;
    margin: 0 auto;
    overflow-x: hidden;
    min-height: 100%;
    position: relative;
}
</style>
