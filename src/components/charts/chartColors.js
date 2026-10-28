// Chart colours are the theme tokens from index.css, read as CSS variables,
// so the charts change with the theme and never use raw hex values.
export const chartColors = {
  primary: 'var(--color-accent)',
  grid: 'var(--color-line)',
  axisText: 'var(--color-muted)',
  cursor: 'var(--color-line-strong)',
}

// The line colour for each Overview metric, matching its card.
export const metricChartColors = {
  users: 'var(--color-metric-users-strong)',
  live: 'var(--color-metric-live-strong)',
  pending: 'var(--color-metric-pending-strong)',
  applications: 'var(--color-metric-applications-strong)',
}

// The dark identity tints, one per type, each 3:1 or more against the white card.
export const typeChartColors = {
  Job: 'var(--color-accent)',
  Internship: 'var(--color-tint-sky)',
  Scholarship: 'var(--color-tint-violet)',
  Freelance: 'var(--color-tint-fuchsia)',
  Event: 'var(--color-tint-sand)',
}
