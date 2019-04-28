<template>
  <baidu-map
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
import { LocationData, MapCoordinate, CoordinateUtils } from "../model/generic";

@Component
export default class OnePointMap extends Vue {
  @Prop()
  position!: LocationData;

  center: { lng: number; lat: number } = { lng: 0, lat: 0 };
  zoom: number = 16;

  onMapReady() {
    this.center = this.convert(this.position);
  }

  convert(data: LocationData): MapCoordinate {
    return CoordinateUtils.convert(data);
  }
}
</script>

<style lang="scss">
</style>
