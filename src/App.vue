<template>
  <UploadScreen />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UploadScreen from './components/UploadScreen.vue';

export default defineComponent({
  name: 'App',
  components: {
    UploadScreen,
  },
});
</script>

<style lang="scss">
</style>
