import { reactive } from 'vue';

const dataStore = reactive({
  experimentName: 'Unknown Experiment',
  prompt: 'Use this page to record and upload your video',
  participantId: '',
  participantIdWasSet: false,
  uploadName: '',
  uploadNameWasSet: false,
});

export default dataStore;
