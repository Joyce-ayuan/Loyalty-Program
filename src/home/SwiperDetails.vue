<template>
<div class="outerHome" ref="outerHome">
    <div class="home" ref="home">
        <!-- <commonHeader></commonHeader> -->
        <!-- 切换蒙层 -->
        <div class="outerBox" v-if="isShowBox">
        </div>
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
        <!-- 主轮播图 -->
        <div class="mainSwiper">
            <img :src="mainImg" alt="">
        </div>
        <!-- 底部轮播图 -->
        <div class="underImg">
            <img src="" alt="首页轮播图点击进去显示土片">
        </div>
        <commonFooter></commonFooter>
    </div>
    <div class="menu" ref="menu" v-if="isLogin">
        <LoginMenu></LoginMenu>
    </div>
    <div class="menu" ref="menu" v-else>
        <Menu></Menu>
    </div>
</div>
</template>

<script>
import commonHeader from '../components/common/Header.vue'
import commonFooter from '../components/common/Footer.vue'
import Menu from '../menu/Menu.vue'
import LoginMenu from '../menu/LoginMenu.vue'
import '../../static/js/kook.js'
import '../../static/js/kook.add.js'
export default {
  data() {
    return {
      mainImg: '',
      isLogin: false,
      isShowBox: false
    }
  },
  components: {
    commonHeader,
    commonFooter,
    Menu,
    LoginMenu
  },
  methods: {
    getMenu() {
      this.$refs.menu.style.display = 'block'
      this.$refs.home.style.overflow = 'hidden'
      this.$refs.home.style.marginTop = 0
      this.$refs.outerHome.style.perspective = '200px'
      this.$refs.outerHome.style.overflow = 'hidden'
      this.isShowBox = true
      /* eslint-disable */
      kook('.home').toggle_cls('menu')
    },
    getCard() {
      this.$router.push('/successCard')
    }
  },
  created() {
    let id = parseInt(location.href.split('?')[1].split('=')[1])
    this.axios({
      method: 'get',
      url: `mainSwiper/index.php?id=${id}`
    }).then(res => {
      this.mainImg = res.data.imgUrl
    })

    if (parseInt(document.cookie.split('=')[1]) === 200) {
      this.isLogin = true
      console.log(this.isLogin)
    }
  },
  mounted() {
    this.$refs.menu.style.display = 'none'
  }
}
</script>

<style lang="less" scoped>
.outerHome {
  .home {
    width: 100%;
    background: #000;
    .outerBox {
      width: 100%;
      height: 100%;
      background-color: #fff;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 9999999;
      opacity: 0;
    }
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
    .mainSwiper {
      margin-top: 276px;
      width: 100%;
      height: 1206px;
      background-color: #000;
      img {
        display: block;
        width: 100%;
        height: 100%;
        background: #f98;
      }
    }
    .underImg {
      width: 100%;
      height: 680px;
      img {
        display: block;
        width: 100%;
        height: 100%;
        background: #f09;
        color: #fff;
        font-size: 90px;
      }
    }
  }
}

// 切换效果
.outerHome {
  .home {
    &.menu {
      margin-left: 80%;
      margin-top: -300px;
      backface-visibility: hidden;
      transition: 1s;
      transform: rotateY(-20deg);
      position: absolute;
      top: 0;
      left: 0;
      z-index: 99999;
    }
  }
}
</style>
