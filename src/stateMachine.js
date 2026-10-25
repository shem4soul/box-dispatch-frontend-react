// Mirrors BoxService.ALLOWED_TRANSITIONS on the backend. This is purely a UI
// convenience to only show legal next steps — the backend is the source of
// truth and will reject anything illegal regardless of what the UI shows.
export const ALLOWED_TRANSITIONS = {
  IDLE: ['LOADING'],
  LOADING: ['LOADED', 'IDLE'],
  LOADED: ['DELIVERING'],
  DELIVERING: ['DELIVERED'],
  DELIVERED: ['RETURNING'],
  RETURNING: ['IDLE'],
}

export const MIN_BATTERY_FOR_LOADING = 25

export function nextStates(current) {
  return ALLOWED_TRANSITIONS[current] || []
}
