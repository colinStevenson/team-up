<template>
  <div class="loader">
    <logo></logo>
    <span class="sr-only">Loading...</span>
  </div>
</template>
<script>
import Logo from '../../assets/logo.svg'
export default {
  components: {
    Logo
  }
}
</script>

<style lang="scss">
@keyframes bounce{
  0%, 75%, 100%{
    transform: translateY(0);
  }

  25%{
    transform: translateY(-4px);
  }
}
.loader{
  top: 0;
  left: 0;
  width: 100%;
  position: fixed;
  
  > svg{
    display: block;
    padding-top: 20px;
    position: absolute;
    width: 20vw;
    left: 50%;
    top: 50vh;
    transform: translateX(-50%) translateY(-50%);

    *{
      fill: #05386b;
    }

    circle{
      animation: bounce 1s ease-in-out infinite;

      &:nth-of-type(2) {
        animation: bounce 1s ease-in-out 0.33s infinite;
      }
      &:nth-of-type(3) {
        animation: bounce 1s ease-in-out 0.66s infinite;
      }
    }
  }
}
</style>

