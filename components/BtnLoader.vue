<template>
  <img src="~assets/images/loader.png" alt="">
</template>

<script>
export default {
  data: () => ({}),
  created() {

  },
  mounted() {

  },
  methods: {},
  computed: {}
}
</script>

<style scoped lang="scss">
img {
  margin-left: 3px;
  animation: spinner-border .75s linear infinite;
}

@keyframes spinner-border {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
