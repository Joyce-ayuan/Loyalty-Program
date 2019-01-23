<template>
  <div class="outerAbout" ref="outerAbout">
      <div class="about" ref="about">
          <!-- <commonHeader></commonHeader> -->
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
          <div class="content">
              <div class="title">
                  <p>LOCATION</p>
              </div>
              <div class="swiper">
                  <mt-swipe :auto="4000">
                      <mt-swipe-item v-for="item in swiperImgs" :key="item">
                          <img :src="item" alt="">
                      </mt-swipe-item>
                  </mt-swipe>
              </div>
              <div class="first">
                  <div class="tit">
                      <p>PONG HONG KONG</p>
                      <p>{{ details.simpleHeader }}</p>
                  </div>
                  <div class="text">
                      <p v-for="item in details.simpleIntroduce" :key="item.fullIntroduce">{{ item }}</p>
                  </div>
              </div>
              <div class="second clearfix">
                  <div class="details">
                      <img :src="details.img" alt="">
                      <P>RONALD CHIU</P>
                      <p>{{ details.fullHeader }}</p>
                      <p class="full" v-for="item in details.fullIntroduce" :key="item">{{ item }}</p>
                  </div>
              </div>
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
// import commonHeader from '../components/common/Header.vue'
import commonFooter from '../components/common/Footer.vue'
import Menu from '../menu/Menu.vue'
import LoginMenu from '../menu/LoginMenu.vue'
import '../../static/js/kook.js'
import '../../static/js/kook.add.js'
export default {
  data() {
    return {
      swiperImgs: {},
      details: {},
      isLogin: false
    }
  },
  components: { Menu, LoginMenu, commonFooter },
  methods: {
    getMenu() {
      this.$refs.menu.style.display = 'block'
      this.$refs.about.style.overflow = 'hidden'
      this.$refs.about.style.marginTop = 0
      this.$refs.about.style.height = '100%'
      this.$refs.outerAbout.style.perspective = '200px'
      this.$refs.outerAbout.style.overflow = 'hidden'
      /* eslint-disable */
      kook('.about').toggle_cls('menu')
    },
    getCard() {
      this.$router.push('/successCard')
    }
  },
  created() {
    this.axios({
      methods: 'get',
      url: 'http://localhost/amy/about/index.php'
    }).then(res => {
      this.swiperImgs = res.data[0].swiperImg
      this.details = res.data[0]
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
@mainColor: #98843a;
.outerAbout {
  .about {
    width: 100%;
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
    .content {
      padding-top: 385px;
      padding-bottom: 35px;
      width: 100%;
      height: 100%;
      background-color: #000;
      .title {
        width: 100%;
        height: 100px;
        border: 2px solid @mainColor;
        text-align: center;
        position: fixed;
        top: 280px;
        left: 0;
        z-index: 999;
        background-color: #000;
        p {
          color: @mainColor;
          font-size: 50px;
          letter-spacing: 5px;
          line-height: 100px;
        }
      }
      .swiper {
        width: 100%;
        height: 780px;
        margin-top: 50px;
      }
      .first {
        width: 100%;
        height: 100%;
        margin-top: 30px;
        .tit {
          p {
            text-align: center;
            line-height: 90px;
            &:nth-child(1) {
              font-size: 70px;
              color: #fff;
            }
            &:nth-child(2) {
              font-size: 40px;
              color: @mainColor;
            }
          }
        }
        .text {
          color: #fff;
          padding: 20px 80px;
          p {
            font-size: 50px;
            word-wrap: break-word;
            margin-top: 50px;
          }
        }
      }
      .second {
        width: 100%;
        height: 100%;
        background-color: #000;
        margin-top: 100px;
        padding: 0 80px 200px 80px;
        .details {
          img {
            float: left;
            width: 420px;
            height: 100%;
            display: inline-block;
            margin: 40px;
          }
          p {
            &:nth-child(2) {
              font-size: 70px;
              color: #fff;
            }
            &:nth-child(3) {
              font-size: 40px;
              color: @mainColor;
            }
          }
          .full {
            color: #fff;
            padding: 20px 17px;
            font-size: 50px;
            word-wrap: break-word;
            margin-top: 50px;
          }
        }
      }
    }
  }
}

// 切换效果
.outerAbout {
  .about {
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
