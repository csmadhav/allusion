export interface Queueable {
  serialize(item: Event | ErrorEvent): void;
}
