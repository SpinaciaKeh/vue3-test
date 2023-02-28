<template>
  <div class="cesium-box">
    <div class="nav-bar">
      <router-link to="/">{{ '<- back' }}</router-link>
      <el-select v-model="selectType" size="small">
        <el-option value="LA" label="LA"/>
        <el-option value="Shanghai" label="Shanghai"/>
        <el-option value="8" label="8舍"/>
        <el-option value="Taihe" label="太和殿"/>
      </el-select>
      <el-button @click="testData">test</el-button>
      <el-button @click="pickFeature">pick</el-button>
      <span v-show="showCoordinate">Lon: {{ longitude }}, Lat: {{ latitude }}</span>
    </div>

    <div id="cesiumContainer" class="cesium-container"></div>
    <!--    <div id="loadingOverlay"><h1>Loading...</h1></div>-->
    <div id="toolbar"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import * as Cesium from 'cesium'

// window.Cesium = Cesium

// const Cesium = inject<any>('Cesium')

let selectType = ref('Shanghai')

let viewer: any

const SHANGHAI_INDEX: number = 0
const LA_INDEX: number = 1

onMounted(() => {
  viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: Cesium.createWorldTerrain()
  })
  viewer.cesiumWidget.creditContainer.style.display = 'none'
  showShanghai()
  showLA()
  hideLA()
})

watch(selectType, (newVal) => {
  switch (newVal) {
    case 'LA': {
      hideShanghai()
      showLA()
      return
    }
    case 'Shanghai': {
      hideLA()
      showShanghai()
      return
    }
    case '8': {
      show8()
      return
    }
    case 'Taihe': {
      showTaihe()
      return
    }
    default:
      break
  }
})

const LATileSet = new Cesium.Cesium3DTileset({
  url: Cesium.IonResource.fromAssetId(1415196)
})
const showLA = () => {
  viewer.scene.globe.depthTestAgainstTerrain = true
  const data = viewer.scene.primitives.get(LA_INDEX)
  if (data === undefined) {
    viewer.scene.primitives.add(LATileSet, LA_INDEX)
  } else {
    data.show = true
  }

  const initialPosition = new Cesium.Cartesian3(
      -2705631.6783492276,
      -4259449.36938678,
      3887903.89229016
  )
  const initialOrientation = Cesium.HeadingPitchRoll.fromDegrees(
      5.999439616451804,
      -0.20513082834763674,
      4.7213266807233367e-7
  )
  viewer.scene.camera.setView({
    destination: initialPosition,
    orientation: initialOrientation,
    endTransform: Cesium.Matrix4.IDENTITY
  })
}
const hideLA = () => {
  viewer.scene.primitives.get(LA_INDEX).show = false
}

const showShanghai = () => {
  const data = viewer.scene.primitives.get(SHANGHAI_INDEX)
  if (data === undefined) {
    viewer.scene.primitives.add(Cesium.createOsmBuildings(), SHANGHAI_INDEX)
  } else {
    data.show = true
  }

  viewer.scene.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(121.4899, 31.23203, 400),
    orientation: {
      heading: Cesium.Math.toRadians(30),
      pitch: Cesium.Math.toRadians(-15)
    }
  })
}
const hideShanghai = () => {
  viewer.scene.primitives.get(SHANGHAI_INDEX).show = false
}

const show8 = () => {
  viewer.scene.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(120.119, 30.26854, 40),
    orientation: {
      heading: Cesium.Math.toRadians(-70),
      pitch: Cesium.Math.toRadians(5)
    }
  })
}

const showTaihe = () => {
  viewer.scene.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(116.39093, 39.91511, 60),
    orientation: {
      heading: Cesium.Math.toRadians(-5),
      pitch: Cesium.Math.toRadians(10)
    }
  })
}

let handler
let longitude = ref()
let latitude = ref()
let showCoordinate = ref<boolean>(false)
const pickFeature = () => {
  // const entity = viewer.entities.add({
  //   label: {
  //     show: false,
  //     showBackground: true,
  //     font: '14px Consolas',
  //     horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
  //     verticalOrigin: Cesium.VerticalOrigin.TOP,
  //     pixelOffset: new Cesium.Cartesian2(15, 0)
  //   }
  // })

  handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
  handler.setInputAction((movement: any) => {
    const cartesian = viewer.camera.pickEllipsoid(
        movement.endPosition,
        viewer.scene.globe.ellipsoid
    )
    if (cartesian) {
      const cartographic = Cesium.Cartographic.fromCartesian(cartesian)
      const longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(5)
      const latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(5)
      // entity.position = cartesian
      // entity.label.show = true
      // entity.label.text =
      //     `Lon: ${longitudeString}\u00B0` +
      //     `\nLat: ${latitudeString}\u00B0`
      longitude.value = longitudeString
      latitude.value = latitudeString
      showCoordinate.value = true
    } else {
      // entity.label.show = false
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
}

// test data
const testData = () => {
  console.log(viewer.scene.primitives.get(SHANGHAI_INDEX))
  console.log(viewer.scene.primitives.get(LA_INDEX))
  console.log(viewer.scene.primitives.get(2))
}

</script>

<style scoped lang="scss">
.cesium-box {
  font-family: Consolas;
  height: 100vh;
  width: 100vh;

  .nav-bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: #444444;
  }

  .cesium-container {
    height: 95%;
    width: 100%;
  }
}
</style>
