const variantClasses = {
  primary: 'bg-stone-900 text-white hover:bg-stone-700 disabled:bg-stone-300 disabled:text-stone-500',
  secondary:
    'border border-stone-300 bg-white text-stone-900 hover:bg-stone-100 disabled:text-stone-400',
}

export default function Button({ variant = 'primary', type = 'button', className = '', ...props }) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
      {...props}
    />
  )
}
