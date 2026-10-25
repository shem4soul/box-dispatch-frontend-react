const STATE_STYLES = {
  IDLE: 'bg-slate-100 text-slate-700 ring-slate-300',
  LOADING: 'bg-amber-100 text-amber-800 ring-amber-300',
  LOADED: 'bg-blue-100 text-blue-700 ring-blue-300',
  DELIVERING: 'bg-indigo-100 text-indigo-700 ring-indigo-300',
  DELIVERED: 'bg-emerald-100 text-emerald-700 ring-emerald-300',
  RETURNING: 'bg-purple-100 text-purple-700 ring-purple-300',
}

export function StateBadge({ state }) {
  const style = STATE_STYLES[state] || 'bg-slate-100 text-slate-700 ring-slate-300'
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ring-1 ring-inset ${style}`}>
      {state}
    </span>
  )
}

export function BatteryBadge({ level }) {
  let color = 'text-emerald-600'
  let bar = 'bg-emerald-500'
  if (level < 25) {
    color = 'text-rose-600'
    bar = 'bg-rose-500'
  } else if (level < 50) {
    color = 'text-amber-600'
    bar = 'bg-amber-500'
  }

  return (
    <div className="flex items-center gap-2 min-w-[90px]">
      <div className="w-14 h-2 rounded-full bg-slate-200 overflow-hidden">
        <div className={`h-full ${bar}`} style={{ width: `${Math.max(level, 2)}%` }} />
      </div>
      <span className={`text-xs font-medium ${color}`}>{level}%</span>
    </div>
  )
}
