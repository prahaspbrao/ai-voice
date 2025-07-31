/* eslint-disable no-restricted-globals */
import { pipeline } from '@xenova/transformers';

let whisper = null;

self.onmessage = async (event) => {
  const { type, audioData } = event.data;

  if (type === 'init') {
    // Load Whisper model from CDN or cache
    whisper = await pipeline(
      'automatic-speech-recognition',
      'Xenova/whisper-tiny.en'
    );

    self.postMessage({ type: 'ready' });
  }

  if (type === 'transcribe' && whisper) {
    const result = await whisper(audioData);
    self.postMessage({ type: 'result', text: result.text });
  }
};
