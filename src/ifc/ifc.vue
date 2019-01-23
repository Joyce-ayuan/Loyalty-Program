<template>
  <div class="outerIfc" ref="outerIfc">
    <div class="ifc" ref="ifc">
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
                    <mt-swipe-item v-for="item in swiperImg" :key="item.id">
                        <img :src="item" alt="">
                    </mt-swipe-item>
                </mt-swipe>
            </div>
            <div class="info">
                <div class="tit">
                    <p>{{ details.name }}</p>
                    <p>{{ details.area }}</p>
                </div>
                <div class="base">
                    <div class="place">
                        <i class="fa fa-clock-o"></i>
                        <span>{{ details.address }}</span>
                    </div>
                    <div class="time">
                        <i class="fa fa-map-marker"></i>
                        <span>{{ details.time }}</span>
                    </div>
                    <div class="tel">
                        <i class="fa fa-phone"></i>
                        <span>{{ details.tel }}</span>
                    </div>
                    <div class="email">
                        <i class="fa fa-envelope-o"></i>
                        <span>{{ details.email }}</span>
                    </div>
                </div>
                <div class="line"></div>
                <div class="details">
                    <div class="upper"><p>Details</p></div>
                    <div class="venue">
                        <span class="head">Venu Size:</span>
                        <span class="full">{{ details.venueSize }}</span>
                    </div>
                    <div class="capacity">
                        <span class="head">Capacity:</span>
                        <span class="full">{{ details.capacity }}</span>
                    </div>
                </div>
                <div class="features">
                    <div class="upper"><p>Features</p></div>
                    <ul>
                        <li v-for="item in details.features" :key="item">{{ item }}</li>
                    </ul>
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
      swiperImg: [],
      details: {},
      isLogin: false
    }
  },
  components: { Menu, commonFooter, LoginMenu },
  methods: {
    getMenu() {
      this.$refs.menu.style.display = 'block'
      this.$refs.ifc.style.overflow = 'hidden'
      this.$refs.ifc.style.marginTop = 0
      this.$refs.ifc.style.height = '100%'
      this.$refs.outerIfc.style.perspective = '200px'
      this.$refs.outerIfc.style.overflow = 'hidden'
      /* eslint-disable */
      kook('.ifc').toggle_cls('menu')
    },
    getCard() {
      this.$router.push('/successCard')
    }
  },
  created() {
    this.axios({
      methods: 'get',
      url: 'http://localhost/amy/ifc/index.php'
    }).then(res => {
      res.data.forEach((ele, index) => {
        this.swiperImg = ele.imgUrl
      })
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
.outerIfc {
  .ifc {
    width: 100%;
    height: 100%;
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
        top: 279px;
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
        height: 830px;
        background-color: #000;
      }
      .tit {
        width: 100%;
        height: 140px;
        background: #000;
        margin-top: 50px;
        p {
          text-align: center;
          line-height: 70px;
          &:nth-child(1) {
            font-size: 50px;
            letter-spacing: 5px;
            color: @mainColor;
          }
          &:nth-child(2) {
            font-size: 40px;
            letter-spacing: 5px;
            color: #fff;
          }
        }
      }
      .base {
        width: 100%;
        height: 100%;
        margin-top: 50px;
        padding-left: 140px;
        & > div {
          width: 100%;
          height: 100%;
          background: #000;
          padding: 20px 15px;
          i {
            font-size: 60px;
            color: @mainColor;
            display: inline-block;
            width: 80px;
            height: 80px;
          }
          span {
            color: #fff;
            display: inline-block;
            padding-left: 40px;
            font-size: 45px;
          }
        }
      }
      .line {
        width: 110px;
        height: 5px;
        background-color: @mainColor;
        margin-left: 150px;
        margin-top: 50px;
      }
      .details {
        width: 100%;
        height: 100%;
        background: #000;
        padding-left: 150px;
        .venue,
        .capacity {
          padding: 12px 0;
          .head {
            font-size: 45px;
            color: #fff;
          }
          .full {
            font-size: 45px;
            color: #fff;
          }
        }
      }
      .features {
        padding-left: 150px;
        ul {
          padding: 30px 0 50px 70px;
          li {
            color: #fff;
            font-size: 45px;
            list-style-type: disc;
            line-height: 90px;
          }
        }
      }
      .upper {
        margin-top: 60px;
        p {
          color: @mainColor;
          font-size: 50px;
          font-weight: 700;
        }
      }
    }
  }
}

// 切换效果
.outerIfc {
  .ifc {
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
