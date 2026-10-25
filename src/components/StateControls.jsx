import { nextStates, MIN_BATTERY_FOR_LOADING } from '../stateMachine.js'

const LABELS = {
  LOADING: 'Start loading',
  LOADED: 'Finish loading',
  IDLE: 'Cancel / Reset to idle',
  DELIVERING: 'Dispatch for delivery',
  DELIVERED: 'Mark delivered',
  RETURNING: 'Send back for return',
}

export default function StateControls({ box, onTransition, busy }) {
  const options = nextStates(box.state)
  const batteryTooLow = box.batteryCapacity < MIN_BATTERY_FOR_LOADING

  if (options.length === 0) {
    return <p className="text-sm text-slate-400 italic">No further transitions from this state.</p>
  }

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((target) => {
        const isLoadingBlocked = target === 'LOADING' && batteryTooLow
        return (
          <button
            key={target}
            disabled={busy || isLoadingBlocked}
            onClick={() => onTransition(target)}
            title={isLoadingBlocked ? `Battery must be ≥ ${MIN_BATTERY_FOR_LOADING}% to start loading` : undefined}
            className="px-3 py-2 text-sm font-medium rounded-lg border border-brand-300 text-brand-700 bg-brand-50 hover:bg-brand-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {LABELS[target] || target}
          </button>
        )
      })}
      {options.includes('LOADING') && batteryTooLow && (
        <p className="text-xs text-rose-600 w-full mt-1">
          Battery is below {MIN_BATTERY_FOR_LOADING}% — loading is disabled until it's recharged.
        </p>
      )}
    </div>
  )
}
