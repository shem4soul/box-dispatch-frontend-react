export default function Header({ showAvailableOnly, onToggleAvailable, onCreateClick, onRefresh, loading }) {
  return (
    <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center gap-3 justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Box Dispatch Console</h1>
          <p className="text-sm text-slate-500">Manage delivery boxes, loading and battery status</p>
        </div>

        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 text-sm text-slate-600 select-none cursor-pointer">
            <input
              type="checkbox"
              checked={showAvailableOnly}
              onChange={onToggleAvailable}
              className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            />
            Available for loading only
          </label>

          <button
            onClick={onRefresh}
            disabled={loading}
            className="px-3 py-2 text-sm font-medium rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            {loading ? 'Refreshing…' : 'Refresh'}
          </button>

          <button
            onClick={onCreateClick}
            className="px-3 py-2 text-sm font-semibold rounded-lg bg-brand-600 text-white hover:bg-brand-700 shadow-sm"
          >
            + New Box
          </button>
        </div>
      </div>
    </header>
  )
}
