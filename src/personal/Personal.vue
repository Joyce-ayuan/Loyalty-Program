<template>
  <div class="personalCenter" ref="personalCenter">
      <div class="personal" ref="personal">
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
          <div class="title">
              <p>POINTS HISTORY</p>
          </div>
          <div class="content">
              <div class="pic">
                  <img src="" alt="">
              </div>
              <div class="tit">
                  <p>WELCOME NAME</p>
                  <p>Last Top Up</p>
              </div>
              <div class="info">
                  <p>$xxx</p>
                  <div class="diamond">
                      <img src="../assets/images/diamond.png" alt="">
                  </div>
                  <p>132</p>
                  <p>Points</p>
                  <p><span class="name">xxx</span> to the next tier!</p>
              </div>
              <div class="bottom">
                  <p>Expiration Date: <span class="date">xx/xx/xxxx</span></p>
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
import commonFooter from '../components/common/Footer.vue'
import Menu from '../menu/Menu.vue'
import LoginMenu from '../menu/LoginMenu.vue'
import '../../static/js/kook.js'
import '../../static/js/kook.add.js'
export default {
  data() {
    return {
      isLogin: false
    }
  },
  components: { commonFooter, LoginMenu, Menu },
  methods: {
    getMenu() {
      this.$refs.menu.style.display = 'block'
      this.$refs.personal.style.overflow = 'hidden'
      this.$refs.personal.style.marginTop = 0
      this.$refs.personalCenter.style.perspective = '200px'
      this.$refs.personalCenter.style.overflow = 'hidden'
      /* eslint-disable */
      kook('.personal').toggle_cls('menu')
    },
    getCard() {
      this.$router.push('/successCard')
    }
  },
  created() {
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
@mainColor: #8c722d;
.personalCenter {
  .personal {
    width: 100%;
    height: 100vh;
    padding-top: 280px;
    background: #000;
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
    .title {
      width: 100%;
      height: 100px;
      border: 2px solid @mainColor;
      text-align: center;
      position: fixed;
      background: #000;
      p {
        color: @mainColor;
        font-size: 50px;
        letter-spacing: 5px;
        line-height: 100px;
      }
    }
    .content {
      width: 100%;
      height: 100%;
      background: #000;
      padding-top: 70px;
      .pic {
        width: 100%;
        height: 650px;
        background-color: #000;
        img {
          width: 597px;
          height: 597px;
          background-color: #f09;
          border-radius: 50%;
          margin: 80px auto;
        }
      }
      .tit {
        width: 100%;
        height: 260px;
        background-color: #000;
        p {
          text-align: center;
          line-height: 100px;
          &:nth-child(1) {
            font-size: 80px;
            color: @mainColor;
            letter-spacing: 10px;
            padding-top: 50px;
          }
          &:nth-child(2) {
            color: #fff;
            letter-spacing: 10px;
          }
        }
      }
      .info {
        width: 100%;
        height: 785px;
        background: #000;
        p {
          text-align: center;
          &:nth-child(1) {
            color: @mainColor;
            font-size: 50px;
          }
          &:nth-child(3) {
            color: @mainColor;
            font-size: 100px;
            letter-spacing: 40px;
          }
          &:nth-child(4) {
            color: #fff;
            font-size: 60px;
            letter-spacing: 10px;
            margin-top: 10px;
          }
          &:nth-child(5) {
            color: #fff;
            font-size: 50px;
            letter-spacing: 5px;
            margin-top: 10px;
            .name {
              color: @mainColor;
            }
          }
        }
        .diamond {
          width: 250px;
          height: 250px;
          margin: 50px auto;
        }
      }
      .bottom {
        width: 100%;
        height: 200px;
        background: #000;
        border-top: 4px solid @mainColor;
        p {
          text-align: center;
          color: #fff;
          font-size: 50px;
          line-height: 150px;
          letter-spacing: 5px;
          .date {
            color: @mainColor;
          }
        }
      }
    }
  }
}

// 切换效果
.personalCenter {
  .personal {
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
