'use strict';

exports.__esModule = true;
exports.setupTab = setupTab;
exports.createTab = createTab;
exports.displayEvents = displayEvents;

var _log = require('./utils/log');

var _draw = require('./utils/draw');

var _graph = require('./utils/graph');

var body = document.getElementsByTagName('body')[0],
    tab = document.createElement('div'),
    nodes = document.createElement('div'),
    is_min = false,
    is_debug = false,
    app_container_id = null,
    dock = 'left',
    good_time = 10,
    list = [];

var maximize = function maximize() {
  tab.classList.remove('min');
};

var minimize = function minimize() {
  tab.classList.add('min');
};

var toggleSize = function toggleSize() {
  if (is_min) {
    maximize();
    is_min = false;
  } else {
    minimize();
    is_min = true;
  }
};

var clearNodes = function clearNodes() {
  while (nodes.firstChild) {
    nodes.removeChild(nodes.firstChild);
  }
};

var buildNode = function buildNode(stats_user, render_stat, stats_DOM) {
  if (is_debug) {
    (0, _log.log)('render time (event: ' + stats_user.type + '): ' + (render_stat.start_time - stats_user.start_time), 'paint time: ' + (stats_DOM.start_time - render_stat.start_time));
  }

  var render_time = parseInt(render_stat.start_time - stats_user.start_time),
      paint_time = parseInt(stats_DOM.start_time - render_stat.start_time),
      total_time = parseInt(stats_DOM.start_time - stats_user.start_time),
      is_render_good = render_time < good_time,
      is_paint_good = paint_time < good_time;

  addToList(render_time, paint_time, total_time);

  var line = (0, _draw.createComplexElement)(render_stat.component_name, render_time + 'ms', paint_time + 'ms', total_time + 'ms', is_render_good, is_paint_good);

  return line;
};

var buildPaint = function buildPaint(stats_user, stats_DOM) {
  if (is_debug) {
    (0, _log.log)('total time (event: ' + stats_user.type + '): ' + (stats_DOM.start_time - stats_user.start_time));
  }

  var total_time = parseInt(stats_DOM.start_time - stats_user.start_time),
      is_total_good = total_time < good_time;

  addToList(null, null, total_time);

  var line = (0, _draw.createComplexElement)('unknown', total_time + 'ms', is_total_good);

  return line;
};

var addNode = function addNode(type, component, node_event) {
  switch (type) {
    case 'title':
      tab.appendChild((0, _draw.createElement)('h1', 'Observer'));
      break;
    case 'component':
      nodes.appendChild(buildNode(component, node_event));
      break;
    default:
  }
};

var addToList = function addToList(render_time, paint_time, total_time) {
  list.push({ render_time: render_time, paint_time: paint_time, total_time: total_time });

  (0, _graph.addPoint)(total_time);
};

var clearList = function clearList() {
  list = [];
  (0, _graph.resetPoints)();
};

var downloadList = function downloadList() {
  var element = document.createElement('a');

  element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(list)));
  element.setAttribute('download', 'observer-data');
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

function setupTab(props) {
  is_debug = props.debug;
  app_container_id = props.app_container_id ? props.app_container_id : null;
  dock = props.dock ? props.dock : 'left';
  good_time = props.good_time ? props.good_time : 10;
};

function createTab() {
  switch (dock) {
    case 'left':
      tab.classList.add('left');
      break;
    case 'right':
      tab.classList.add('right');
      break;
    default:
      tab.classList.add('left');
  }

  tab.classList.add('observer-tab');
  tab.id = 'observer-tab';
  nodes.classList.add('observer-nodes');

  var reset = (0, _draw.createButton)(toggleSize, 'observer-btn', 'chevron_up'),
      download = (0, _draw.createButton)(downloadList, 'observer-btn', 'download'),
      trash = (0, _draw.createButton)(clearList, 'observer-btn', 'trash');

  addNode('title');

  tab.appendChild(nodes);
  tab.appendChild((0, _graph.createGraph)());
  tab.appendChild(reset);
  tab.appendChild(download);
  tab.appendChild(trash);
  body.appendChild(tab);
};

function displayEvents(stats_user, stats_render, stats_DOM) {
  clearNodes();

  if (stats_render && stats_render.length) {
    stats_render.forEach(function (render_stat) {
      nodes.appendChild(buildNode(stats_user, render_stat, stats_DOM));
    });
  } else {
    nodes.appendChild(buildPaint(stats_user, stats_DOM));
  }
};