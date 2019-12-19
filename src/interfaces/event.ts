export interface IEvent {
  listen(): any,
  handler(event: Event): any
}
