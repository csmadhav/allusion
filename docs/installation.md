---
id: installation
title: Installation
---

## via NPM!

Install as an npm dependency
```
    npm i allusionjs
```

Import allusion like this as early as possible after loading the page.

```
    import { Allusion } from 'allusionjs';

    let _alsn = new Allusion({ trackingUrl: 'https://track.yourdomain.com' });
    _alsn.init() // call this as a first thing after bootstraping your app.
```

For example, in a react app correct place to call `init` would be before mouting root component like this:

```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Allusion } from 'allusionjs';
const _alsn = new Allusion({ trackingUrl: 'https://track.yourdomain.com' });

_alsn.init()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

## import as a vanilla JS
We currently dont support serving from a CDN, but you can generate a build and import in your project.

First, clone the allusionjs source
```
    git clone https://github.com/csmadhav/allusion # OR git@github.com:csmadhav/allusion
```
Next, simply run
```
    cd allusion && npm i && build:standalone
```
Then, include this build `dist/bundle.js` like this:
```
    <script>
        window._alsn = {
            config: {
                trackingUrl: "http://localhost:8080/track",
            }
        }
    </script>
    <script src="<path-to-bundle-js>"></script>
```


