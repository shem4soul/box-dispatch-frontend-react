const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1/boxes'

/**
 * Thrown for any non-2xx response. Carries the parsed backend error body
 * (see GlobalExceptionHandler on the server: { status, error, message, details }).
 */
export class ApiError extends Error {
  constructor(status, body) {
    super(body?.message || `Request failed with status ${status}`)
    this.status = status
    this.body = body
  }
}

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  // 204 No Content or empty bodies
  const text = await res.text()
  const data = text ? JSON.parse(text) : null

  if (!res.ok) {
    throw new ApiError(res.status, data)
  }
  return data
}

export const boxApi = {
  listBoxes: () => request(''),
  listAvailableBoxes: () => request('/available'),
  getBox: (txref) => request(`/${encodeURIComponent(txref)}`),
  getBattery: (txref) => request(`/${encodeURIComponent(txref)}/battery`),
  getItems: (txref) => request(`/${encodeURIComponent(txref)}/items`),
  createBox: (payload) =>
    request('', { method: 'POST', body: JSON.stringify(payload) }),
  changeState: (txref, state) =>
    request(`/${encodeURIComponent(txref)}/state`, {
      method: 'PATCH',
      body: JSON.stringify({ state }),
    }),
  loadItem: (txref, item) =>
    request(`/${encodeURIComponent(txref)}/items`, {
      method: 'POST',
      body: JSON.stringify(item),
    }),
}
