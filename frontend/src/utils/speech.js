export const speak = (text) => {
  const speech = new SpeechSynthesisUtterance();
  speech.text = text;
  speech.lang = 'en-US'; // Set language
  speech.rate = 0.75; // Adjust speed
  speech.pitch = 1; // Adjust pitch

  window.speechSynthesis.speak(speech);
};
