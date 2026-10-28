import FooterBrand from './FooterBrand'
import FooterCredit from './FooterCredit'
import FooterLinks from './FooterLinks'
import FooterNote from './FooterNote'
import SocialLinks from './SocialLinks'

// Under 768px the bottom row stacks with the icons on top and the credit below.
export default function LandingFooter() {
  return (
    <footer className="bg-surface">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center border-t border-line pt-16 pb-12 sm:pt-20">
          <FooterBrand />
          <div className="mt-6">
            <FooterLinks />
          </div>
          <div className="mt-4">
            <FooterNote />
          </div>
        </div>
        <div className="flex flex-col-reverse items-center gap-4 border-t border-dotted border-line-strong pt-6 pb-16 md:flex-row md:justify-between md:pb-20">
          <FooterCredit />
          <SocialLinks />
        </div>
      </div>
    </footer>
  )
}
