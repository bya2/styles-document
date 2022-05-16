const options = {
  gain: {
    gain: 0.5,
  },
};

const audio_context = new AudioContext();

// Element (Audio, Button, )
const audio_elem = document.querySelector("audio");

const mute = document.querySelector(".mute");

const distortion = audio_context.createWaveShaper();
const gainNode = audio_context.createGain();

if (!audio_elem) {
  throw new Error("");
}

// Source
const media_source = audio_context.createMediaElementSource(audio_elem);

// Node
const osc_node = new OscillatorNode(audio_context);
const gain_node = new GainNode(audio_context, options.gain);

// Graph
media_source.connect(gain_node).connect(audio_context.destination);