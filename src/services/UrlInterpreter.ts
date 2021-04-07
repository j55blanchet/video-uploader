import dataStore from './DataStore';

export default function InterpretUrl(): void {

  const urlParams = new URLSearchParams(window.location.search);

  Object.keys(dataStore).forEach((key) => {

    const value = urlParams.get(key);
    if (value !== null) {
      (dataStore as any)[key] = value;
    }
  });

  dataStore.participantIdWasSet = urlParams.get('participantId') !== null;
  dataStore.uploadNameWasSet = urlParams.get('uploadName') !== null;
}
