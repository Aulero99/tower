import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {import('./models/TowerEvent.js').TowerEvent[]} */
  towerEvents: [],
  /** @type {import('./models/TowerEvent.js').TowerEvent{}|null} */
  activeTowerEvent: null,
  /** @type {import('./models/TowerEvent.js').Comment[]|null} */
  comments: null,
  /** @type {import('./models/TowerEvent.js').Ticket[]|null} */
  tickets: null,
})
