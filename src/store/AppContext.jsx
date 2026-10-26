import { createContext, useContext, useEffect, useReducer } from 'react'
import { createInitialState, reducer } from './reducer'
import { loadState, saveState } from './storage'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, () => loadState() ?? createInitialState())

  useEffect(() => {
    saveState(state)
  }, [state])

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  return useContext(AppContext)
}
