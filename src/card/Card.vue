<template>
    <div class="cardIndex" ref="cardIndex">
      <div class="membership" ref="membership">
        <!-- <cardHeader></cardHeader> -->
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
        </div>
        <div class="title">
            <p>MEMBERSHIP TIERS</p>
        </div>
        <div class="info">
            <ul class="clearfix">
                <li v-for="item in cards" :key="item.id" @click="getDetails(item.id)">
                    <div class="card"><img :src="item.imgCardUrl" alt=""></div>
                    <div class="desc">
                        <p>{{ item.cardName }}</p>
                        <p>{{ item.features }}</p>
                    </div>
                </li>
            </ul>
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
// import cardHeader from '../components/common/cardHeader.vue'
import commonFooter from '../components/common/Footer.vue'
import Menu from '../menu/Menu.vue'
import LoginMenu from '../menu/LoginMenu.vue'
import '../../static/js/kook.js'
import '../../static/js/kook.add.js'
export default {
  data() {
    return {
      cards: [],
      isLogin: false,
      isShowBox: false
    }
  },
  components: { commonFooter, Menu, LoginMenu },
  methods: {
    getCards() {
      this.axios({
        method: 'get',
        url: 'card/index.php'
      }).then(res => {
        this.cards = res.data
      })
    },
    getDetails(id) {
      this.$router.push(`/cardDetails?id=${id}`)
    },
    getMenu() {
      this.$refs.menu.style.display = 'block'
      this.$refs.membership.style.marginTop = 0
      this.$refs.cardIndex.style.perspective = '200px'
      this.$refs.cardIndex.style.overflow = 'hidden'
      this.isShowBox = true
      /* eslint-disable */
      kook('.membership').toggle_cls('menu')
    },
    getCard() {
      this.$router.push('/card')
    }
  },
  created() {
    this.getCards()
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
.cardIndex {
  .membership {
    width: 100%;
    height: 100%;
    padding-top: 280px;
    padding-bottom: 35px;
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
    }
    .title {
      width: 100%;
      height: 100px;
      border: 2px solid @mainColor;
      text-align: center;
      p {
        color: @mainColor;
        font-size: 50px;
        letter-spacing: 5px;
        line-height: 100px;
      }
    }
    .info {
      width: 1160px;
      height: 100vh;
      margin: 65px auto;
      ul {
        li {
          width: 579px;
          height: 446px;
          float: left;
          padding: 10px;
          margin-top: 20px;
          .card {
            width: 503px;
            height: 319px;
            background-color: yellowgreen;
            margin: 0 auto;
            margin-bottom: 20px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .desc {
            text-align: center;
            p {
              line-height: 60px;
            }
            p:nth-child(1) {
              font-size: 40px;
              color: #fff;
              letter-spacing: 5px;
            }
            p:nth-child(2) {
              color: @mainColor;
              letter-spacing: 5px;
            }
          }
        }
        li:last-child {
          position: relative;
          left: 50%;
          margin-left: -290px;
        }
      }
    }
  }
}

// 切换效果
.cardIndex {
  .membership {
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
