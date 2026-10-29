// The heading block of the landing page tour. Wide enough that each heading line
// stays on one line at 56px.
export default function TourHeading() {
  return (
    <div className="max-w-5xl">
      <p className="text-xs leading-4 font-semibold tracking-[0.12em] text-accent uppercase">Take a tour</p>
      <h2
        id="tour-heading"
        className="mt-3 text-[32px] leading-[1.05] font-bold tracking-[-0.02em] text-balance md:text-5xl md:leading-[1.05] lg:text-[56px]"
      >
        Students, alumni, admins.
        <br />
        One place for every opportunity.
      </h2>
      <p className="mt-4 max-w-xl text-base text-pretty text-muted">
        Every role sees what it needs. Switch between them to see the same opportunities move from posting to
        approval to applying.
      </p>
    </div>
  )
}
