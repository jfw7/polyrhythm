const Beet = require('beet.js');
const Layer = require('beet.js/lib/layer');

document.querySelector('button').addEventListener('click', function() {
  const context = new AudioContext();

  const beet = new Beet({
    context: context,
  });

  let i60 = 0;
  let i90 = 0;

  beet.add(new Layer(context, 90, beet.pattern(4), (time, step, timeFromScheduled) => setTimeout(() => document.getElementById('bpm90').append(++i90 + ' '), timeFromScheduled * 1000)));
  beet.add(new Layer(context, 60, beet.pattern(4), (time, step, timeFromScheduled) => setTimeout(() => document.getElementById('bpm60').append(++i60 + ' '), timeFromScheduled * 1000)));
  beet.start();
});

// test commit
