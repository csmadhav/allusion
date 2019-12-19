export interface IShouldQueue {
  serialize(item: Event | Error): any
}
