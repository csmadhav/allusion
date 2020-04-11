export class Utilities {
  static  getCookie(name: string): (string | undefined) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    const last = parts.pop();
    if (parts.length == 2 && last) {
        return last.split(";").shift();
    }
    return undefined;
  }

  static setCookie(name: string, val: string): void {
    const value = val;
    document.cookie = name+"="+value+"; path=/";
  }

  static generateId(): string {
    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5));
  }

  static getTagOnly(outerHtml: string): string {
    return outerHtml.substring(0, outerHtml.indexOf(">") + 1);
  }
}