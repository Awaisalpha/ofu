// The chart's values as a table for screen readers; hidden on screen.
// columns is a list of { key, label }; rows are the chart's data.
// sr-only goes on a wrapper: a table won't shrink below its content, so it would widen the page.
export default function ChartDataTable({ caption, columns, rows }) {
  return (
    <div className="sr-only">
      <table>
        <caption>{caption}</caption>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.key}>{row[column.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
