type AllusionConfig = {
    trackingUrl: string;
}

type QueuePayload = {
    eventType: Events;
    visitTimestamp: number | undefined;
    eventData: AllusionEventData;
}

type AllusionEventData = {
    // Element related (click/change)
    srcElement: string | undefined;
    // Error related
    stack: string | undefined;
    errorMessage: string | undefined;
    lineNo: number | undefined;
    colNo: number | undefined;
    fileName: string | undefined;
    // XHR related
    url: string | undefined;
    method: string | undefined;
    statusCode: number | undefined;
}

enum Events {
    click = "click",
    load = "load",
    xhrSent = "xhrSent",
    error = "error",
    promiseRejectionEvent = "unhandledrejection",
    readyStateChanged = "readystatechange",
    change = "change"
}

export { AllusionConfig, Events, AllusionEventData, QueuePayload };