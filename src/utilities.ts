export class Utilities {

  static getCookie(name: string) {

    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ))
    return matches ? decodeURIComponent(matches[1]) : undefined
  }

  static getUA() {
    return window.navigator.userAgent;
  }
  
  static setCookie(name: string, value: string, props: any = {}) {

    var exp = props.expires

    if (typeof exp == "number" && exp) {
      var d = new Date()

      d.setTime(d.getTime() + exp*1000)

      exp = props.expires = d
    }

    if(exp && exp.toUTCString) { 
      props.expires = exp.toUTCString() 
    }

    value = encodeURIComponent(value)

    var updatedCookie = name + "=" + value

    for(var propName in props) {
      updatedCookie += "; " + propName

      var propValue = props[propName]

      if(propValue !== true) { 
        updatedCookie += "=" + propValue 
      }
    }

    document.cookie = updatedCookie
  }

  
  static deleteCookie(name: string) {
    this.setCookie(name, null, { expires: -1 })
  }

  static generateId() {
    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5));
  }

  static getTagOnly(outerHtml: string) {
    return outerHtml.substring(0, outerHtml.indexOf('>') + 1);
  }

  static urlB64ToUint8Array(base64String: any) {
    const eq:string = '='
    const padding = eq.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}