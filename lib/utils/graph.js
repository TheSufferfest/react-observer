'use strict';

exports.__esModule = true;
var graph = '<polyline\n  id="graph-line"\n  fill="none"\n  stroke="#6fb3d2"\n  stroke-width="3"\n  points="\n    0,0"\n  />\n';

var x = 0,
    max_point = 100;

var createGraph = exports.createGraph = function createGraph() {
  var graph_ele = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  graph_ele.id = 'graph';
  graph_ele.setAttribute('viewBox', '0 0 500 100');
  graph_ele.classList.add('observer-graph');
  graph_ele.innerHTML = graph;

  return graph_ele;
};

var addPoint = exports.addPoint = function addPoint(y) {
  if (!isNaN(y)) {

    var line = document.getElementById('graph-line'),
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

var resetPoints = exports.resetPoints = function resetPoints(y) {
  var line = document.getElementById('graph-line'),
      points = '0,0',
      graph_ele = document.getElementById('graph');

  max_point = 100;
  x = 0;

  graph_ele.setAttribute('viewBox', '0 0 500 100');

  line.setAttribute('points', points);
};