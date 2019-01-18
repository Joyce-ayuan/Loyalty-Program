<template>
    <div class="login">
        <LoginHeader></LoginHeader>
        <div class="pic">
            <img src="" alt="">
        </div>
        <div class="form">
            <mt-field placeholder="Mobile Number" v-model="users.username"></mt-field>
            <mt-field placeholder="Password" type="password" v-model="users.password"></mt-field>
            <button @click="login">LOGIN</button>
            <p>Forgot Password?</p>
        </div>
        <div class="register" @click="register">
            <p>REGISTER NOW</p>
            <div class="box"></div>
        </div>
        <commonFooter></commonFooter>
    </div>
</template>

<script>
import LoginHeader from '../components/common/LoginHeader.vue'
import commonFooter from '../components/common/Footer.vue'
export default {
  data() {
    return {
      users: {
        username: '',
        password: ''
      }
    }
  },
  components: { LoginHeader, commonFooter },
  methods: {
    login() {
      this.axios({
        methods: 'post',
        url: 'http://localhost/amy/login/index.php'
      }).then(res => {
        if (parseInt(res.data.status) === 200) {
          this.$router.push('/personal')
        }
      })
    },
    register() {
      this.$router.push('/register')
    }
  }
}
</script>

<style lang="less" scoped>
@mainColor: #98843a;
.login {
  padding-top: 277px;
  position: relative;
  width: 100%;
  height: 100vh;
  .pic {
    width: 100%;
    height: 990px;
    background-color: #000;
    overflow: hidden;
    img {
      display: block;
      width: 894px;
      height: 900px;
      background: #f04;
      border-radius: 50%;
      margin: 30px auto;
    }
  }
  .form {
    width: 100%;
    height: 920px;
    background: #000;
    padding: 80px 150px;
    button {
      width: 440px;
      height: 97px;
      border-radius: 35px;
      background: @mainColor;
      color: #000;
      letter-spacing: 35px;
      font-weight: 700;
      font-size: 40px;
      display: block;
      margin: 135px auto 0;
    }
    p {
      color: @mainColor;
      text-align: center;
      margin-top: 20px;
      letter-spacing: 3px;
    }
  }
  .register {
    width: 100%;
    height: 124px;
    border: 3px solid @mainColor;
    position: absolute;
    bottom: 50px;
    left: 0;
    background: #000;
    p {
      color: @mainColor;
      font-size: 60px;
      letter-spacing: 15px;
      text-align: center;
      line-height: 120px;
    }
    .box {
      width: 100%;
      height: 200px;
      background: #000;
    }
  }
}
</style>
