import { Link } from 'react-router'
import PagePlaceholder from '../../components/ui/PagePlaceholder'

export default function Landing() {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <PagePlaceholder title="Landing" milestone={2}>
        <Link
          to="/student/browse"
          className="mt-6 inline-block rounded-card bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Try the demo
        </Link>
      </PagePlaceholder>
    </main>
  )
}
