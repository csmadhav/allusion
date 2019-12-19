import { Allusion } from './allusion';

if ((window as any)._alsn && typeof ((window as any)._alsn.config) !== "undefined") {
  (window as any)._alsn = new Allusion((window as any)._alsn.config);
  (window as any)._alsn.init();
}

