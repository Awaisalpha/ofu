import { SearchX } from 'lucide-react'
import { useSearchParams } from 'react-router'
import BrowseHero from '../../components/opportunity/BrowseHero'
import FilterBar from '../../components/opportunity/FilterBar'
import OpportunityCard from '../../components/opportunity/OpportunityCard'
import OpportunityCardSkeleton from '../../components/opportunity/OpportunityCardSkeleton'
import SortSelect from '../../components/opportunity/SortSelect'
import Button from '../../components/ui/Button'
import EmptyState from '../../components/ui/EmptyState'
import Skeleton from '../../components/ui/Skeleton'
import { opportunityTypes } from '../../data/opportunities'
import { useSimulatedLoading } from '../../hooks/useSimulatedLoading'
import { useApp } from '../../store/AppContext'
import { filterOpportunities, sortOpportunities } from '../../utils/filters'

const SKELETON_CARD_COUNT = 8

export default function Browse() {
  const { state } = useApp()
  const isLoading = useSimulatedLoading()

  // Filters live in the URL, so they are still there after opening a card and going back.
  const [searchParams, setSearchParams] = useSearchParams()
  const searchText = searchParams.get('q') ?? ''
  // The URL holds a lowercase slug (?type=internship); unknown values fall back to All.
  const type = opportunityTypes.find((option) => option.toLowerCase() === searchParams.get('type')) ?? 'All'
  const sortBy = searchParams.get('sort') ?? 'closing-soonest'
  const hasActiveFilters = searchText !== '' || type !== 'All'

  function updateParam(key, value, defaultValue) {
    const newParams = new URLSearchParams(searchParams)
    if (value === defaultValue) {
      newParams.delete(key)
    } else {
      newParams.set(key, value)
    }
    // replace: typing in the search box shouldn't add a history entry per letter.
    setSearchParams(newParams, { replace: true })
  }

  // Keeps the chosen sort order; it isn't a filter.
  function clearFilters() {
    const newParams = new URLSearchParams()
    if (searchParams.has('sort')) newParams.set('sort', sortBy)
    setSearchParams(newParams, { replace: true })
  }

  const approvedOpportunities = state.opportunities.filter((opportunity) => opportunity.status === 'approved')
  const filteredOpportunities = sortOpportunities(
    filterOpportunities(approvedOpportunities, { searchText, type }),
    sortBy,
  )
  const resultCount = filteredOpportunities.length

  return (
    <section>
      <BrowseHero />

      {/* Floats over the bottom edge of the hero. */}
      <div className="relative mx-2 -mt-10 rounded-card bg-surface p-3 shadow-float sm:mx-6 sm:p-4">
        <FilterBar
          searchText={searchText}
          type={type}
          onSearchChange={(value) => updateParam('q', value, '')}
          onTypeChange={(value) => updateParam('type', value.toLowerCase(), 'all')}
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-h-9 items-center gap-3">
          {isLoading ? (
            <Skeleton className="h-4 w-28" />
          ) : (
            <p aria-live="polite" className="text-sm text-muted">
              <span className="font-semibold text-ink tabular-nums">{resultCount}</span>{' '}
              {resultCount === 1 ? 'result' : 'results'}
            </p>
          )}
          {hasActiveFilters && (
            <Button variant="secondary" onClick={clearFilters}>
              Clear filters
            </Button>
          )}
        </div>
        <SortSelect sortBy={sortBy} onSortChange={(value) => updateParam('sort', value, 'closing-soonest')} />
      </div>

      <div className="mt-4">
        {isLoading ? (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {Array.from({ length: SKELETON_CARD_COUNT }, (_, index) => (
              <OpportunityCardSkeleton key={index} />
            ))}
          </div>
        ) : resultCount === 0 ? (
          <EmptyState icon={SearchX} message="No opportunities match your search. Try another word or type.">
            <Button variant="secondary" onClick={clearFilters}>
              Clear filters
            </Button>
          </EmptyState>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredOpportunities.map((opportunity) => (
              <li key={opportunity.id}>
                <OpportunityCard opportunity={opportunity} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
