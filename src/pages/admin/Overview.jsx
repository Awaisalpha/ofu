import PagePlaceholder from '../../components/ui/PagePlaceholder'
import { useApp } from '../../store/AppContext'

export default function Overview() {
  const { state } = useApp()

  return (
    <PagePlaceholder title="Overview" milestone={3}>
      <p className="mt-4 text-sm text-stone-500">
        {state.users.length} users, {state.opportunities.length} opportunities,{' '}
        {state.applications.length} applications in the store.
      </p>
    </PagePlaceholder>
  )
}
