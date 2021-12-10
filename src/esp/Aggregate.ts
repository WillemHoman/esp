import { EventClass } from './EventClass'
import { EventBase } from './EventBase'

export interface Aggregate<T> {
  model: T
  eventClasses: EventClass[]
  hintEvent(event: EventBase): Aggregate<T>
  raiseEvent(event: EventBase): Aggregate<T>
}
