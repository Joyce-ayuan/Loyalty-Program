<template>
    <div class="loginMenu">
        <div class="header">
            <div class="top">
              <i @click="getBack" class="fa fa-close"></i>
            </div>
        </div>
        <div class="main">
            <div class="headerPic"></div>
            <div class="content">
                <ul>
                    <li>NAME</li>
                    <li>132 points</li>
                    <li>...</li>
                    <li @click="getHistory">POINT HISTORY</li>
                    <li @click="getCard">CARD</li>
                    <li>...</li>
                    <li @click="getHome">HOME</li>
                    <li @click="getMembership">MEMBERSHIP.TIERS</li>
                    <li>...</li>
                    <li @click="getLocations">LOCATIONS</li>
                    <li @click="getMore">More</li>
                </ul>
            </div>
        </div>
        <commonFooter></commonFooter>
    </div>
</template>

<script>
import commonFooter from '../components/common/Footer.vue'
export default {
  inject: ['reload'],
  components: { commonFooter },
  methods: {
    // path：跳转路径  栗子：/home, /login
    jump(path) {
      if (location.href.split('#')[1] === path) {
        this.reload()
      } else {
        this.$router.push(path)
      }
    },
    getHome() {
      this.jump('/home')
    },
    getMembership() {
      this.jump('/card')
    },
    getLocations() {
      this.jump('/location')
    },
    getMore() {
      this.jump('/more')
    },
    getHistory() {
      this.jump('/personal')
    },
    getCard() {
      this.jump('/successCard')
    },
    getBack() {
      this.reload()
    }
  }
}
</script>

<style lang="less" scoped>
@mainColor: #98843a;
.loginMenu {
  width: 100%;
  //  =============================
  height: 100%;
  background-color: @mainColor;
  .header {
    width: 100%;
    height: 277px;
    background-color: @mainColor;
    position: fixed;
    top: 0;
    left: 0;
    .top {
      width: 100%;
      height: 100%;
      padding-left: 80px;
      i {
        color: #000;
        font-size: 89px;
        line-height: 277px;
      }
    }
  }
  .main {
    padding-top: 280px;
    overflow-y: auto;
    height: 100vh;
    .headerPic {
      width: 450px;
      height: 450px;
      background-color: #f09;
      border-radius: 50%;
      margin-left: 220px;
    }
    .content {
      width: 100%;
      padding: 80px;
      background-color: @mainColor;
      ul {
        li {
          font-size: 60px;
          letter-spacing: 13px;
          line-height: 120px;
          color: #000;
        }
      }
    }
  }
}
</style>
