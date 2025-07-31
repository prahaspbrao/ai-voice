# 🎤 AI Voice App

> A cutting-edge **Next.js + TypeScript** Progressive Web App that empowers you to interact by voice — completely **offline after first load**, except for OpenAI API calls.

Record your voice, transcribe speech *locally* with Whisper WASM, chat with OpenAI’s GPT, then synthesize and play back responses—all in near real-time.

---

## ✨ Key Features

- 🛡️ **Offline-first**: Works seamlessly offline after initial asset caching (except OpenAI calls)  
- 🎙️ **Local Speech-to-Text**: Whisper.cpp compiled to WebAssembly, running in a Web Worker for fast, private transcription  
- 🔄 **Real-time streaming transcripts**: See your speech converted to text live  
- 🤖 **AI-powered conversation**: Uses OpenAI Chat Completion API for natural replies  
- 🗣️ **Local Text-to-Speech**: Coqui-style TTS models run in a Web Worker, converting AI responses to lifelike audio  
- ⚡ **Instant playback**: Audio plays immediately after synthesis  
- ⏱️ **Detailed latency metrics**: Tracks and displays timing for each stage (STT, API call, TTS, playback)  
- 🎯 **Performance goal**: Total round-trip response under 1.2 seconds on good networks  

---

## 🚀 How It Works

| Stage                   | Description                                                                                     |
|-------------------------|-------------------------------------------------------------------------------------------------|
| **1. Setup**            | Next.js + TypeScript PWA with service worker & manifest pre-caching Whisper & TTS model files. |
| **2. Local STT**        | Stream microphone audio chunks to a WASM-powered Whisper worker for live transcription.         |
| **3. OpenAI Chat API**  | Final transcript sent to OpenAI's Chat Completion endpoint to generate intelligent responses.   |
| **4. Local TTS**        | Coqui TTS worker converts response text to audio, cached for offline use.                       |
| **5. Playback & Metrics** | Play audio immediately and show detailed latency stats per stage.                               |

---

## 🏁 Quick Start

```bash
git clone https://github.com/prahaspbrao/ai-voiec.git
cd ai-voiec
npm install
npm run dev
