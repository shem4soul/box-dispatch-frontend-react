import { StateBadge, BatteryBadge } from './Badges.jsx'
import StateControls from './StateControls.jsx'
import LoadItemForm from './LoadItemForm.jsx'
import ItemList from './ItemList.jsx'

export default function BoxDetailDrawer({ box, onClose, onTransition, onLoadItem, busy }) {
  if (!box) return null

  return (
    <div className="fixed inset-0 z-30 flex justify-end">
      <div className="absolute inset-0 bg-slate-900/30" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white h-full shadow-xl overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-5 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">{box.txref}</h2>
            <StateBadge state={box.state} />
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl leading-none" aria-label="Close">✕</button>
        </div>

        <div className="p-5 space-y-6">
          <section>
            <h3 className="text-xs font-semibold uppercase text-slate-400 mb-2">Battery</h3>
            <BatteryBadge level={box.batteryCapacity} />
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase text-slate-400 mb-2">Load</h3>
            <p className="text-sm text-slate-600">{box.currentWeight}g / {box.weightLimit}g used</p>
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase text-slate-400 mb-2">State transitions</h3>
            <StateControls box={box} onTransition={onTransition} busy={busy} />
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase text-slate-400 mb-2">Load an item</h3>
            <LoadItemForm box={box} onLoadItem={onLoadItem} busy={busy} />
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase text-slate-400 mb-2">
              Items ({box.items.length})
            </h3>
            <ItemList items={box.items} />
          </section>
        </div>
      </div>
    </div>
  )
}
