<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Video Upload</h1>
      <h2 class="subtitle">{{dataStore.experimentName}}</h2>

      <div class="field is-horizontal">
        <div class="field-label is-normal">Participant Id</div>
        <div class="field-body">
          <div class="field is-narrow">
            <div class="control">
              <input type="text" class="input"
                :disabled="dataStore.participantIdWasSet"
                v-model="dataStore.participantId">
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">Upload Identifier</div>
        <div class="field-body">
          <div class="field is-narrow">
            <div class="control">
              <input type="text" class="input"
                :disabled="dataStore.uploadNameWasSet"
                v-model="dataStore.uploadName">
            </div>
          </div>
        </div>
      </div>

      <p><strong>Instructions:</strong> {{dataStore.prompt}}</p>

      <div v-if="state === 'Record'">
        <WebcamBox />

        <div class="field is-grouped is-grouped-centered" v-show="webcamStatus === 'running'">
          <p class="control">
            <span class="record-icon" :class="{'is-recording': isRecording}">
            </span>
            <!-- <span class="icon is-medium" :class="{'has-text-danger': isRecording}">
              <FAIcon icon="record-vinyl" size="lg" pulse />
            </span> -->
          </p>
          <p class="control">
            <button class="button animate-width"
              @click="toggleRecording">

               <span v-show="isRecording">
                Stop
              </span>
              <span v-show="!isRecording">
                Record
              </span>

              <!-- <span v-if="!isRecording">Start Recording</span> -->
            </button>
          </p>
        </div>
      </div>

      <div v-if="state === 'Review'">
        <video class="flipped" controls :src="recordedObjectUrl"></video>

        <div class="field is-grouped is-grouped-centered">
          <p class="control">
            <button class="button" :disabled="isUploading" @click="rerecord">
              Rerecord
              <!-- <span class="icon is-medium" :class="{'has-text-danger': isRecording}">
                <FAIcon icon="record-vinyl" />
              </span> -->
              <!-- <span v-if="!isRecording">Start Recording</span> -->
            </button>
          </p>
          <p class="control">
            <button class="button is-primary"
              :disabled="isUploading"
              :class="{'is-loading': isUploading}"
              @click="uploadVideo">
              Upload Video
            </button>
          </p>
        </div>

        <div class="notification" v-if="uploadError">
          {{uploadError}}
        </div>

      </div>

    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import dataStore from '@/services/DataStore';
import webcamProvider from '@/services/WebcamProvider';
import AzureUploader from '@/services/AzureUploader';

import WebcamBox from './WebcamBox.vue';

export default defineComponent({
  name: 'UploadScreen',
  components: { WebcamBox },
  setup() {

    const state = ref('Record' as 'Record' | 'Review');

    const lastRecordedBlob = ref(null as Blob | null);
    const recordedObjectUrl = ref('');
    const isUploading = ref(false);
    const uploadError = ref(null as null | any);

    return {
      state,
      dataStore,
      webcamProvider,
      webcamStatus: webcamProvider.webcamStatus,
      isRecording: webcamProvider.isRecording,
      lastRecordedBlob,
      recordedObjectUrl,
      isUploading,
      uploadError,
    };
  },
  methods: {
    async toggleRecording() {
      if (!webcamProvider.isRecording.value) {
        await webcamProvider.startWebcam();
        await webcamProvider.startRecording();
      } else {
        this.lastRecordedBlob = await webcamProvider.stopRecording();
        this.recordedObjectUrl = URL.createObjectURL(this.lastRecordedBlob);
        this.state = 'Review';
        await webcamProvider.stopWebcam();
      }
    },
    async rerecord() {
      this.lastRecordedBlob = null;
      this.recordedObjectUrl = '';
      this.uploadError = null;
      this.state = 'Record';
      await webcamProvider.startWebcam();
    },
    async uploadVideo() {
      if (!this.lastRecordedBlob) return;
      if (this.isUploading) return;

      this.isUploading = true;
      this.uploadError = null;
      const blobName = `${dataStore.experimentName}-${dataStore.participantId}-${dataStore.uploadName}.webm`;

      try {
        await AzureUploader.upload(this.lastRecordedBlob, blobName);
      } catch (e) {
        console.error('Error uploading video', e);
        this.uploadError = e;
      }

      if (this.uploadError === null) {
        this.uploadError = 'Upload Successful';
      }

      this.isUploading = false;
    },
  },
});

</script>

<style lang="scss">

@import "@/assets/main.scss";

.animate-width {
  transition: width 0.2s ease;
}

.record-icon {
  display: block;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 1rem;
  background-color: $dark;
  transition: background-color 0.2s ease;

  &.is-recording {
    background-color: $red;
  }
}

.control .record-icon {
  margin-top: 8px;
}
</style>
