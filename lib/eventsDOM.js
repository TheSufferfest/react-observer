export function startDOMEvents(obj, cb) {
  let MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
      eventListenerSupported = window.addEventListener;

  if (MutationObserver) {
    let obs = new MutationObserver(function (mutations, observer) {
      cb();
    });

    // have the observer observe element for changes in children
    obs.observe(obj, { childList: true, subtree: true, attributes: true, characterData: true });
  } else if (eventListenerSupported) {
    obj.addEventListener('DOMNodeInserted', cb, false);
    obj.addEventListener('DOMNodeRemoved', cb, false);
  }
};