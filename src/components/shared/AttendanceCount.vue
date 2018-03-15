<template>
  <div class="attendance-count">
    <dl v-if="isCoed">
      <dd>Women:</dd>
      <dt>{{women}}</dt>
    </dl>
    <dl v-if="isCoed">
      <dd>Men:</dd>
      <dt>{{men}}</dt>
    </dl>
    <dl>
      <dd>Total:</dd>
      <dt>{{men + women}}</dt>
    </dl>
  </div>
</template>
<script>
export default {
  props: ['men', 'women', 'isCoed']
}
</script>
<style lang="scss">
.attendance-count{
  margin: 0 0 10px;
  > dl{
    margin: 0;

    dt,
    dd{
      display: inline;
    }
  }
}
</style>


