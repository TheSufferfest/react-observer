'use strict';

exports.__esModule = true;
exports.setupEvents = setupEvents;
exports.startUserEvents = startUserEvents;
var event_black_list = ['mousemove', 'mouseout', 'mousein', 'mouseover', 'pointermove', 'pointerout', 'pointerover', 'focus', 'blur', 'devicemotion', 'deviceorientation', 'hashchange', 'selectstart', 'selectionchange', 'popstate'];

var user_events = null;

var getEventNames = function getEventNames(object) {
  var names = [];

  for (var name in object) {
    if (name.indexOf('on') === 0) {
      names.push(name.substr(2));
    }
  }
  return names;
};

var attachListeners = function attachListeners(events, cb) {
  for (var i = event_black_list.length - 1; i >= 0; i--) {
    var index = events.indexOf(event_black_list[i]);

    events.splice(index, 1);
  }

  for (var _i = events.length - 1; _i >= 0; _i--) {
    window.addEventListener(events[_i], cb, true);
  }
};

var attachDefinedListeners = function attachDefinedListeners(events, cb) {
  for (var i = events.length - 1; i >= 0; i--) {
    window.addEventListener(events[i], cb, true);
  }
};

function setupEvents(props) {
  user_events = props.user_events;
};

function startUserEvents(cb) {

  if (user_events) {
    attachDefinedListeners(user_events, cb);
  } else {
    attachListeners(getEventNames(window), cb);
    attachListeners(getEventNames(document), cb);
  }
};