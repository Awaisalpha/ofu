import { useParams } from 'react-router'
import PagePlaceholder from '../../components/ui/PagePlaceholder'

export default function OpportunityDetail() {
  const { id } = useParams()

  return (
    <PagePlaceholder title="Opportunity detail" milestone={2}>
      <p className="mt-4 text-sm text-stone-500">Opportunity id: {id}</p>
    </PagePlaceholder>
  )
}
