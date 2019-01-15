<template>
    <div class="header">
        <div class="logo">
            <img src="@/assets/images/pong.jpg" alt="">
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.header {
  height: 277px;
  width: 100%;
  background-color: #000000;
  position: fixed;
  top: 0;
  left: 0;
  .logo {
    width: 350px;
    height: 88px;
    margin: 135px auto;
    img {
      width: 100%;
    }
  }
}
</style>
