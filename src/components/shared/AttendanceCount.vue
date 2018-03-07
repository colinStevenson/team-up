<template>
  <div class="attendance-count">
    <dl>
      <dd>Total:</dd>
      <dt>{{men + women}}</dt>
    </dl>
    <dl>
      <dd>Women:</dd>
      <dt>{{women}}</dt>
    </dl>
    <dl>
      <dd>Men:</dd>
      <dt>{{men}}</dt>
    </dl>
  </div>
</template>
<script>
export default {
  props: ['men', 'women']
}
</script>
<style lang="scss">
.attendance-count{
  margin: 0 0 10px;
  > dl{
    margin: 0;
    display: inline;

    dt,
    dd{
      display: inline;
    }
  }
}
</style>


