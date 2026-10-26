import PagePlaceholder from '../../components/ui/PagePlaceholder'
import { useApp } from '../../store/AppContext'

export default function Browse() {
  const { state } = useApp()

  return (
    <PagePlaceholder title="Browse opportunities" milestone={2}>
      <p className="mt-4 text-sm text-stone-500">
        {state.opportunities.length} opportunities in the store.
      </p>
    </PagePlaceholder>
  )
}
