// lib/whisperClient.ts

let whisperWorker: Worker | null = null;

export function initWhisper() {
  if (!whisperWorker) {
    whisperWorker = new Worker(
      new URL("../workers/whisperWorker.ts", import.meta.url),
      { type: "module" }
    );
  }

  return whisperWorker;
}
