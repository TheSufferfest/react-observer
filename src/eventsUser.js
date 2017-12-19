let event_black_list = [
  'mousemove', 'mouseout', 'mousein', 'mouseover', 'pointermove', 'pointerout',
  'pointerover', 'focus', 'blur', 'devicemotion', 'deviceorientation', 'hashchange',
  'selectstart', 'selectionchange', 'popstate'
];

let user_events = null;

const getEventNames = (object) => {
  let names = [];

  for (let name in object) {
    if (name.indexOf('on') === 0) {
        names.push(name.substr(2));
    }
  }
  return names;
};

const attachListeners = (events, cb) => {
  for (let i = event_black_list.length - 1; i >= 0; i--) {
    let index = events.indexOf(event_black_list[i]);

    events.splice(index, 1);
  }

  for (let i = events.length - 1; i >= 0; i--) {
    window.addEventListener(events[i], cb, true);
  }
};

const attachDefinedListeners = (events, cb) => {
  for (let i = events.length - 1; i >= 0; i--) {
    window.addEventListener(events[i], cb, true);
  }
};

export function setupEvents(props) {
  user_events = props.user_events;
};

export function startUserEvents(cb) {

  if (user_events) {
    attachDefinedListeners(user_events, cb);
  } else {
    attachListeners(getEventNames(window), cb);
    attachListeners(getEventNames(document), cb);
  }
};
