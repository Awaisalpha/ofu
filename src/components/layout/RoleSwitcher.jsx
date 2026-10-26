import { ChevronDown, RotateCcw } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { useApp } from '../../store/AppContext'
import { roleHomePaths, roleLabels } from './navItems'

export default function RoleSwitcher({ role }) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const navigate = useNavigate()
  const { dispatch } = useApp()

  // Close the menu on Esc or a click outside it.
  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(event) {
      if (event.key === 'Escape') setIsOpen(false)
    }
    function handleClick(event) {
      if (!menuRef.current.contains(event.target)) setIsOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClick)
    }
  }, [isOpen])

  function switchRole(newRole) {
    setIsOpen(false)
    navigate(roleHomePaths[newRole])
  }

  function resetDemoData() {
    setIsOpen(false)
    if (window.confirm('Reset all demo data? Your changes will be lost.')) {
      dispatch({ type: 'RESET_DEMO' })
    }
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="flex items-center gap-1 rounded-md border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-blue-600"
      >
        View as: {roleLabels[role]}
        <ChevronDown size={16} aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-52 rounded-md border border-stone-200 bg-white py-1 shadow-lg">
          {Object.keys(roleLabels).map((roleKey) => (
            <button
              key={roleKey}
              type="button"
              onClick={() => switchRole(roleKey)}
              aria-current={roleKey === role ? 'true' : undefined}
              className={`block w-full px-4 py-2 text-left text-sm hover:bg-stone-100 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-600 ${
                roleKey === role ? 'font-semibold' : ''
              }`}
            >
              {roleLabels[roleKey]}
            </button>
          ))}
          <hr className="my-1 border-stone-200" />
          <button
            type="button"
            onClick={resetDemoData}
            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-700 hover:bg-stone-100 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-600"
          >
            <RotateCcw size={16} aria-hidden="true" />
            Reset demo data
          </button>
        </div>
      )}
    </div>
  )
}
