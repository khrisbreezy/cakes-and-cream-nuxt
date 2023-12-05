<template>
  <div>
    <Header />
      <Nuxt />
    <Footer />
  </div>
</template>

<script>
  export default {
    middleware: ['no-auth']
  }
</script>

<style>

</style>
