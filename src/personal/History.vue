<template>
  <div class="personalCenter" ref="personalCenter">
      <div class="personal" ref="personal">
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
          <div class="title" @click="getHistory">
              <p>POINTS HISTORY</p>
          </div>
          <div class="content">
              <div class="info" v-for="item in historyDetails" :key="item.id">
                  <p class="date">Date:{{ item.date }}</p>
                  <p class="location">Location:{{ item.location }}</p>
                  <p class="total">Total:{{ item.total }}</p>
                  <p class="points">Points gain:{{ item.points }}</p>
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
      isLogin: false,
      historyDetails: [],
      isShowBox: false
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
      this.isShowBox = true
      /* eslint-disable */
      kook('.personal').toggle_cls('menu')
    },
    getCard() {
      this.$router.push('/successCard')
    },
    getHistory() {
      console.log(11)
    }
  },
  created() {
    if (parseInt(document.cookie.split('=')[1]) === 200) {
      this.isLogin = true
      console.log(this.isLogin)
    }

    this.axios({
      methods: 'get',
      url: 'http://localhost/amy/history/index.php'
    }).then(res => {
      console.log(res)
      this.historyDetails = res.data
      console.log(this.historyDetails)
    })
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
      padding-top: 200px;
      padding-left: 100px;
      padding-right: 100px;
      overflow: hidden;
      .info {
        border-bottom: 2px solid @mainColor;
        padding-left: 100px;
        margin-top: 30px;
        p {
          color: #fff;
          font-size: 50px;
          line-height: 100px;
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
