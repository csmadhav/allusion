export interface PushableEvent {
  listen(): void;
  handler(event: Event): void;
}
