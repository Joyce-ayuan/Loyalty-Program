<template>
    <div class="successCard" ref="successCard">
        <div class="card" ref="card">
            <div class="header">
                <div class="nav" @click="getMenu">
                    <i class="fa fa-navicon"></i>
                </div>
                <div class="logo">
                    <img src="@/assets/images/pong.jpg" alt>
                </div>
            </div>
            <div class="content">
                <div class="main">
                    <img src="http://img3.imgtn.bdimg.com/it/u=2769449896,1336642811&fm=26&gp=0.jpg" alt="">
                </div>
                <div class="info">
                    <p class="tit">MEMBERSHIP NO.</p>
                    <p class="num">1123</p>
                    <div class="box">
                        <p class="gold">Membership Tier: GOLD</p>
                        <p class="name">NAME</p>
                        <p class="date">Date of Birth: <span>xx/xx/xxxx</span></p>
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
      console.log(11)
      this.$refs.menu.style.display = 'block'
      this.$refs.card.style.overflow = 'hidden'
      this.$refs.card.style.marginTop = 0
      this.$refs.successCard.style.perspective = '200px'
      this.$refs.successCard.style.overflow = 'hidden'
      /* eslint-disable */
      kook('.card').toggle_cls('menu')
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
@mainColor: #98843a;
.successCard {
  .card {
    width: 100%;
    height: 100%;
    background-color: #000;
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
    }
    .content {
      padding-top: 275px;
      .main {
        width: 858px;
        height: 550px;
        background-color: #f09;
        margin: 150px auto;
        img {
          width: 100%;
          height: 100%;
          display: block;
          background-color: #f98;
          margin: 100px auto;
        }
      }
      .info {
        width: 100%;
        height: 100%;
        text-align: center;
        margin-top: 100px;
        line-height: 150px;
        padding: 100px 190px 100px 190px;
        .tit {
          color: @mainColor;
          font-size: 60px;
          letter-spacing: 5px;
        }
        .num {
          color: #fff;
          font-size: 100px;
          letter-spacing: 50px;
        }
        .box {
          width: 100%;
          height: 100%;
          background-color: #000;
          border-top: 2px solid @mainColor;
          margin-top: 80px;
          p {
            color: #fff;
            line-height: 200px;
          }
          .gold {
            color: @mainColor;
            letter-spacing: 5px;
          }
          .name {
            font-size: 60px;
            letter-spacing: 20px;
          }
          .date {
            letter-spacing: 5px;
            span {
              color: @mainColor;
            }
          }
        }
      }
    }
  }
}

// 切换效果
.successCard {
  .card {
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
