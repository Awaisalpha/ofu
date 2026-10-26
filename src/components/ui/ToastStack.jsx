import Toast from './Toast'

export default function ToastStack({ toasts, onDismiss }) {
  return (
    // Sits above the fixed mobile nav on small screens.
    <div
      aria-live="polite"
      className="fixed right-4 bottom-20 left-4 z-50 flex flex-col items-end gap-2 sm:left-auto md:bottom-4"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  )
}
