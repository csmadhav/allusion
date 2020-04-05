# AllusionJS

<img src="https://github.com/csmadhav/allusionjs/raw/master/logo.png" width="100">

----

AllusionJS is an open source JavaScript bug tracking library. Import AllusionJS to any JavaScript project to start tracking errors in your environments.

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
here, https://track.yourdomain.com should lead to your inhouse logging and alerting platforms.

Jump to <a href="https://csmadhav.github.io/allusion/docs/what-and-how">docs</a>
