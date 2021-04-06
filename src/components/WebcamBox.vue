<template>
  <div class="is-relative webcam-box">
    <video ref="videoE"
    ></video>
    <div class="is-overlay" v-if="webcamStatus !== 'running'">
      <div class="vcenter-parent">
        <button
          @click="startWebcam"
          class="button"
          v-show="webcamStatus !== 'running'"
          :class="{'is-loading': webcamStatus==='loading'}">
          Start Webcam
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import {
  defineComponent, onBeforeUnmount, onMounted, ref,
} from 'vue';

import webcamProvider from '@/services/WebcamProvider';

export default defineComponent({
  name: 'WebcamBox',
  setup() {

    const videoE = ref(null as null | HTMLVideoElement);

    onMounted(() => {
      if (!videoE.value) throw new Error('videoE is null');
      if (webcamProvider.webcamStatus.value === 'running') {
        webcamProvider.connectVideoElement(videoE.value);
      }
    });
    onBeforeUnmount(() => {
      if (!videoE.value) throw new Error('videoE is null');
      webcamProvider.disconnectVideoElement(videoE.value);
    });

    return {
      videoE,
      webcamStatus: webcamProvider.webcamStatus,
    };
  },
  methods: {
    async startWebcam() {
      await webcamProvider.startWebcam();
      if (!this.videoE) throw new Error('videoE is null');
      await webcamProvider.connectVideoElement(this.videoE);
    },
    playVideo() {
      if (!this.videoE) throw new Error('videoE is null');
      this.videoE.play();
    },
  },
});
</script>

<style lang="scss">

.webcam-box {
  video {
    background: rgba(128, 128, 128, 0.2);
    width: 1280px;
    height: 720px;
    max-height: 100%;
    max-width: 100%;

    transform: scaleX(-1);
  }

  .loader {
    margin: 0 auto;
    width: 2rem;
    height: 2rem;
  }
}
</style>
