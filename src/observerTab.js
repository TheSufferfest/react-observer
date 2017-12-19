import { log } from './utils/log';
import { createElement, createButton, createComplexElement } from './utils/draw';
import { createGraph, addPoint, resetPoints } from './utils/graph';

let body = document.getElementsByTagName('body')[0],
    tab = document.createElement('div'),
    nodes = document.createElement('div'),
    is_min = false,
    is_debug = false,
    app_container_id = null,
    dock = 'left',
    good_time = 10,
    list = [];

const maximize = () => {
  tab.classList.remove('min');
};

const minimize = () => {
  tab.classList.add('min');
};

const toggleSize = () => {
  if (is_min) {
    maximize();
    is_min = false;
  } else {
    minimize();
    is_min = true;
  }
};

const clearNodes = () => {
  while (nodes.firstChild) {
    nodes.removeChild(nodes.firstChild);
  }
};

const buildNode = (stats_user, render_stat, stats_DOM) => {
  if (is_debug) {
    log('render time (event: ' + stats_user.type + '): ' + (render_stat.start_time - stats_user.start_time),
    'paint time: ' + (stats_DOM.start_time - render_stat.start_time));
  }

  let render_time = parseInt(render_stat.start_time - stats_user.start_time),
      paint_time = parseInt(stats_DOM.start_time - render_stat.start_time),
      total_time = parseInt(stats_DOM.start_time - stats_user.start_time),
      is_render_good = (render_time < good_time),
      is_paint_good = (paint_time < good_time);

  addToList(render_time, paint_time, total_time);

  let line = createComplexElement(
    render_stat.component_name,
    render_time + 'ms',
    paint_time + 'ms',
    total_time + 'ms',
    is_render_good,
    is_paint_good
  );

  return line;
};

const buildPaint = (stats_user, stats_DOM) => {
  if (is_debug) {
    log('total time (event: ' + stats_user.type + '): ' + (stats_DOM.start_time - stats_user.start_time));
  }

  let total_time = parseInt(stats_DOM.start_time - stats_user.start_time),
      is_total_good = (total_time < good_time);

  addToList(null, null, total_time);

  let line = createComplexElement(
    'unknown',
    total_time + 'ms',
    is_total_good
  );

  return line;
};

const addNode = (type, component, node_event) => {
  switch (type) {
    case 'title':
      tab.appendChild(createElement('h1', 'Observer'));
      break;
    case 'component':
      nodes.appendChild(buildNode(component, node_event));
      break;
    default:
  }
};

const addToList = (render_time, paint_time, total_time) => {
  list.push({ render_time: render_time, paint_time: paint_time, total_time: total_time });

  addPoint(total_time);
};

const clearList = () => {
  list = [];
  resetPoints();
};

const downloadList = () => {
  let element = document.createElement('a');

  element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(list)));
  element.setAttribute('download', 'observer-data');
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export function setupTab(props) {
  is_debug = props.debug;
  app_container_id = (props.app_container_id)? props.app_container_id : null;
  dock = (props.dock)? props.dock : 'left';
  good_time = (props.good_time)? props.good_time : 10;
};

export function createTab() {
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

  let reset = createButton(toggleSize, 'observer-btn', 'chevron_up'),
      download = createButton(downloadList, 'observer-btn', 'download'),
      trash = createButton(clearList, 'observer-btn', 'trash');

  addNode('title');

  tab.appendChild(nodes);
  tab.appendChild(createGraph());
  tab.appendChild(reset);
  tab.appendChild(download);
  tab.appendChild(trash);
  body.appendChild(tab);
};

export function displayEvents(stats_user, stats_render, stats_DOM) {
  clearNodes();

  if (stats_render && stats_render.length) {
    stats_render.forEach((render_stat) => {
      nodes.appendChild(buildNode(stats_user, render_stat, stats_DOM));
    });
  } else {
    nodes.appendChild(buildPaint(stats_user, stats_DOM));
  }
};
