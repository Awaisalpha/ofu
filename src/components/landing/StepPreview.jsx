import ApprovalPreview from './ApprovalPreview'
import BrowsePreview from './BrowsePreview'
import PostPreview from './PostPreview'

const previews = [PostPreview, ApprovalPreview, BrowsePreview]

// A decorative picture of the app. inert keeps its buttons out of the tab order,
// and aria-hidden keeps screen readers on the real step text instead.
// The key restarts the fade each time the step changes.
export default function StepPreview({ activeStep }) {
  const Preview = previews[activeStep]

  return (
    <div aria-hidden="true" inert className="rounded-xl border border-line bg-surface p-3 text-left text-ink shadow-float">
      <div key={activeStep} className="motion-safe:animate-fade-in">
        <Preview />
      </div>
    </div>
  )
}
