<template>
    <div class="details">
        <cardHeader></cardHeader>
        <div class="title">
            <p>BENEFITS</p>
        </div>
        <div class="content">
            <div class="swiper">
                <mt-swipe :auto="0" :defaultIndex="currentId-1" @change="getCardId">
                    <mt-swipe-item v-for="item in detailsInformation" :key="item.id">
                        <img :src="item.imgCardUrl" alt=""  :data-num="item.id" ref="cardId"  @touchend="getId($event)">
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
  components: { cardHeader, commonFooter },
  methods: {
    getCurentDetails(id) {
      id = this.currentId
      this.axios({
        methods: 'get',
        url: `http://localhost/amy/card/index.php?id=${id}`
      }).then(res => {
        this.currentInformation = res.data
      })
    },
    getDetails() {
      this.axios({
        methods: 'get',
        url: 'http://localhost/amy/card/index.php'
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
    }
  },
  created() {
    this.currentId = parseInt(location.href.split('?')[1].split('=')[1])
    this.getCurentDetails(this.currentId)
    this.getDetails()
  }
}
</script>

<style lang="less" scoped>
@mainColor: #98843a;
.details {
  width: 100%;
  padding-top: 280px;
  padding-bottom: 60px;
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
</style>
