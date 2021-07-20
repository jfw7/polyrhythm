const Beet = require('beet.js');
const Layer = require('beet.js/lib/layer');

document.querySelector('button').addEventListener('click', function() {
  const context = new AudioContext();
  context.createOscillator();
  const beet = new Beet({
    context: context,
    tempo: 120,
  });

  beet.add(
    new Layer(context, 90, beet.pattern(4), (time, step, timeFromScheduled) => setTimeout(() => document.getElementById('bpm90').append(step + ' '), timeFromScheduled * 1000)),
    new Layer(context, 60, beet.pattern(4), (time, step, timeFromScheduled) => setTimeout(() => document.getElementById('bpm60').append(step + ' '), timeFromScheduled * 1000)),
  ).start();
});
