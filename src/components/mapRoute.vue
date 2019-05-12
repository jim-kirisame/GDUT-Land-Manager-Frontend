<template>
  <baidu-map class="task-position-map" :center="center" :zoom="zoom">
    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
    <div v-for="(item, index) in tracks" :key="index">
      <bm-polyline
        :path="convertTrack(item)"
        :stroke-color="color(index)"
        :stroke-opacity="0.5"
        :stroke-weight="2"
      ></bm-polyline>
      <bm-label
        :content="'路线'+(index+1)+'<br>'+getDesc(item)"
        :position="getCenter(convertTrack(item))"
      />
    </div>
  </baidu-map>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import {
  LocationData,
  TrackData,
  MapCoordinate,
  CoordinateUtils,
  TaskUtils
} from "../model/generic";

@Component
export default class RouteMap extends Vue {
  @Prop()
  tracks!: TrackData[];

  zoom: number = 16;

  colors = ["blue", "red", "yellow", "green", "cyan"];
  color(index: number) {
    return this.colors[index % this.colors.length];
  }

  convertTrack(data: TrackData): MapCoordinate[] {
    let singlePath: MapCoordinate[] = [];
    data.track.data.forEach(element => {
      singlePath.push(
        this.convert({
          positionX: element.pointX,
          positionY: element.pointY,
          coordinate: data.track.coordinate
        })
      );
    });
    return singlePath;
  }

  getDesc(data: TrackData): string {
    let first = data.track.data[0].timestamp;
    let last = data.track.data[data.track.data.length - 1].timestamp;
    let firstD = new Date(first * 1000);
    let lastD = new Date(last * 1000);
    if (firstD.getDate !== lastD.getDate) {
      return (
        TaskUtils.dateTimeShortStr(first) +
        " ~ " +
        TaskUtils.dateTimeShortStr(last)
      );
    } else {
      return (
        TaskUtils.dateTimeShortStr(first) + " ~ " + TaskUtils.shortTimeStr(last)
      );
    }
  }

  getCenter(data: MapCoordinate[]) {
    let x = 0;
    let y = 0;
    let count = 0;
    data.forEach(d => {
      x += d.lng;
      y += d.lat;
      count++;
    });
    return { lng: x / count, lat: y / count };
  }

  get center() {
    let x = 0;
    let y = 0;
    let count = 0;
    this.tracks.forEach(track => {
      track.track.data.forEach(element => {
        if (element.pointX !== 0 && element.pointY !== 0) {
          let a = this.convert({
            positionX: element.pointX,
            positionY: element.pointY,
            coordinate: track.track.coordinate
          });
          x += a.lng;
          y += a.lat;
          count++;
        }
      });
    });
    return { lng: x / count, lat: y / count };
  }

  convert(data: LocationData): MapCoordinate {
    return CoordinateUtils.convert(data);
  }
}
</script>

<style lang="scss">
</style>
