<template>
    <div class="details">
        <cardHeader></cardHeader>
        <div class="title">
            <p>MEMBERSHIP TIERS</p>
        </div>
        <div class="content">
            <div class="swiper">
                <mt-swipe :auto="0" :defaultIndex="currentId-1" @change="getCardId" ref="swiper">
                    <mt-swipe-item v-for="item in detailsInformation" :key="item.id">
                        <img :src="item.imgCardUrl" alt="" :data-id="item.id">
                    </mt-swipe-item>
                </mt-swipe>
            </div>
            <div class="info">
                <div class="top">
                  <!-- //$('.mint-swipe-items-wrap .is-active').dataset().id -->
                    <p>{{ currentInformation.companyName }}</p>
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
</template>

<script>
import cardHeader from '../components/common/cardHeader.vue'
import commonFooter from '../components/common/Footer.vue'
export default {
  data() {
    return {
      currentId: '',
      detailsInformation: [],
      currentInformation: {}
    }
  },
  methods: {
    getCurentDetails() {
      this.currentId = parseInt(location.href.split('?')[1])
      this.axios({
        methods: 'get',
        url: `http://localhost:3000/cards?id=${this.currentId}`
      }).then(res => {
        this.currentInformation = res.data[0]
        console.log(this.currentInformation)
      })
    },
    getDetails() {
      this.axios({
        methods: 'get',
        url: 'http://localhost:3000/cards'
      }).then(res => {
        res.data.forEach((ele, index) => {
          this.detailsInformation.push(ele)
        })
      })
    },
    // handleChange(index) {
    //   console.log(index)
    // },
    getCardId(id) {
      // console.log(document.querySelector('.swiper .is-active img').dataset.id)
      console.log(this.$refs.swiper)
    }
  },
  components: { cardHeader, commonFooter },
  created() {
    this.getCurentDetails()
    this.getDetails()
  }
}
</script>

<style lang="less" scoped>
@mainColor: #98843a;
.details {
  width: 100%;
  padding-top: 280px;
  padding-bottom: 35px;
  background: #000;
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
  .content {
    width: 1023px;
    height: 100%;
    margin: 40px auto;
    .swiper {
      width: 100%;
      height: 787px;
      img {
        width: 503px;
        height: 319px;
        margin: 160px auto;
      }
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
          }
          &:nth-child(2) {
            color: #fff;
            font-size: 50px;
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
        }
      }
    }
  }
}
</style>
