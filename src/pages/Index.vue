<template lang="pug">
  q-page
    q-parallax
      template(#media)
        img(src="~assets/background.jpg")
      h1.text-white.banner.text-light.text-center Javascript Basic Course
</template>

<style lang="stylus">
  .banner
    text-transform capitalize
</style>

<script lang="ts">
export default {
  name: 'IndexPage'
}
</script>
