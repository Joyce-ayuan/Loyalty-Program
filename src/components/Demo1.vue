<template>
    <div class="demo1">
        <mt-button @click.native="handleClick">按钮</mt-button>
    </div>
</template>

<script>
export default {
  data() {
    return {
      toast: ''
    }
  },
  methods: {
    handleClick: function() {
      this.$toast('Hello world!')
    }
  }
}
</script>

<style>
</style>
