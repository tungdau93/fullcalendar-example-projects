
let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'event 1',
    start: '2021-04-13 13:00:00',
    end: '2021-04-13 14:00:00',
    classNames: ['myclass1']
  },
  {
    id: createEventId(),
    title: 'event 2',
    start: '2021-04-13 14:00:00',
    end: '2021-04-13 15:00:00',
  },
  {
    id: createEventId(),
    title: 'event 3',
    start: '2021-04-13 15:00:00',
    end: '2021-04-13 16:00:00',
  }
]

export function createEventId() {
  return String(eventGuid++)
}
