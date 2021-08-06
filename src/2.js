const makePolyrhythm = require('./polyrhythm');;

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
    isMetro: true,
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

const tempo = 85;

const title = 'Animals As Leaders, “Wave of Babies”';

const description = `
  Circles from innermost to outermost: whole notes, half notes, quarter notes,
  riff groupings measured in sixteenth notes: 5, 5, 9, 9, 7, 5, 5, 9, 10.
`;

makePolyrhythm({ description, fields, tempo, title })
