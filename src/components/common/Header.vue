<template>
  <div class="header">
    <div class="nav" @click="getMenu">
      <i class="fa fa-navicon"></i>
    </div>
    <div class="logo">
      <img src="@/assets/images/pong.jpg" alt>
    </div>
    <div class="card" @click="getCard">
      <button>CARD</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getMenu() {
      this.$router.push('/menu')
    },
    getCard() {
      this.$router.push('/card')
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  height: 277px;
  width: 100%;
  background-color: #000000;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  .logo {
    width: 350px;
    height: 88px;
    margin: 130px auto;
    img {
      width: 100%;
    }
  }
  .nav {
    position: absolute;
    top: 135px;
    left: 80px;
    i {
      color: #99843d;
      font-size: 89px;
    }
  }
  .card {
    position: absolute;
    top: 135px;
    right: 80px;
    button {
      width: 170px;
      height: 90px;
      background-color: #99843d;
      border-radius: 10px;
      color: #000000;
      letter-spacing: 5px;
    }
  }
}
</style>
