<template>
    <div class="login" ref="login">
      <div class="innerLogin" ref="innerLogin">
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
          <div class="card" @click="close">
            <i class="fa fa-close"></i>
          </div>
        </div>
        <div class="form">
            <mt-field placeholder="Mobile Number" v-model="users.username"></mt-field>
            <mt-field placeholder="New Password" type="password" v-model="users.password"></mt-field>
            <mt-field placeholder="New Password Again" type="password" v-model="users.password"></mt-field>
            <button @click="login">NEXT</button>
        </div>
        <commonFooter class="flagFooter" ref="footer"></commonFooter>
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
// import LoginHeader from '../components/common/LoginHeader.vue'
import commonFooter from '../components/common/Footer.vue'
import Menu from '../menu/Menu.vue'
import LoginMenu from '../menu/LoginMenu.vue'
import '../../static/js/kook.js'
import '../../static/js/kook.add.js'
export default {
  data() {
    return {
      users: {
        username: '',
        password: ''
      },
      isLogin: false,
      isShowBox: false
    }
  },
  components: { LoginMenu, commonFooter, Menu },
  methods: {
    login() {
      this.$router.push('/login')
    },
    register() {
      this.$router.push('/register')
    },
    getMenu() {
      this.$refs.menu.style.display = 'block'
      this.$refs.innerLogin.style.marginTop = 0
      this.$refs.login.style.perspective = '100px'
      this.$refs.login.style.overflow = 'hidden'
      this.isShowBox = true
      /* eslint-disable */
      kook('.innerLogin').toggle_cls('menu')
    },
    close() {
      window.history.go(-1)
    }
  },
  created() {
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
.login {
  width: 100%;
  background: #fff;
  .innerLogin {
    width: 100%;
    height: 100%;
    background: #000;
    padding-top: 277px;
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
    .form {
      width: 100%;
      height: 920px;
      background: #000;
      padding: 80px 150px;
      margin-top: 350px;
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
        margin-top: 30px;
      }
    }
  }
}

// 切换效果
.login {
  .innerLogin {
    &.menu {
      margin-left: 85%;
      margin-top: -300px;
      backface-visibility: hidden;
      transition: 1s;
      transform: rotateY(-20deg);
      position: absolute;
      top: -120px;
      left: 0;
      z-index: 99999;
    }
  }
}
</style>
