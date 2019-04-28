<template>
  <baidu-map
    class="task-position-map"
    :center="center"
    :zoom="zoom"
    @ready="onMapReady"
    ak="bi3cM05CiqzBraXrhif02TOSiCkpq3y1"
  >
    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
    <bm-marker :position="center"></bm-marker>
  </baidu-map>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { LocationData } from "../model/generic";
import GCoord from "gcoord";
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
import BmNavigation from "vue-baidu-map/components/controls/Navigation.vue";
import BmMarker from "vue-baidu-map/components/overlays/Marker.vue";

@Component({
  components: {
    BaiduMap,
    BmNavigation,
    BmMarker
  }
})
export default class OnePointMap extends Vue {
  @Prop()
  position!: LocationData;

  center: { lng: number; lat: number } = { lng: 0, lat: 0 };
  zoom: number = 16;

  onMapReady() {
    this.center = this.convert(this.position);
  }

  convert(data: LocationData) {
    if (data.coordinate !== 2) {
      let result = GCoord.transform(
        [data.positionX, data.positionY],
        data.coordinate === 0 ? GCoord.WGS84 : GCoord.GCJ02,
        GCoord.BD09
      ) as number[];
      return { lng: result[0], lat: result[1] };
    }
    return { lng: data.positionX, lat: data.positionY };
  }
}
</script>

<style lang="scss">
</style>
