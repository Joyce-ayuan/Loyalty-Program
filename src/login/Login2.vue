<template>
    <div class="login">
      <div class="innerLogin" ref="innerLogin">
        <div class="header">
          <div class="nav" @click="getMenu">
            <i class="fa fa-navicon"></i>
          </div>
          <div class="logo">
            <img src="@/assets/images/pong.jpg" alt>
          </div>
          <div class="card" @click="close">
            <i class="fa fa-close"></i>
          </div>
        </div>
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
        </div>
        <commonFooter class="flagFooter" ref="footer" style="bottom: -10px"></commonFooter>
      </div>
      <div class="menu" ref="menu">
        <Menu></Menu>
      </div>
    </div>
</template>

<script>
import LoginHeader from '../components/common/LoginHeader.vue'
import commonFooter from '../components/common/Footer.vue'
import Menu from '../menu/Menu.vue'
import '../../static/js/kook.js'
import '../../static/js/kook.add.js'
export default {
  data() {
    return {
      users: {
        username: '',
        password: ''
      }
    }
  },
  components: { LoginHeader, commonFooter, Menu },
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
    },
    getMenu() {
      console.log(11)
      this.$router.push('/menu')
      // this.$refs.menu.style.display = 'block'
      // this.$refs.innerLogin.style.marginTop = 0
      // Array.from(
      //   document.getElementsByClassName('flagFooter')
      // )[0].style.position =
      //   'static'
      /* eslint-disable */
      // kook('.innerLogin').toggle_cls('menu')
    },
    close() {
      window.history.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
@mainColor: #98843a;
.login {
  padding-top: 277px;
  width: 100%;
  height: 100%;
  background: #000;
  .innerLogin {
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
      .card {
        position: absolute;
        top: 135px;
        right: 80px;
        i {
          color: #99843d;
          font-size: 89px;
        }
      }
    }
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
      background: #000;
      margin-bottom: 250px;
      p {
        color: @mainColor;
        font-size: 60px;
        letter-spacing: 15px;
        text-align: center;
        line-height: 120px;
      }
    }
  }
  .menu {
  }
}

// 切换效果
.login {
  .innerLogin {
    &.menu {
      height: calc(100% - 100px);
      margin-left: -550px;
      margin-top: -30px;
      backface-visibility: hidden;
      background-color: #fff;
      transition: 1s;
      transform: rotateY(-50deg);
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .menu {
    display: none;
  }
}
</style>
