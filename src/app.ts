import { Allusion } from './allusion';

if ((window as any)._alsn && typeof ((window as any)._alsn.config) !== "undefined") {
  let _alsn = new Allusion((window as any)._alsn.config);
  _alsn.init();
}

