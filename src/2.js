const makePolyrhythm = require('./polyrhythm');

const fields = [
  {
    color: '#B73225',
    pattern: '1000010000100000000100000000100000010000100001000000001000000000',
    radius: 0.6,
    sample: 'Snare-Dittie.wav',
  },
  {
    color: '#591C0B',
    pattern: 16,
    radius: 0.45,
    sample: 'Hat-Toefy.wav',
  },
  {
    color: '#004E7C',
    pattern: 8,
    radius: 0.33,
    sample: 'Perc-Koebal.wav',
  },
  {
    color: '#5C5F58',
    pattern: 4,
    radius: 0.2,
    sample: 'Perc-Bedouin.wav',
  },
];

const tempo = 85 / 4;

makePolyrhythm({ fields, tempo })
