import { StateBadge, BatteryBadge } from './Badges.jsx'

export default function BoxCard({ box, onSelect }) {
  const pct = Math.round((box.currentWeight / box.weightLimit) * 100)

  return (
    <button
      onClick={() => onSelect(box.txref)}
      className="text-left bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md hover:border-brand-300 transition-all"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-slate-900 truncate" title={box.txref}>{box.txref}</h3>
        <StateBadge state={box.state} />
      </div>

      <div className="mt-3 space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Battery</span>
          <BatteryBadge level={box.batteryCapacity} />
        </div>

        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Load</span>
            <span>{box.currentWeight}g / {box.weightLimit}g</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-brand-500"
              style={{ width: `${Math.min(pct, 100)}%` }}
            />
          </div>
        </div>

        <div className="text-xs text-slate-500">
          {box.items.length} item{box.items.length === 1 ? '' : 's'} loaded
        </div>
      </div>
    </button>
  )
}
