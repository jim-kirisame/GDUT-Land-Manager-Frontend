<template>
  <div>
    <div class="content" v-if="hasCenter">
      <h4 class="title is-4">位置</h4>
      <div class="task-position">
        <OnePointMap class="task-position-map" :position="centerPos"/>
      </div>
    </div>
    <div v-if="taskResult.photos.length > 0">
      <h4 class="title is-4">相片</h4>
      <div class="task-photo">
        <a
          v-for="(item, index) in taskResult.photos"
          :key="index"
          class="box photo-item"
          @click="imageClick(item)"
        >
          <div class="photo-image">
            <figure class="image">
              <img :src="baseURL+item.path">
            </figure>
          </div>
          <div class="photo-title">{{titleStr(item.subID)}}</div>
          <div class="photo-description">
            <p>{{item.description}}</p>
          </div>
          <div class="photo-info">
            <span class="icon">
              <font-awesome-icon icon="user"/>
            </span>
            <span>{{item.author.name}}</span>
            <span class="icon is-none">
              <font-awesome-icon icon="clock"/>
            </span>
            <span>{{timeStr(item.photoTime)}}</span>
          </div>
        </a>
      </div>
      <div
        class="modal"
        v-if="modalImage.photoID > 0"
        :class="{'is-active': modalImage.photoID > 0}"
      >
        <div class="modal-background" @click="closeModal"></div>
        <div class="modal-content">
          <p class="image">
            <img :src="baseURL + modalImage.path" alt>
          </p>
          <div class="has-text-white">
            <div class="photo-title">{{titleStr(modalImage.subID)}}</div>
            <div class="photo-description">
              <p>{{modalImage.description}}</p>
            </div>
            <div class="photo-info">
              <span class="icon">
                <font-awesome-icon icon="user"/>
              </span>
              <span>{{modalImage.author.name}}</span>
              <span class="icon is-none">
                <font-awesome-icon icon="clock"/>
              </span>
              <span>{{timeStr(modalImage.photoTime)}}</span>
            </div>
          </div>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
      </div>
    </div>
    <div class="content" v-if="taskResult.tracks.length > 0">
      <h4 class="title is-4">巡查路线</h4>
      <div class="task-track">
        <RouteMap class="task-track-map" :tracks="taskResult.tracks"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import {
  ExploreTaskResult,
  PhotoData,
  TaskUtils,
  LocationData
} from "../model/generic";
import { baseDomain } from "../model/api";
import OnePointMap from "../components/mapOnePoint.vue";
import RouteMap from "../components/mapRoute.vue";

@Component({
  components: {
    OnePointMap,
    RouteMap
  }
})
export default class ExploreResult extends Vue {
  @Prop()
  taskResult!: ExploreTaskResult;

  modalImage: PhotoData = new PhotoData();
  imageClick(img: PhotoData) {
    this.modalImage = img;
    console.log(img);
  }
  closeModal() {
    this.modalImage = new PhotoData();
  }
  timeStr(ts: number) {
    return TaskUtils.dateTimeShortStr(ts);
  }
  titleStr(id: number) {
    switch (id) {
      case 0:
        return "访谈人";
      case 1:
        return "座谈会议";
      case 2:
        return "敏感对象";
      case 3:
        return "地块现场";
      default:
        return "其他";
    }
  }

  get baseURL() {
    return baseDomain;
  }

  get hasCenter() {
    return !(
      this.taskResult.positionX === 0 && this.taskResult.positionY === 0
    );
  }

  get centerPos() {
    return {
      positionX: this.taskResult.positionX,
      positionY: this.taskResult.positionY,
      coordinate: this.taskResult.coordinate
    };
  }
}
</script>

<style lang="scss" scoped>
.task-photo {
  column-count: 4;
  column-gap: 5px;
}
@media screen and (max-width: 767px) {
  .task-photo {
    column-count: 1;
  }
}
@media screen and (min-width: 768px) and (max-width: 1087px) {
  .task-photo {
    column-count: 2;
  }
}
@media screen and (min-width: 1088px) and (max-width: 1280px) {
  .task-photo {
    column-count: 3;
  }
}
.photo-item {
  display: inline-block;
  div + div {
    margin-top: 8px;
  }
}

.photo-title {
  font-size: 18px;
  font-weight: 500;
}
.photo-description,
.photo-info {
  color: #808080;
}
.photo-info {
  height: 24px;
  line-height: 24px;
  align-items: center;
  font-size: 15px;

  span.icon {
    margin: 0 -0.25rem 0 0.25rem;
  }
  span + span.icon {
    margin-left: 0.75rem;
  }
  span {
    display: inline-block;
  }
}
.task-position-map {
  height: 300px;
}
.task-track-map {
  height: 85vh;
}
</style>
