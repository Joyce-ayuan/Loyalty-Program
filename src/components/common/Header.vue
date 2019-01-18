<template>
  <div class="header">
    <div class="nav" @click="getMenuToggle">
      <i class="fa fa-navicon"></i>
    </div>
    <div class="logo">
      <img src="@/assets/images/pong.jpg" alt>
    </div>
    <div class="card" @click="getCard">
      <button>CARD</button>
    </div>
    <!-- <transition name="component-menu" mode="out-in">
      <component v-bind:is="view"></component>
    </transition> -->
  </div>
</template>

<script>
// import Home from '../../home/Home.vue'
// import Menu from '../../menu/Menu.vue'
export default {
  data() {
    return {
      view: 'v-a'
    }
  },
  // components: {
  //   'v-a': Home,
  //   'v-b': Menu
  // },
  methods: {
    getMenuToggle() {
      // if (this.view === Home) {
      //   this.view = 'v-b'
      // } else {
      //   this.view = 'v-a'
      // }
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
.component-fade-enter-active {
  /* transition: opacity .3s ease; */
  /* transform: translateX(200px) rotateX(45deg); */
  /* animation-name: animation1 10s; */
  /* transition: all 3s; */
  animation: bounce-in 1s linear;
}

.component-fade-leave-active {
  /* transform: translateX(-200px);
      transition: all 3s; */
  /* animation: bounce-in 1s; */
}

@keyframes bounce-in {
  0% {
    transform: translateX(800px);
  }

  50% {
    transform: translateX(500px);
  }

  100% {
    transform: translateX(200px);
  }
}
</style>
