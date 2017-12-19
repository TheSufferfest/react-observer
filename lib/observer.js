'use strict';

exports.__esModule = true;
exports.startObserver = startObserver;
exports.observe = observe;

var _log = require('./utils/log');

var _observerTab = require('./observerTab');

var _eventsUser = require('./eventsUser');

var _eventsDOM = require('./eventsDOM');

require('./css/main.css');

var is_started = false,
    is_debug = false,
    app_container_id = null,
    event_user_stats = {},
    event_render_stats = [],
    event_DOM_stats = {};

var checkForObserver = function checkForObserver() {
  var observer = document.getElementById('observer-tab');

  return observer ? false : true;
};

var clearStats = function clearStats() {
  event_user_stats = {};
  event_render_stats = [];
  event_DOM_stats = {};
};

var syncEvents = function syncEvents() {
  if (app_container_id) {
    (0, _eventsDOM.startDOMEvents)(document.getElementById(app_container_id), function () {

      if (is_debug) {
        (0, _log.log)('DOM painted');
      };

      event_DOM_stats = { start_time: performance.now() };
      (0, _observerTab.displayEvents)(event_user_stats, event_render_stats, event_DOM_stats);
    });
  }

  (0, _eventsUser.startUserEvents)(function (user_event) {
    // reset previous stats - this ensures endless render/DOM events
    clearStats();

    if (is_debug) {
      (0, _log.log)('event fired:', user_event.type);
    };

    event_user_stats = { start_time: user_event.timeStamp, type: user_event.type };
  });
};

function startObserver() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (!is_started && checkForObserver) {

    app_container_id = props.app_container_id;
    is_started = true;
    is_debug = props.debug;

    (0, _observerTab.setupTab)(props);
    (0, _eventsUser.setupEvents)(props);
    (0, _observerTab.createTab)();
    syncEvents();
  }
};

function observe(scope) {
  if (is_debug) {
    (0, _log.log)('render fired:', scope.constructor.name);
  };

  event_render_stats.push({ component_name: scope.constructor.name, start_time: performance.now() });
};