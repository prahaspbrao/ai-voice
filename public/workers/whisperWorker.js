importScripts('/libs/transformers.min.js');

let model;

async function loadModel() {
  const { pipeline } = await window.transformers;
  model = await pipeline('automatic-speech-recognition', 'Xenova/whisper-tiny.en');
}

onmessage = async (e) => {
  const audioBuffer = e.data;
  if (!model) await loadModel();

  try {
    const result = await model(audioBuffer);
    postMessage({ text: result.text });
  } catch (err) {
    postMessage({ error: err.message });
  }
};
