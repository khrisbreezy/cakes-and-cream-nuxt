<template>
        <div class="lds-dual-ring"></div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
.lds-dual-ring {
  display: inline-block;
  width: 52px;
  height: 52px;
  /* margin: 20px 0; */
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 40px;
  height: 40px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #0059BA;
  border-color: #0059BA transparent #0059BA transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>