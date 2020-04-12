import { Allusion } from "./AllusionB";

if (window._alsn && typeof (window._alsn.config) !== "undefined") {
  const _alsn = new Allusion(window._alsn.config);
  _alsn.init();
}

