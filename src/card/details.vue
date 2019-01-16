<template>
    <div class="details">
        <cardHeader></cardHeader>
        <div class="title">
            <p>MEMBERSHIP TIERS</p>
        </div>
        <div class="content">
            <div class="swiper">
                <mt-swipe :auto="2000">
                    <mt-swipe-item v-for="item in detailsInformation" :key="item.id">
                        <img :src="item.imgCardUrl" alt="">
                    </mt-swipe-item>
                </mt-swipe>
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
      detailsInformation: {}
    }
  },
  methods: {
    getDetails() {
      this.currentId = parseInt(location.href.split('?')[1])
      this.axios({
        methods: 'get',
        url: `http://localhost:3000/cards?id=${this.currentId}`
      }).then(res => {
        this.detailsInformation = res.data[0]
        console.log(this.detailsInformation)
      })
    }
  },
  components: { cardHeader, commonFooter },
  created() {
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
    height: 787px;
    background-color: #f98;
    margin: 40px auto;
    .swiper {
      width: 100%;
      height: 100%;
      img {
        width: 503px;
        height: 319px;
        // background-color: #f34;
        margin: 160px auto;
      }
    }
  }
}
</style>
