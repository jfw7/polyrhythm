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
    pattern: 32,
    radius: 0.5,
    sample: 'Hat-Toefy.wav',
  },
  {
    color: '#2D3544',
    pattern: 16,
    radius: 0.4,
    sample: 'clave.wav',
    isMetro: true,
  },
  {
    color: '#004E7C',
    pattern: 8,
    radius: 0.3,
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
  eighth notes, riff groupings measured in sixteenth notes: 5, 5, 9, 9, 7, 5, 5, 9, 10.
`;

makePolyrhythm({ description, fields, tempo, title })
