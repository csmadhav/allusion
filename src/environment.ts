import { AllusionConfig } from "./types";

declare var APP_ENV:String;

export class Environment {

  static readonly APP_VERSION = '1.0.0'

  static isDev() {
    return (APP_ENV === "development");
  }

  static isLocal() {
    return (APP_ENV === "local");
  }

  static isProd() {
    return (APP_ENV === "production");
  }
}
