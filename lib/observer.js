import { log } from './utils/log';
import { setupTab, createTab, displayEvents } from './observerTab';
import { setupEvents, startUserEvents, getEvent } from './eventsUser';
import { startDOMEvents } from './eventsDOM';
import './css/main.css';

let is_started = false,
    is_debug = false,
    app_container_id = null,
    event_user_stats = {},
    event_render_stats = [],
    event_DOM_stats = {};

const checkForObserver = () => {
  let observer = document.getElementById('observer-tab');

  return observer ? false : true;
};

const clearStats = () => {
  event_user_stats = {};
  event_render_stats = [];
  event_DOM_stats = {};
};

const syncEvents = () => {
  if (app_container_id) {
    startDOMEvents(document.getElementById(app_container_id), () => {

      if (is_debug) {
        log('DOM painted');
      };

      event_DOM_stats = { start_time: performance.now() };
      displayEvents(event_user_stats, event_render_stats, event_DOM_stats);
    });
  }

  startUserEvents(user_event => {
    // reset previous stats - this ensures endless render/DOM events
    clearStats();

    if (is_debug) {
      log('event fired:', user_event.type);
    };

    event_user_stats = { start_time: user_event.timeStamp, type: user_event.type };
  });
};

export function startObserver(props = {}) {
  if (!is_started && checkForObserver) {

    app_container_id = props.app_container_id;
    is_started = true;
    is_debug = props.debug;

    setupTab(props);
    setupEvents(props);
    createTab();
    syncEvents();
  }
};

export function observe(scope) {
  if (is_debug) {
    log('render fired:', scope.constructor.name);
  };

  event_render_stats.push({ component_name: scope.constructor.name, start_time: performance.now() });
};