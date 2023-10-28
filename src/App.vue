<script setup lang="ts">
onLaunch(() => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
})
onReady(() => {
  console.log('App Ready')
})

onLoad(options => {
  console.log({ options }, 'app loaded')
})
onHide(() => {
  console.log('App Hide')
})

onBeforeMount(() => {
  console.log('vue before mounded')
})
</script>

<style lang="scss" scoped></style>
