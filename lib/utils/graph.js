const graph = `<polyline
  id="graph-line"
  fill="none"
  stroke="#6fb3d2"
  stroke-width="3"
  points="
    0,0"
  />
`;

let x = 0,
    max_point = 100;

export const createGraph = () => {
  let graph_ele = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  graph_ele.id = 'graph';
  graph_ele.setAttribute('viewBox', '0 0 500 100');
  graph_ele.classList.add('observer-graph');
  graph_ele.innerHTML = graph;

  return graph_ele;
};

export const addPoint = y => {
  if (!isNaN(y)) {

    let line = document.getElementById('graph-line'),
        points = line.getAttribute('points'),
        graph_ele = document.getElementById('graph');

    max_point = y > max_point ? y : max_point;
    x += 10;

    graph_ele.setAttribute('viewBox', '0 0 ' + (x < 500 ? 500 : x) + ' ' + max_point);

    points += ' ' + x + ',' + y;

    line.setAttribute('stroke-width', 4);
    line.setAttribute('points', points);
  }
};

export const resetPoints = y => {
  let line = document.getElementById('graph-line'),
      points = '0,0',
      graph_ele = document.getElementById('graph');

  max_point = 100;
  x = 0;

  graph_ele.setAttribute('viewBox', '0 0 500 100');

  line.setAttribute('points', points);
};