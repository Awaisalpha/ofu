import { FacebookIcon, GitHubIcon, InstagramIcon, LinkedInIcon, XIcon } from '../ui/SocialIcons'

// Profiles without an href aren't set up yet, so they show muted and aren't links.
const profiles = [
  { label: 'GitHub', href: 'https://github.com/Awaisalpha', Icon: GitHubIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/awais-ahmed-506195219/', Icon: LinkedInIcon },
  { label: 'X', Icon: XIcon },
  { label: 'Facebook', Icon: FacebookIcon },
  { label: 'Instagram', Icon: InstagramIcon },
]

export default function SocialLinks() {
  return (
    <ul aria-label="Social profiles" className="flex items-center gap-1">
      {profiles.map(({ label, href, Icon }) => (
        <li key={label}>
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} profile, opens in a new tab`}
              className="grid size-10 place-items-center rounded-full text-muted hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <Icon />
            </a>
          ) : (
            <span
              role="link"
              aria-disabled="true"
              aria-label={`${label}, coming soon`}
              title={`${label}, coming soon`}
              className="grid size-10 cursor-not-allowed place-items-center text-line-strong"
            >
              <Icon />
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}
