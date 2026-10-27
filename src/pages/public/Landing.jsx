import ClosingBanner from '../../components/landing/ClosingBanner'
import ClosingSoon from '../../components/landing/ClosingSoon'
import Faq from '../../components/landing/Faq'
import HowItWorks from '../../components/landing/HowItWorks'
import LandingFooter from '../../components/landing/LandingFooter'
import LandingNav from '../../components/landing/LandingNav'
import ProblemVisual from '../../components/landing/ProblemVisual'
import SearchHero from '../../components/landing/SearchHero'

// A photo banner with a search box, so visitors can start looking straight away.
export default function Landing() {
  return (
    <>
      <LandingNav />
      <main id="main">
        <SearchHero />
        <div className="mx-auto max-w-6xl space-y-20 px-4 py-20 sm:px-6 sm:space-y-24">
          <ProblemVisual />
          <HowItWorks />
          <ClosingSoon />
          <Faq />
          <ClosingBanner />
        </div>
      </main>
      <LandingFooter />
    </>
  )
}
