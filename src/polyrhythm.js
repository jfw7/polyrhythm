const Beet = require('beet.js');
const Layer = require('beet.js/lib/layer');
const Pattern = require('beet.js/lib/pattern');
const d3 = require('d3');
const Tone = require('tone');

module.exports = ({ fields, tempo }) => {
  fields = fields.map(({ pattern, ...field }) => ({ ...field, pattern: new Pattern(pattern) }));

  const width = 1000;
  const height = 800;

  const radius = width / 1.75;
  const armRadius = radius / 22;
  const dotRadius = armRadius - 11;

  const svg = d3.select('body')
    .append('svg')
    .attr('viewBox', [0, 0, width, height])
    .attr('text-anchor', 'middle')
    .style('display', 'block')
    .style('max-height', '100vh')
    .style('font', '500 12px sans-serif');

  const field = svg.append('g')
    .attr('transform', `translate(${width / 2},${height / 2})`)
    .selectAll('g')
    .data(fields.map(({ radius: _radius, ...field }) => ({ ...field, radius: _radius * radius })))
    .join('g');

  field.append('circle')
    .attr('class', 'field-ring')
    .attr('fill', 'none')
    .attr('stroke', 'currentColor')
    .attr('stroke-width', 1.5)
    .attr('r', d => d.radius)
    .style('transition', 'stroke-width 50ms ease-out');

  const fieldTick = field.selectAll('g')
    .data(d => {
      d.range = d3.range(d.pattern.steps);
      return d.range.map(step => ({ step: step + 1, field: d }));
    })
    .join('g')
      .attr('class', 'field-tick')
      .attr('transform', (d, i) => {
        const angle = i / d.field.range.length * 2 * Math.PI - Math.PI / 2;
        return `translate(${Math.cos(angle) * d.field.radius},${Math.sin(angle) * d.field.radius})`;
      });

  const fieldCircle = fieldTick.append('circle')
    .attr('class', 'field-circle')
    .attr('r', dotRadius)
    .attr('fill', 'white')
    .attr('stroke', 'black')
    .style('color', ({ field: { color } }) => color)
    .style('transition', 'fill 50ms ease-out');

  document.querySelector('button').addEventListener('click', async function() {
    await Tone.start();

    const context = new AudioContext();
    context.createOscillator();
    const beet = new Beet({ context, tempo });

    field.each(function(d) {
      let started = false;
      const player = new Tone.Player(`audio/${d.sample}`).toDestination();
      let pulse = true;
      const layer = beet.layer(
        d.pattern,
        (time, step, timeFromScheduled) => {
          setTimeout(
            () => {
              player.start();
              if (d.isMetro) {
                field.select('.field-ring')
                  // .attr('stroke-width', 1.5 * (pulse ? 1.2 : 1);
              }
              pulse = !pulse;
              d3.select(this)
                .selectAll('.field-circle')
                .attr(
                  'fill',
                  (_, j) => j === (step - 1) ? "currentColor" : "white",
                );
            },
            timeFromScheduled * 1000,
          );
          if (step === 1) {
            if (started) {
              layer.tempo = 0;
            }
            started = true;
          }
        },
        (time, step, timeFromScheduled) => {
          setTimeout(
            () => {
              d3.select(this)
                .selectAll('.field-circle')
                .attr('fill', 'white');
            },
            timeFromScheduled * 1000,
          );
          if (step === 1) {
            if (started) {
              layer.tempo = 0;
            }
            started = true;
          }
        },
      );
      beet.add(layer);
    });
    await Tone.loaded();
    setTimeout(() => beet.start(), 500);
  });
}
