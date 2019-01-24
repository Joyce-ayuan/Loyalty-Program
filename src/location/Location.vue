<template>
  <div class="outerLocation" ref="outerLocation">
    <div class="location" ref="location">
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
        <div class="content">
            <div class="title">
                <p>LOCATION</p>
            </div>
            <div class="info">
                <ul class="clearfix">
                    <li v-for="item in locations" :key="item.id" :calss="item.name" @click="details(item.name)">
                        <img :src="item.imgUrl" alt="">
                        <a href="#">
                            <p>{{item.name}}</p>
                            <p>{{item.area}}</p>
                        </a>
                    </li>
                </ul>
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
      locations: [],
      isLogin: false,
      isShowBox: false
    }
  },
  components: { Menu, LoginMenu, commonFooter },
  methods: {
    details(url) {
      let path = url
        .split(' ')
        .pop()
        .toLowerCase()
      this.$router.push(`${path}`)
    },
    getMenu() {
      this.$refs.menu.style.display = 'block'
      this.$refs.location.style.overflow = 'hidden'
      this.$refs.location.style.marginTop = 0
      this.$refs.location.style.height = '100%'
      this.$refs.outerLocation.style.perspective = '200px'
      this.$refs.outerLocation.style.overflow = 'hidden'
      this.isShowBox = true
      /* eslint-disable */
      kook('.location').toggle_cls('menu')
    },
    getCard() {
      this.$router.push('/successCard')
    }
  },
  created() {
    this.axios({
      methods: 'get',
      url: 'http://localhost/amy/location/index.php'
    }).then(res => {
      res.data.forEach((ele, index) => {
        this.locations.push(ele)
      })
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
.outerLocation {
  .location {
    width: 100%;
    height: 100vh;
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
    .content {
      padding-top: 285px;
      width: 100%;
      height: 100%;
      background-color: #000;
      .title {
        width: 100%;
        height: 100px;
        border: 2px solid @mainColor;
        text-align: center;
        position: fixed;
        top: 285px;
        left: 0;
        p {
          color: @mainColor;
          font-size: 50px;
          letter-spacing: 5px;
          line-height: 100px;
        }
      }
      .info {
        ul {
          li {
            width: 100%;
            height: 500px;
            position: relative;
            overflow: hidden;
            img {
              display: block;
              width: 100%;
              height: 100%;
              position: absolute;
            }
            a {
              display: block;
              margin-top: 300px;
              position: absolute;
              margin-left: 50%;
              transform: translateX(-50%);
              p {
                text-align: center;
                line-height: 70px;
                &:nth-child(1) {
                  color: @mainColor;
                  font-size: 50px;
                  font-weight: 700;
                  letter-spacing: 5px;
                }
                &:nth-child(2) {
                  color: #fff;
                  font-size: 40px;
                  letter-spacing: 5px;
                }
              }
            }
          }
        }
      }
    }
  }
}

// 切换效果
.outerLocation {
  .location {
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
