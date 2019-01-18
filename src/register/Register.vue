<template>
    <div class="register">
        <commonHeader></commonHeader>
        <div class="content">
            <div class="pic">
                <img src="" alt="">
            </div>
            <div class="form">
                <mt-field placeholder="First Name"></mt-field>
                <mt-field placeholder="Last Name"></mt-field>
                <mt-field placeholder="Mobile Number" type="tel"></mt-field>
                <mt-field placeholder="Email" type="email"></mt-field>
                <mt-field placeholder="Birthday MM/YYYY"></mt-field>
                <mt-field placeholder="Gender"></mt-field>
                <mt-field placeholder="Password" type="password"></mt-field>
                <mt-field placeholder="Confirm Password" type="password"></mt-field>
                <div class="btn" @click="toLogin">
                    <p>NEXT</p>
                </div>
            </div>
        </div>
        <commonFooter></commonFooter>
    </div>
</template>

<script>
import commonHeader from '../components/common/LoginHeader.vue'
import commonFooter from '../components/common/Footer.vue'
export default {
  components: { commonHeader, commonFooter },
  methods: {
    toLogin() {
      this.axios({
        methods: 'post',
        url: 'http://localhost/amy/register/index.php'
      }).then(res => {
        if (parseInt(res.data.status) === 200) {
          this.$router.push('/login')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@mainColor: #8c722d;
.register {
  width: 100%;
  height: 100%;
  padding-top: 280px;
  background: #000;
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
    .form {
      width: 100%;
      height: 100%;
      padding: 100px 170px;
      background-color: #000;
      .btn {
        width: 441px;
        height: 100px;
        border-radius: 50px;
        background: @mainColor;
        text-align: center;
        line-height: 100px;
        color: #000;
        font-size: 50px;
        font-weight: 700;
        letter-spacing: 10px;
        margin: 150px auto;
      }
    }
  }
}
</style>
