export function speak(text: string) {
  if (!window.speechSynthesis) {
    console.warn("SpeechSynthesis not supported in this browser.");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;

  // Optional: Choose a voice
  const voices = window.speechSynthesis.getVoices();
  const voice = voices.find(v => v.lang === "en-US");
  if (voice) utterance.voice = voice;

  window.speechSynthesis.speak(utterance);
}
