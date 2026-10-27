import Toast from './Toast'

export default function ToastStack({ toasts, onDismiss }) {
  return (
    <div aria-live="polite" className="fixed right-4 bottom-4 left-4 z-50 flex flex-col items-end gap-2 sm:left-auto">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  )
}
