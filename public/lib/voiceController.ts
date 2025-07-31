type LatencyLog = {
  stt: number;
  api: number;
  tts: number;
  playback: number;
};

export class VoiceController {
  whisperWorker: Worker;
  ttsWorker: Worker;
  audioContext: AudioContext;
  latencies: LatencyLog = { stt: 0, api: 0, tts: 0, playback: 0 };

  constructor(whisperWorker: Worker, ttsWorker: Worker) {
    this.whisperWorker = whisperWorker;
    this.ttsWorker = ttsWorker;
    this.audioContext = new AudioContext();
  }

  async runPipeline(audioBlob: Blob) {
    const sttStart = performance.now();
    const transcript = await this.transcribe(audioBlob);
    this.latencies.stt = performance.now() - sttStart;

    const apiStart = performance.now();
    const reply = await this.fetchOpenAIResponse(transcript);
    this.latencies.api = performance.now() - apiStart;

    const ttsStart = performance.now();
    const audioBuffer = await this.synthesize(reply);
    this.latencies.tts = performance.now() - ttsStart;

    const playbackStart = performance.now();
    await this.playAudio(audioBuffer);
    this.latencies.playback = performance.now() - playbackStart;

    console.log('Latencies:', this.latencies);
  }

  transcribe(audioBlob: Blob): Promise<string> {
    return new Promise((resolve) => {
      this.whisperWorker.onmessage = (e) => resolve(e.data.text);
      this.whisperWorker.postMessage({ type: 'transcribe', audio: audioBlob });
    });
  }

  async fetchOpenAIResponse(prompt: string): Promise<string> {
    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    return data.reply;
  }

  synthesize(text: string): Promise<AudioBuffer> {
    return new Promise((resolve) => {
      this.ttsWorker.onmessage = async (e) => {
        const arrayBuffer = e.data.audioBuffer;
        const decoded = await this.audioContext.decodeAudioData(arrayBuffer);
        resolve(decoded);
      };
      this.ttsWorker.postMessage({ type: 'speak', text });
    });
  }

  async playAudio(buffer: AudioBuffer) {
    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(this.audioContext.destination);
    source.start();
  }
}
