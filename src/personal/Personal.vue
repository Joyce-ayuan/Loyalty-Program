<template>
    <div class="personal">
        <commonHeader></commonHeader>
        <div class="title">
            <p>POINTS HISTORY</p>
        </div>
        <div class="content">
            <div class="pic">
                <img src="" alt="">
            </div>
            <div class="tit">
                <p>WELCOME NAME</p>
                <p>Last Top Up</p>
            </div>
            <div class="info">
                <p>$xxx</p>
                <div class="diamond">
                    <img src="../assets/images/diamond.png" alt="">
                </div>
                <p>132</p>
                <p>Points</p>
                <p><span class="name">xxx</span> to the next tier!</p>
            </div>
            <div class="bottom">
                <p>Expiration Date: <span class="date">xx/xx/xxxx</span></p>
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
    return {}
  },
  components: { commonHeader, commonFooter }
}
</script>

<style lang="less" scoped>
@mainColor: #8c722d;
.personal {
  padding-top: 280px;
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
    width: 100%;
    height: 100%;
    background: #000;
    .pic {
      width: 100%;
      height: 650px;
      background-color: #000;
      img {
        width: 597px;
        height: 597px;
        background-color: #f09;
        border-radius: 50%;
        margin: 80px auto;
      }
    }
    .tit {
      width: 100%;
      height: 260px;
      background-color: #000;
      p {
        text-align: center;
        line-height: 100px;
        &:nth-child(1) {
          font-size: 80px;
          color: @mainColor;
          letter-spacing: 10px;
          padding-top: 50px;
        }
        &:nth-child(2) {
          color: #fff;
          letter-spacing: 10px;
        }
      }
    }
    .info {
      width: 100%;
      height: 785px;
      background: #000;
      p {
        text-align: center;
        &:nth-child(1) {
          color: @mainColor;
          font-size: 50px;
        }
        &:nth-child(3) {
          color: @mainColor;
          font-size: 100px;
          letter-spacing: 40px;
        }
        &:nth-child(4) {
          color: #fff;
          font-size: 60px;
          letter-spacing: 10px;
          margin-top: 10px;
        }
        &:nth-child(5) {
          color: #fff;
          font-size: 50px;
          letter-spacing: 5px;
          margin-top: 10px;
          .name {
            color: @mainColor;
          }
        }
      }
      .diamond {
        width: 250px;
        height: 250px;
        margin: 50px auto;
      }
    }
    .bottom {
      width: 100%;
      height: 200px;
      background: #000;
      border-top: 4px solid @mainColor;
      p {
        text-align: center;
        color: #fff;
        font-size: 50px;
        line-height: 150px;
        letter-spacing: 5px;
        .date {
          color: @mainColor;
        }
      }
    }
  }
}
</style>
