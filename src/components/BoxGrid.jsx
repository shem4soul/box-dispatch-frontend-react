import BoxCard from './BoxCard.jsx'

export default function BoxGrid({ boxes, onSelect, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-36 rounded-xl bg-slate-100 animate-pulse" />
        ))}
      </div>
    )
  }

  if (boxes.length === 0) {
    return (
      <div className="text-center py-20 text-slate-500">
        <p className="text-lg font-medium">No boxes to show</p>
        <p className="text-sm">Try clearing the "available only" filter, or create a new box.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {boxes.map((box) => (
        <BoxCard key={box.txref} box={box} onSelect={onSelect} />
      ))}
    </div>
  )
}
