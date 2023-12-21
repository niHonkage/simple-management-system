<script setup>
</script>
<template>
  <div class="main">
    <router-view></router-view>
  </div>
</template>
<style lang="scss" scoped>
.main{
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 61px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
