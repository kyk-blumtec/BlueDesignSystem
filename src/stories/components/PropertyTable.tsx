import type { ReactNode, CSSProperties } from 'react'
import '../storybook-theme.css'

export type LayerProperty = {
  property: string
  cssProperty: string
  value: string
  variable: string
  token: string
}

const visualize = (item: LayerProperty): ReactNode => {
  const css = item.cssProperty
  if (css.includes('background') || css === 'color' || css.includes('border-color')) {
    const colorVal = item.value.replace(/^.*?(#|var|rgb|hsl)/, '$1').replace(/;?\s*$/, '')
    return (
      <div style={{ display: 'grid', gap: 4 }}>
        <div className="ds-vis-swatch" style={{ background: colorVal }} />
        <span style={{ fontSize: 10, color: 'var(--ds-text-muted)' }}>{item.value}</span>
      </div>
    )
  }
  if (css === 'border-radius') {
    return <div className="ds-vis-radius" style={{ borderRadius: item.value }} />
  }
  if (css === 'font-size') {
    return <span style={{ fontSize: item.value }}>Aa</span>
  }
  if (css === 'font-weight') {
    return <span style={{ fontWeight: item.value as CSSProperties['fontWeight'] }}>Aa Sample</span>
  }
  if (css === 'box-shadow') {
    return (
      <div
        style={{
          width: 48,
          height: 28,
          borderRadius: 6,
          background: '#fff',
          boxShadow: item.value,
        }}
      />
    )
  }
  return <span className="ds-vis-chip">{item.value}</span>
}

type PropertyTableProps = {
  properties: LayerProperty[]
  searchQuery?: string
}

const PropertyTable = ({ properties, searchQuery }: PropertyTableProps) => {
  const filtered = searchQuery
    ? properties.filter((p) =>
      [p.property, p.cssProperty, p.value, p.variable, p.token]
        .join(' ')
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
    : properties

  if (filtered.length === 0) {
    return (
      <div style={{ fontSize: 13, color: 'var(--ds-text-muted)', padding: 12 }}>
        No matching properties.
      </div>
    )
  }

  return (
    <div className="ds-table-wrap">
      <table className="ds-table">
        <thead>
          <tr>
            <th>Property</th>
            <th>CSS Property</th>
            <th>Variable</th>
            <th>Token</th>
            <th>Value</th>
            <th style={{ minWidth: 80 }}>Visual</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item, i) => (
            <tr key={`${item.property}-${i}`}>
              <td style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{item.property}</td>
              <td className="ds-table__mono">{item.cssProperty}</td>
              <td className="ds-table__mono">{item.variable}</td>
              <td className="ds-table__mono">{item.token}</td>
              <td className="ds-table__value">{item.value}</td>
              <td>{visualize(item)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PropertyTable
