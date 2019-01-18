<template>
    <div class="about">
        <commonHeader></commonHeader>
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
</template>

<script>
import commonHeader from '../components/common/Header.vue'
import commonFooter from '../components/common/Footer.vue'
export default {
  data() {
    return {
      swiperImgs: {},
      details: {}
    }
  },
  components: { commonHeader, commonFooter },
  created() {
    this.axios({
      methods: 'get',
      url: 'http://localhost/amy/about/index.php'
    }).then(res => {
      this.swiperImgs = res.data[0].swiperImg
      this.details = res.data[0]
      console.log(this.details)
    })
  }
}
</script>

<style lang="less" scoped>
@mainColor: #98843a;
.about {
  width: 100%;
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
      top: 275px;
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
</style>
