# AllusionJS

<img src="https://github.com/csmadhav/allusionjs/raw/master/logo.png" width="100">

----

![build svg](https://api.travis-ci.org/csmadhav/allusion.svg?branch=master)
![codecov svg](https://codecov.io/gh/csmadhav/allusion/branch/master/graphs/badge.svg?branch=master)

AllusionJS is an open source JavaScript bug tracking library. Import AllusionJS to any JavaScript project to start tracking errors in your environments.

Install as an npm dependency

```bash
    npm i allusionjs
```

Import allusion like this as early as possible after loading the page.

```js
    import { Allusion } from 'allusionjs';

    let _alsn = new Allusion({ trackingUrl: 'https://track.yourdomain.com' });
    _alsn.init() // call this as a first thing after bootstraping your app.
```

here, <https://track.yourdomain.com> should lead to your inhouse logging and alerting platforms.

Jump to [docs](https://csmadhav.github.io/allusion/docs/what-and-how)
