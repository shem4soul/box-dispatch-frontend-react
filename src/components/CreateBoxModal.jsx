import { useState } from 'react'

const TXREF_MAX = 20

export default function CreateBoxModal({ onClose, onCreate }) {
  const [txref, setTxref] = useState('')
  const [weightLimit, setWeightLimit] = useState(500)
  const [batteryCapacity, setBatteryCapacity] = useState(100)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState(null)

  const txrefTooLong = txref.length > TXREF_MAX

  async function handleSubmit(e) {
    e.preventDefault()
    setFormError(null)

    if (!txref.trim()) {
      setFormError('txref is required')
      return
    }
    if (txrefTooLong) {
      setFormError(`txref must be ${TXREF_MAX} characters or fewer`)
      return
    }

    setSubmitting(true)
    try {
      await onCreate({
        txref: txref.trim(),
        weightLimit: Number(weightLimit),
        batteryCapacity: Number(batteryCapacity),
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Create a new box</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600" aria-label="Close">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              txref <span className="text-slate-400 font-normal">(max {TXREF_MAX} chars)</span>
            </label>
            <input
              type="text"
              value={txref}
              onChange={(e) => setTxref(e.target.value)}
              maxLength={TXREF_MAX}
              placeholder="BOX-9001"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            />
            <div className="text-xs text-slate-400 mt-1">{txref.length}/{TXREF_MAX}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Weight limit (grams, max 500)
            </label>
            <input
              type="number"
              min={1}
              max={500}
              value={weightLimit}
              onChange={(e) => setWeightLimit(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Battery capacity (%)
            </label>
            <input
              type="number"
              min={0}
              max={100}
              value={batteryCapacity}
              onChange={(e) => setBatteryCapacity(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            />
          </div>

          {formError && (
            <p className="text-sm text-rose-600">{formError}</p>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-60"
            >
              {submitting ? 'Creating…' : 'Create box'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
