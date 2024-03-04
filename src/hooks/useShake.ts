import { tryOnUnload } from '@uni-helper/uni-use'

export function useShake() {
  const isShaking = ref(false)

  let lastTime = 0
  let lastX = 0
  let lastY = 0
  let lastZ = 0

  function computedShake(res: UniApp.OnAccelerometerChangeSuccess) {
    const currentTime = new Date().getTime()
    const deltaTime = currentTime - lastTime
    lastTime = currentTime
    const speed = (Math.abs(res.x + res.y + res.z - lastX - lastY - lastZ) / deltaTime) * 10000
    lastX = res.x
    lastY = res.y
    lastZ = res.z
    if (speed > 150 && !isShaking.value) {
      isShaking.value = true
      // 触发事件
      const timer = setTimeout(function () {
        isShaking.value = false
        clearTimeout(timer)
      }, 1000)
    }
  }

  uni.onAccelerometerChange(computedShake)

  tryOnUnload(() => {
    uni.offAccelerometerChange(computedShake)
  })

  return {
    isShaking
  }
}
