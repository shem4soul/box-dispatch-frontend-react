import { useState } from 'react'

const NAME_PATTERN = /^[A-Za-z0-9_-]+$/
const CODE_PATTERN = /^[A-Z0-9_]+$/

export default function LoadItemForm({ box, onLoadItem, busy }) {
  const [name, setName] = useState('')
  const [weight, setWeight] = useState('')
  const [code, setCode] = useState('')
  const [touched, setTouched] = useState(false)

  const remaining = box.weightLimit - box.currentWeight
  const weightNum = Number(weight)

  const errors = []
  if (touched) {
    if (!name) errors.push('Name is required')
    else if (!NAME_PATTERN.test(name)) errors.push('Name may only contain letters, numbers, - and _')

    if (!code) errors.push('Code is required')
    else if (!CODE_PATTERN.test(code)) errors.push('Code may only contain upper-case letters, numbers and _')

    if (!weight) errors.push('Weight is required')
    else if (weightNum <= 0) errors.push('Weight must be greater than 0')
    else if (weightNum > remaining) errors.push(`Weight exceeds remaining capacity (${remaining}g left)`)
  }

  const canSubmit = box.state === 'LOADING'

  async function handleSubmit(e) {
    e.preventDefault()
    setTouched(true)
    if (!name || !code || !weight) return
    if (!NAME_PATTERN.test(name) || !CODE_PATTERN.test(code)) return
    if (weightNum <= 0) return

    const ok = await onLoadItem({ name, weight: weightNum, code })
    if (ok) {
      setName('')
      setWeight('')
      setCode('')
      setTouched(false)
    }
  }

  if (!canSubmit) {
    return (
      <p className="text-sm text-slate-400 italic">
        Move the box into LOADING state to add items.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <input
          type="text"
          placeholder="Name (e.g. First-Aid_Kit)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
        />
        <input
          type="number"
          placeholder="Weight (g)"
          min={1}
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
        />
        <input
          type="text"
          placeholder="Code (e.g. MED_001)"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500">{remaining}g remaining of {box.weightLimit}g limit</span>
        <button
          type="submit"
          disabled={busy}
          className="px-3 py-2 text-sm font-semibold rounded-lg bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-60"
        >
          {busy ? 'Loading…' : 'Load item'}
        </button>
      </div>

      {errors.length > 0 && (
        <ul className="text-xs text-rose-600 list-disc list-inside space-y-0.5">
          {errors.map((err) => <li key={err}>{err}</li>)}
        </ul>
      )}
    </form>
  )
}
