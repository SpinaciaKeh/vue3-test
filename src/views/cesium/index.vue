<template>
  <div class="cesium-box">
    <router-link to="/">back</router-link>
    <div id="cesiumContainer" class="cesium-container"></div>
    <!--    <div id="loadingOverlay"><h1>Loading...</h1></div>-->
    <div id="toolbar"></div>
  </div>
</template>

<script setup lang="ts">
import * as Cesium from 'cesium'

window.Cesium = Cesium

onMounted(() => {
  const viewer = new Cesium.Viewer('cesiumContainer')
  window.Viewer = viewer

  const tileSet = new Cesium.Cesium3DTileset({
    url: Cesium.IonResource.fromAssetId(125737)
  })
  viewer.scene.primitives.add(tileSet)

  const initialPosition = new Cesium.Cartesian3(
      -1111583.3721328347,
      -5855888.151574568,
      2262561.444696748
  )
  const initialOrientation = Cesium.HeadingPitchRoll.fromDegrees(
      100.0,
      -15.0,
      0.0
  )
  viewer.scene.camera.setView({
    destination: initialPosition,
    orientation: initialOrientation,
    endTransform: Cesium.Matrix4.IDENTITY
  })
})
</script>

<style scoped lang="scss">
.cesium-box {
  font-family: Consolas;
  height: 100vh;
  width: 100vh;

  .cesium-container {
    height: 95%;
    width: 100%;
  }
}
</style>
