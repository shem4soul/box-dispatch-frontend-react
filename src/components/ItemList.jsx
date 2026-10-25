export default function ItemList({ items }) {
  if (items.length === 0) {
    return <p className="text-sm text-slate-400 italic">No items loaded yet.</p>
  }

  return (
    <ul className="divide-y divide-slate-100 rounded-lg border border-slate-200 overflow-hidden">
      {items.map((item) => (
        <li key={item.id} className="flex items-center justify-between px-3 py-2 text-sm bg-white">
          <div>
            <p className="font-medium text-slate-800">{item.name}</p>
            <p className="text-xs text-slate-400">{item.code}</p>
          </div>
          <span className="text-slate-600 font-medium">{item.weight}g</span>
        </li>
      ))}
    </ul>
  )
}
