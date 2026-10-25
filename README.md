# Box Dispatch Console (Frontend)

A React frontend for the [Box Dispatch Service](../box-dispatch-service) REST API. Built with **Vite**, **React 18**, and **Tailwind CSS**.

## Features

- **Dashboard** — grid of all boxes showing txref, state, battery level, and load (weight used / weight limit)
- **Filter** — toggle to show only boxes available for loading (`IDLE` + battery ≥ 25%)
- **Create box** — modal form with client-side validation matching the backend's rules (txref ≤ 20 chars, weight limit ≤ 500g)
- **Box detail panel** — click any box to see its battery, load, items, and available actions
- **State transitions** — buttons only show the states a box can legally move to next (mirrors the backend's state machine); starting `LOADING` is disabled client-side when battery is under 25%, with the real enforcement always coming from the backend
- **Load items** — form with live validation (name/code character rules, remaining weight capacity), disabled unless the box is in `LOADING` state
- **Error handling** — every backend error (404, 409, 422, 400) surfaces as a toast notification with the actual message from the API, not a generic failure

## Prerequisites

- Node.js 18+ and npm
- The backend running — see [`../box-dispatch-service/README.md`](../box-dispatch-service/README.md). By default this app expects it at `http://localhost:8080`.

## Setup & run

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

If your backend runs somewhere other than `http://localhost:8080`, copy `.env.example` to `.env` and adjust:

```bash
cp .env.example .env
# edit VITE_API_BASE_URL in .env
```

## Build for production

```bash
npm run build    # outputs to dist/
npm run preview  # serve the production build locally
```

## Project structure

```
src/
├── api/boxApi.js            Thin fetch wrapper for every backend endpoint
├── stateMachine.js           Client-side mirror of the backend's allowed state transitions
├── hooks/useToasts.js        Toast notification state
├── components/
│   ├── Header.jsx             Title bar, available-only filter, create/refresh buttons
│   ├── Badges.jsx              StateBadge + BatteryBadge
│   ├── BoxGrid.jsx / BoxCard.jsx   Dashboard grid + individual box summary card
│   ├── CreateBoxModal.jsx      "New box" form
│   ├── BoxDetailDrawer.jsx     Slide-over panel: battery, load, transitions, items
│   ├── StateControls.jsx       Buttons for legal next states
│   ├── LoadItemForm.jsx        Add-item form with live validation
│   ├── ItemList.jsx            Items currently on a box
│   └── ToastStack.jsx          Notification stack
└── App.jsx                    Top-level state + API orchestration
```

## Notes

- The state-transition buttons and item-form validation mirror the backend's rules purely for a responsive UI (so invalid actions are visibly disabled rather than silently failing). The backend remains the source of truth — every action still goes through the real API call and surfaces the backend's actual response, so there's no risk of the UI getting out of sync with what's actually enforced server-side.
- No authentication is implemented, matching the backend (out of scope per the original brief).
