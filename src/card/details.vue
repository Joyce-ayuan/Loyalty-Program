<template>
  <div class="outerDetails" ref="outerDetails">
      <div class="details" ref="details">
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
              <p>BENEFITS</p>
          </div>
          <div class="content">
              <div class="swiper">
                  <mt-swipe :auto="0" :defaultIndex="currentId-1" @change="getCardId">
                      <mt-swipe-item v-for="item in detailsInformation" :key="item.id">
                          <img :src="item.imgCardUrl" alt="" :data-num="item.id" ref="cardId"  @touchend="getId($event)">
                      </mt-swipe-item>
                  </mt-swipe>
              </div>
              <div class="info">
                  <div class="top">
                      <!-- <p>{{ currentInformation.companyName }}</p> -->
                      <p>{{ currentInformation.cardName }}</p>
                      <p>{{ currentInformation.features }}</p>
                  </div>
                  <div class="desc">
                      <p>{{ currentInformation.desc }}</p>
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
// import cardHeader from '../components/common/cardHeader.vue'
import commonFooter from '../components/common/Footer.vue'
import Menu from '../menu/Menu.vue'
import LoginMenu from '../menu/LoginMenu.vue'
import '../../static/js/kook.js'
import '../../static/js/kook.add.js'
export default {
  data() {
    return {
      currentId: '',
      detailsInformation: [],
      currentInformation: {},
      isLogin: false,
      isShowBox: false
    }
  },
  components: { commonFooter, Menu, LoginMenu },
  methods: {
    getCurentDetails(id) {
      id = this.currentId
      this.axios({
        methods: 'get',
        url: `card/index.php?id=${id}`
      }).then(res => {
        this.currentInformation = res.data
      })
    },
    getDetails() {
      this.axios({
        methods: 'get',
        url: 'card/index.php'
      }).then(res => {
        res.data.forEach((ele, index) => {
          this.detailsInformation.push(ele)
        })
      })
    },
    getId(e) {
      this.currentId = ''
      this.currentId = parseInt(e.target.getAttribute('data-num'))
    },
    getCardId() {
      this.getCurentDetails(this.currentId)
    },
    getMenu() {
      this.$refs.menu.style.display = 'block'
      this.$refs.details.style.overflow = 'hidden'
      this.$refs.details.style.marginTop = 0
      this.$refs.details.style.height = '100%'
      this.$refs.outerDetails.style.perspective = '200px'
      this.$refs.outerDetails.style.overflow = 'hidden'
      this.isShowBox = true
      /* eslint-disable */
      kook('.details').toggle_cls('menu')
    },
    getCard() {
      this.$router.push('/card')
    }
  },
  created() {
    this.currentId = parseInt(location.href.split('?')[1].split('=')[1])
    this.getCurentDetails(this.currentId)
    this.getDetails()
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
.outerDetails {
  .details {
    width: 100%;
    height: 100%;
    padding-top: 280px;
    padding-bottom: 60px;
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
      position: fixed;
      z-index: 9999;
      background: #000;
      p {
        color: @mainColor;
        font-size: 50px;
        letter-spacing: 5px;
        line-height: 100px;
      }
    }
    .content {
      width: 1023px;
      height: 100%;
      margin: 240px auto;
      .swiper {
        width: 100%;
        height: 787px;
        margin-top: 150px;
      }
      .info {
        width: 100%;
        height: 910px;
        .top {
          width: 100%;
          height: 215px;
          p {
            text-align: center;
            line-height: 70px;
            &:nth-child(1) {
              color: @mainColor;
              letter-spacing: 5px;
              font-weight: 700;
              font-size: 40px;
            }
            &:nth-child(2) {
              color: #fff;
              font-size: 60px;
              letter-spacing: 15px;
            }
            &:nth-child(3) {
              color: #fff;
              letter-spacing: 5px;
            }
          }
        }
        .desc {
          height: 692px;
          width: 100%;
          p {
            color: #fff;
            word-wrap: break-word;
            word-break: break-all;
            text-align: center;
            padding: 20px;
            font-size: 50px;
          }
        }
      }
    }
  }
}

// 切换效果
.outerDetails {
  .details {
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
