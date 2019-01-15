<template>
    <div class="home">
        <commonHeader></commonHeader>
        <commonFooter></commonFooter>
    </div>
</template>

<script>
import commonHeader from '../components/common/Header.vue'
import commonFooter from '../components/common/Footer.vue'
export default {
  components: { commonHeader, commonFooter },
  methods: {}
}
</script>

<style lang="less">
.home {
  width: 100%;
  height: 100%;
  background: #f98;
}
</style>
