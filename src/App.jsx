import { useCallback, useEffect, useState } from 'react'
import { boxApi, ApiError } from './api/boxApi.js'
import { useToasts } from './hooks/useToasts.js'
import Header from './components/Header.jsx'
import BoxGrid from './components/BoxGrid.jsx'
import CreateBoxModal from './components/CreateBoxModal.jsx'
import BoxDetailDrawer from './components/BoxDetailDrawer.jsx'
import ToastStack from './components/ToastStack.jsx'

export default function App() {
  const [boxes, setBoxes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAvailableOnly, setShowAvailableOnly] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedTxref, setSelectedTxref] = useState(null)
  const [actionBusy, setActionBusy] = useState(false)
  const [connectionError, setConnectionError] = useState(false)

  const toasts = useToasts()

  const selectedBox = boxes.find((b) => b.txref === selectedTxref) || null

  const loadBoxes = useCallback(async () => {
    setLoading(true)
    try {
      const data = showAvailableOnly ? await boxApi.listAvailableBoxes() : await boxApi.listBoxes()
      setBoxes(data)
      setConnectionError(false)
    } catch (err) {
      setConnectionError(true)
      toasts.error(describeError(err, 'Could not load boxes'))
    } finally {
      setLoading(false)
    }
  }, [showAvailableOnly]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    loadBoxes()
  }, [loadBoxes])

  async function handleCreate(payload) {
    try {
      await boxApi.createBox(payload)
      toasts.success(`Box "${payload.txref}" created`)
      setShowCreateModal(false)
      await loadBoxes()
      return true
    } catch (err) {
      toasts.error(describeError(err, 'Could not create box'))
      return false
    }
  }

  async function handleTransition(targetState) {
    if (!selectedBox) return
    setActionBusy(true)
    try {
      await boxApi.changeState(selectedBox.txref, targetState)
      toasts.success(`${selectedBox.txref} moved to ${targetState}`)
      await loadBoxes()
    } catch (err) {
      toasts.error(describeError(err, 'State change failed'))
    } finally {
      setActionBusy(false)
    }
  }

  async function handleLoadItem(item) {
    if (!selectedBox) return false
    setActionBusy(true)
    try {
      await boxApi.loadItem(selectedBox.txref, item)
      toasts.success(`Loaded "${item.name}" onto ${selectedBox.txref}`)
      await loadBoxes()
      return true
    } catch (err) {
      toasts.error(describeError(err, 'Could not load item'))
      return false
    } finally {
      setActionBusy(false)
    }
  }

  return (
    <div className="min-h-full">
      <Header
        showAvailableOnly={showAvailableOnly}
        onToggleAvailable={() => setShowAvailableOnly((v) => !v)}
        onCreateClick={() => setShowCreateModal(true)}
        onRefresh={loadBoxes}
        loading={loading}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {connectionError && (
          <div className="mb-4 rounded-lg border border-amber-300 bg-amber-50 text-amber-800 text-sm px-4 py-3">
            Couldn't reach the API at <code className="font-mono">{import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1/boxes'}</code>.
            Make sure the Spring Boot service is running (<code className="font-mono">mvn spring-boot:run</code>).
          </div>
        )}

        <BoxGrid boxes={boxes} onSelect={setSelectedTxref} loading={loading} />
      </main>

      {showCreateModal && (
        <CreateBoxModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreate}
        />
      )}

      {selectedBox && (
        <BoxDetailDrawer
          box={selectedBox}
          onClose={() => setSelectedTxref(null)}
          onTransition={handleTransition}
          onLoadItem={handleLoadItem}
          busy={actionBusy}
        />
      )}

      <ToastStack toasts={toasts.toasts} onDismiss={toasts.dismiss} />
    </div>
  )
}

function describeError(err, fallback) {
  if (err instanceof ApiError) {
    if (err.body?.details?.length) {
      return `${err.body.message}: ${err.body.details.join('; ')}`
    }
    return err.body?.message || fallback
  }
  return `${fallback} — is the backend running?`
}
