<template>
  <section class="section">
    <h1 class="title">Video Upload</h1>
    <h2 class="subtitle">Language Learning Experiment</h2>
    <p>Please record your video and upload here</p>
    <WebcamBox />
  </section>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

import WebcamBox from './WebcamBox.vue';

export default defineComponent({
  name: 'UploadScreen',
  components: { WebcamBox },
});

</script>

<style lang="scss">
</style>
