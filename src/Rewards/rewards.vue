<template>
  <div class="outerRewards" ref="outerRewards">
    <div class="rewards" ref="rewards">
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
                <p>REWARDS RATES</p>
            </div>
            <div class="topic">
                <div class="icon">
                    <img src="@/assets/images/reward.png" alt="">
                </div>
                <div class="tit">
                    <p>GET REWARDS</p>
                    <P>HK$1 SPENT = 1 POINT</P>
                </div>
            </div>
            <div class="info"  v-for ="item in rewardMsg" :key="item.id">
                <p>{{ item.info }}</p>
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
      rewardMsg: [],
      isLogin: false
    }
  },
  methods: {
    getMenu() {
      this.$refs.menu.style.display = 'block'
      this.$refs.rewards.style.overflow = 'hidden'
      this.$refs.rewards.style.marginTop = 0
      this.$refs.rewards.style.height = '100%'
      this.$refs.outerRewards.style.perspective = '200px'
      this.$refs.outerRewards.style.overflow = 'hidden'
      /* eslint-disable */
      kook('.rewards').toggle_cls('menu')
    },
    getCard() {
      this.$router.push('/successCard')
    }
  },
  components: { Menu, commonFooter, LoginMenu },
  created() {
    this.axios({
      methods: 'get',
      url: 'http://localhost/amy/reward/index.php'
    }).then(res => {
      this.rewardMsg = res.data
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
.outerRewards {
  .rewards {
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
      padding-top: 275px;
      width: 100%;
      background-color: #000;
      .title {
        width: 100%;
        height: 100px;
        border: 2px solid @mainColor;
        text-align: center;
        position: fixed;
        background-color: #000;
        left: 0;
        p {
          color: @mainColor;
          font-size: 50px;
          letter-spacing: 5px;
          line-height: 100px;
        }
      }
      .topic {
        .icon {
          width: 100%;
          height: 100%;
          img {
            display: block;
            width: 483px;
            height: 180%;
            margin: 170px auto 50px;
          }
        }
        .tit {
          text-align: center;
          p {
            line-height: 100px;
            &:nth-child(1) {
              color: #fff;
              font-size: 80px;
              letter-spacing: 10px;
            }
            &:nth-child(2) {
              color: @mainColor;
              font-size: 50px;
              letter-spacing: 2px;
            }
          }
        }
      }
      .info {
        width: 100%;
        padding: 70px;
        &:nth-child(3) {
          margin-top: 100px;
        }
        p {
          color: #fff;
          font-size: 50px;
          word-wrap: break-word;
          line-height: 90px;
        }
      }
    }
  }
}

// 切换效果
.outerRewards {
  .rewards {
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
