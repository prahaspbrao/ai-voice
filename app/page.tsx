'use client';

import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [transcript, setTranscript] = useState('');
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = new Worker('/workers/whisperWorker.js');
    workerRef.current.onmessage = (e) => {
      setTranscript(e.data);
    };
    return () => workerRef.current?.terminate();
  }, []);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (e) => {
      audioChunksRef.current.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      workerRef.current?.postMessage(audioBlob);
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-900 px-4 py-8">
      <div className="bg-gray-800 text-white p-6 rounded-2xl shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">
          🎤 Whisper Voice-to-Text
        </h1>

        <div className="flex justify-center mb-6">
          <button
            onClick={recording ? stopRecording : startRecording}
            className={`px-6 py-3 text-lg rounded-lg transition duration-200 font-semibold ${
              recording
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {recording ? '🛑 Stop Recording' : '🎙️ Start Recording'}
          </button>
        </div>

        <div className="bg-gray-700 p-4 rounded-xl text-sm whitespace-pre-wrap font-mono">
          <strong>Transcript:</strong>
          <div className="mt-2 text-gray-200">{transcript || 'No input yet...'}</div>
        </div>
      </div>
    </main>
  );
}
