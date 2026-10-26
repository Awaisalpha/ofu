import { createContext, useCallback, useContext, useRef, useState } from 'react'
import ToastStack from '../components/ui/ToastStack'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const nextIdRef = useRef(1)

  // actionLabel and onAction are optional, e.g. "Undo" and a function that reverses the action.
  const showToast = useCallback(({ message, actionLabel, onAction }) => {
    const id = nextIdRef.current++
    setToasts((currentToasts) => [...currentToasts, { id, message, actionLabel, onAction }])
  }, [])

  const dismissToast = useCallback((id) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastStack toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useToast() {
  return useContext(ToastContext)
}
