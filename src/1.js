const makePolyrhythm = require('./polyrhythm');

const fields = [
  {
    color: '#B73225',
    pattern: '1000000100000010000001000000100000010000001000000100000010000000',
    radius: 0.6,
    sample: 'Snare-Dittie.wav',
  },
  {
    color: '#591C0B',
    pattern: 32,
    radius: 0.45,
    sample: 'Hat-Toefy.wav',
    isMetro: true,
  },
  {
    color: '#004E7C',
    pattern: 16,
    radius: 0.33,
    sample: 'Perc-Koebal.wav',
  },
  {
    color: '#5C5F58',
    pattern: 8,
    radius: 0.2,
    sample: 'Perc-Bedouin.wav',
  },
];

const tempo = 150 / 8;

makePolyrhythm({ fields, tempo});
