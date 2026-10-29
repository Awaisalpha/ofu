// "#top" scrolls to the top of the page even though no element has that id.
export default function FooterBrand() {
  return (
    <a
      href="#top"
      className="inline-flex items-center gap-2 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent text-[11px] font-bold tracking-wide text-white">
        OFU
      </span>
      <span className="sr-only"> home</span>
    </a>
  )
}
