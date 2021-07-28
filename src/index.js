const Beet = require('beet.js');
const Layer = require('beet.js/lib/layer');
const Pattern = require('beet.js/lib/pattern');
const d3 = require('d3');

const width = 1000;
const height = 800;

const radius = width / 2;
const armRadius = radius / 22;
const dotRadius = armRadius - 11;

const color = d3.scaleSequential([0, 2 * Math.PI], d3.interpolateRainbow);

const fields = [
  {
    radius: 0.6 * radius,
    pattern: '1000000100000010000001000000100000010000001000000100000010000000',
  },
  {
    radius: 0.45 * radius,
    pattern: 32,
  },
  {
    radius: 0.33 * radius,
    pattern: 16,
  },
  {
    radius: 0.2 * radius,
    pattern: 8,
  },
].map(({ pattern, ...field}) => ({ ...field, pattern: new Pattern(pattern)}));

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
  .data(fields)
  .join('g');

field.append('circle')
  .attr('fill', 'none')
  .attr('stroke', 'currentColor')
  .attr('stroke-width', 1.5)
  .attr('r', d => d.radius);

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
  .style('color', (d, i) => color(i / d.field.range.length * 2 * Math.PI))
  .style('transition', 'fill 50ms ease-out');

document.querySelector('button').addEventListener('click', function() {
  const context = new AudioContext();
  context.createOscillator();
  const tempo = 37.5 / 2;
  const beet = new Beet({ context, tempo });

  field.each((d, i, nodes) => {
    const layer = beet.layer(
      d.pattern,
      (time, step, timeFromScheduled) => setTimeout(
        () => {
          d3.select(nodes[i])
            .selectAll('.field-circle')
            .attr(
              'fill',
              (_, j) => {
                return j === (step - 1) ? "currentColor" : "white";
              },
            );
        },
        timeFromScheduled * 1000,
      ),
      (time, step, timeFromScheduled) => setTimeout(
        () => {
          d3.select(nodes[i])
            .selectAll('.field-circle')
            .attr('fill', 'white');
        },
        timeFromScheduled * 1000,
      ),
    );
    beet.add(layer);
  });
  beet.start();
});
