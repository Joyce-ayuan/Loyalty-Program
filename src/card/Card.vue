<template>
    <div class="cardIndex">
        <cardHeader></cardHeader>
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
</template>

<script>
import cardHeader from '../components/common/cardHeader.vue'
import commonFooter from '../components/common/Footer.vue'
export default {
  data() {
    return {
      cards: []
    }
  },
  components: { cardHeader, commonFooter },
  methods: {
    getCards() {
      this.axios({
        method: 'get',
        url: 'http://localhost/amy/card/index.php'
      }).then(res => {
        res.data.forEach((ele, index) => {
          this.cards.push(ele)
        })
      })
    },
    getDetails(id) {
      this.$router.push(`/cardDetails?id=${id}`)
    }
  },
  created() {
    this.getCards()
  }
}
</script>

<style lang="less" scoped>
@mainColor: #98843a;
.cardIndex {
  width: 100%;
  height: 100vh;
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
  .info {
    width: 1160px;
    height: 100%;
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
</style>
