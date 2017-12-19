# react-observer
Monitors rendering times


## Quick Start

Clone the project:
```
git clone https://github.com/kublikon/react-observer.git
cd react-observer
```

Run `npm install` in the root folder:
```
npm install
```

The simplest way to start using the observer tool is to import it and add the name
of the main element `id` to the `startObserver` params.

```javascript
import { startObserver } from 'react-observer';

startObserver({
  app_container_id: 'root'
});
```

By doing so, observer will track the time between an event in DOM and the
first modification to the DOM nodes.

To observer the `render` functions triggering in between these events, simply add
the `observe(this)` inside the `render` function before the `return` is called.

```javascript
  render() {

    observe(this);

    return (
      <div>
        <h1>Hello</h1>
      </div>
    );
  }
```


## Settings

There are a couple of ways to configure the observer tool by passing these parameters
into the `startObserver` function:

* `app_container_id` - `string`: is the root id of the element that contains the entire react DOM structure.
* `debug` - `bool`: enables console logs.
* `user_events` - `[string]`: a list of events that you want observer to track.
* `dock` - `left/right`: position of the observer tab console.
* `good_time` - `number`: the optimal time (in ms) for a process; times below this will be considered bad performance.
