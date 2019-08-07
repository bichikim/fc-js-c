<template lang="pug">
  q-page
    q-parallax
      template(#media)
        img(src="~assets/background.jpg")
      h1.text-white.banner.light.text-center Javascript Basic Course
</template>

<style lang="stylus">
  .banner
    text-transform capitalize
  .light
    color #fff
    text-shadow 0 0 5px #fff,
    0 0 10px #fff,
    0 0 15px #fff,
    0 0 20px #ffac1f,
    0 0 30px #ffac1f,
    0 0 40px #ffac1f,
    0 0 50px #ffac1f,
    0 0 75px #ffac1f
    letter-spacing 5px
    font 80px 'MisoRegular'
</style>

<script lang="ts">
export default {
  name: 'IndexPage'
}
</script>
