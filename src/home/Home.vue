<template>
    <div class="home" ref="home">
      <div class="v-home" ref="vHome">
        <!-- 切换蒙层 -->
        <div class="outerBox" v-if="isShowBox">
        </div>
        <div class="content" style="display: inline">
           <!-- <commonHeader></commonHeader> -->
          <div class="header" ref="header">
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
            <mt-swipe :auto="4000" :show-indicators="true">
              <mt-swipe-item v-for="(item, index) in swiperImg" :key="index"  @click.native="toDetailsSwiper(item.id)">
                <img :src="item.imgUrl">
              </mt-swipe-item>
            </mt-swipe>
          </div>
          <!-- 底部轮播图 -->
          <underSwiper></underSwiper>
          <commonFooter class="flagFooter" ref="footer"></commonFooter>
        </div>
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
import commonFooter from '../components/common/Footer.vue'
import underSwiper from '../components/swiper/HomeDownSwiper.vue'
import LoginMenu from '../menu/LoginMenu.vue'
import Menu from '../menu/Menu.vue'
import '../../static/js/kook.js'
import '../../static/js/kook.add.js'
export default {
  data() {
    return {
      swiperImg: [],
      isLogin: false,
      isShowBox: false
    }
  },
  components: {
    commonFooter,
    underSwiper,
    Menu,
    LoginMenu
  },
  methods: {
    getMainSwiper() {
      this.axios({
        method: 'get',
        url: 'mainSwiper/index.php'
      }).then(res => {
        res.data.forEach((ele, index) => {
          this.swiperImg.push(ele)
        })
      })
    },
    toDetailsSwiper(id) {
      this.$router.push(`/swiperDetails?id=${id}`)
    },
    getCard() {
      this.$router.push('/successCard')
    },
    getMenu() {
      this.$refs.menu.style.display = 'block'
      this.$refs.vHome.style.overflow = 'hidden'
      this.$refs.vHome.style.marginTop = 0
      this.$refs.home.style.perspective = '200px'
      this.$refs.home.style.overflow = 'hidden'
      this.$refs.vHome.style.width = '100%'
      this.$refs.vHome.style.height = '100%'
      this.isShowBox = true
      /* eslint-disable */
      kook('.v-home').toggle_cls('menu')
    }
  },
  created() {
    this.getMainSwiper()
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
.home {
  background-color: #000;
  .v-home {
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
    .content {
      width: 100%;
      height: 100%;
      background: #000;
      padding-top: 310px;
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
        margin-top: 320px;
        width: 100%;
        height: 1206px;
        background-color: #000;
        .swiper-wrapper {
          width: 100%;
          height: 100%;
          background: #f09;
        }
      }
    }
  }
}
// 切换动画
.home {
  .v-home {
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
