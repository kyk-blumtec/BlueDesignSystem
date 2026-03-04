import { useMemo, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { getMenuFigmaEntry } from '../config/menuFigmaMap'
import type { MenuPlaygroundArgs } from './getDesignSpecs'

type MenuPlaygroundProps = MenuPlaygroundArgs & {
  menuKey: string
  title: string
  description?: string
}

type LayerProperty = {
  property: string
  cssProperty: string
  value: string
  variable: string
  token: string
}

type LayerModel = {
  id: string
  label: string
  url: string
  properties: LayerProperty[]
}

const toKebab = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const getLayerLabel = (menuKey: string, index: number) => {
  if (menuKey === '2.1 Buttons') {
    const labels = ['Path', 'Primary', 'Hover', 'Active', 'Disabled']
    return labels[index] ?? `Layer ${index}`
  }
  return index === 0 ? 'Path' : `Layer ${index}`
}

const baseProperties = (args: MenuPlaygroundArgs): LayerProperty[] => [
  {
    property: 'Background',
    cssProperty: 'background',
    value: args.backgroundColor,
    variable: '--color-primary-500',
    token: 'foundation.color.primary.500',
  },
  {
    property: 'Text',
    cssProperty: 'color',
    value: args.textColor,
    variable: '--color-neutral-0',
    token: 'foundation.color.neutral.0',
  },
  {
    property: 'Radius',
    cssProperty: 'border-radius',
    value: `${args.radius}px`,
    variable: '--radius-md',
    token: 'foundation.radius.md',
  },
  {
    property: 'Font Size',
    cssProperty: 'font-size',
    value: `${args.fontSize}px`,
    variable: '--font-size-sm',
    token: 'foundation.typography.fontSize.sm',
  },
  {
    property: 'Font Weight',
    cssProperty: 'font-weight',
    value: `${args.fontWeight}`,
    variable: '--font-weight-medium',
    token: 'foundation.typography.fontWeight.medium',
  },
  {
    property: 'Padding',
    cssProperty: 'padding',
    value: `${args.paddingY}px ${args.paddingX}px`,
    variable: 'n/a',
    token: 'n/a',
  },
]

const layerPropertiesFor = (
  menuKey: string,
  index: number,
  args: MenuPlaygroundArgs
): LayerProperty[] => {
  const props = baseProperties(args).map((item) => ({ ...item }))

  if (menuKey === '2.1 Buttons' && index === 2) {
    props[0] = {
      ...props[0],
      value: 'var(--color-primary-700)',
      variable: '--color-primary-700',
      token: 'foundation.color.primary.700',
    }
  }
  if (menuKey === '2.1 Buttons' && index === 3) {
    props[0] = {
      ...props[0],
      value: 'var(--color-primary-700)',
      variable: '--color-primary-700',
      token: 'foundation.color.primary.700',
    }
    props.push({
      property: 'Transform',
      cssProperty: 'transform',
      value: 'translateY(1px)',
      variable: 'n/a',
      token: 'n/a',
    })
    props.push({
      property: 'Opacity',
      cssProperty: 'opacity',
      value: '0.92',
      variable: 'n/a',
      token: 'n/a',
    })
  }
  if (menuKey === '2.1 Buttons' && index === 4) {
    props[0] = {
      ...props[0],
      value: 'var(--color-neutral-200)',
      variable: '--color-neutral-200',
      token: 'foundation.color.neutral.200',
    }
    props[1] = {
      ...props[1],
      value: 'var(--color-neutral-700)',
      variable: '--color-neutral-700',
      token: 'foundation.color.neutral.700',
    }
    props.push({
      property: 'Cursor',
      cssProperty: 'cursor',
      value: 'not-allowed',
      variable: 'n/a',
      token: 'n/a',
    })
  }

  return props
}

const toLayerJson = (menuKey: string, title: string, layer: LayerModel) =>
  JSON.stringify(
    {
      menuKey,
      title,
      layer: layer.label,
      figmaUrl: layer.url,
      properties: layer.properties,
    },
    null,
    2
  )

const toLayerCss = (menuKey: string, layer: LayerModel) => {
  const className = `.${toKebab(menuKey)}-${toKebab(layer.label)}`
  const body = layer.properties.map((item) => `  ${item.cssProperty}: ${item.value};`)
  return [`${className} {`, ...body, '}'].join('\n')
}

const visualizeProperty = (item: LayerProperty): ReactNode => {
  if (item.property === 'Background' || item.property === 'Text') {
    return (
      <div style={{ display: 'grid', gap: 6 }}>
        <div
          style={{
            width: '100%',
            height: 36,
            borderRadius: 8,
            border: '1px solid #cbd5e1',
            background: item.value,
          }}
        />
        <div style={{ fontSize: 11, color: '#334155' }}>{item.value}</div>
      </div>
    )
  }

  if (item.property === 'Radius') {
    const radius = Number.parseFloat(item.value) || 0
    return (
      <div
        style={{
          width: '100%',
          height: 36,
          borderRadius: radius,
          border: '1px solid #cbd5e1',
          background: '#f8fafc',
        }}
      />
    )
  }

  if (item.property === 'Font Size' || item.property === 'Font Weight') {
    return (
      <div
        style={{
          fontSize: item.property === 'Font Size' ? item.value : 14,
          fontWeight: item.property === 'Font Weight' ? item.value : 500,
          color: '#0f172a',
        }}
      >
        Aa Sample Text
      </div>
    )
  }

  if (item.property === 'Padding') {
    return (
      <span
        style={{
          display: 'inline-block',
          padding: item.value,
          borderRadius: 8,
          background: '#e2e8f0',
          fontSize: 11,
          color: '#0f172a',
        }}
      >
        Padding
      </span>
    )
  }

  return (
    <span
      style={{
        display: 'inline-block',
        border: '1px solid #cbd5e1',
        borderRadius: 999,
        padding: '2px 8px',
        fontSize: 11,
        color: '#334155',
      }}
    >
      {item.value}
    </span>
  )
}

const buildPreviewStyle = (layer: LayerModel): CSSProperties => {
  const style: CSSProperties = {
    fontFamily: 'var(--font-family-base)',
    lineHeight: 'var(--line-height-normal)',
    border: 'none',
  }
  layer.properties.forEach((item) => {
    const key = item.cssProperty
      .replace(/-([a-z])/g, (_, char: string) => char.toUpperCase())
      .replace(/^\w/, (char) => char.toLowerCase()) as keyof CSSProperties
    ;(style as Record<string, string>)[key] = item.value
  })
  return style
}

const MenuPlayground = ({ menuKey, title, description, ...args }: MenuPlaygroundProps) => {
  const entry = getMenuFigmaEntry(menuKey)
  const [copyLabel, setCopyLabel] = useState('Copy')

  const layers = useMemo<LayerModel[]>(() => {
    if (!entry?.path) return []
    const urls = [entry.path, ...entry.layers]
    return urls.map((url, index) => ({
      id: `${menuKey}-${index}`,
      label: getLayerLabel(menuKey, index),
      url,
      properties: layerPropertiesFor(menuKey, index, args),
    }))
  }, [entry, menuKey, args])

  const copyText = async (value: string, key: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopyLabel(key)
      setTimeout(() => setCopyLabel('Copy'), 1000)
    } catch {
      setCopyLabel('Failed')
      setTimeout(() => setCopyLabel('Copy'), 1000)
    }
  }

  return (
    <div style={{ display: 'grid', gap: 16, padding: 16, background: '#f8fafc' }}>
      <section style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 16 }}>
        <h2 style={{ margin: '0 0 4px', fontSize: 22 }}>{title}</h2>
        <div style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>{menuKey}</div>
        <p style={{ margin: 0, color: '#334155', fontSize: 14 }}>
          {description ??
            'Each layer provides visualized design elements, property-variable-token-value mapping, and JSON/CSS converters.'}
        </p>
      </section>

      <section style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>
          Layer Properties And Conversion
        </div>
        {layers.length === 0 && (
          <div style={{ fontSize: 12, color: '#64748b' }}>No Figma path/layers for this menu.</div>
        )}
        <div style={{ display: 'grid', gap: 14 }}>
          {layers.map((layer) => {
            const jsonScript = toLayerJson(menuKey, title, layer)
            const cssScript = toLayerCss(menuKey, layer)
            return (
              <article
                key={layer.id}
                style={{ border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden', background: '#fff' }}
              >
                <div
                  style={{
                    padding: '10px 12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: '#f8fafc',
                    borderBottom: '1px solid #e2e8f0',
                    gap: 10,
                    flexWrap: 'wrap',
                  }}
                >
                  <strong style={{ fontSize: 13 }}>{layer.label}</strong>
                  <a href={layer.url} target="_blank" rel="noreferrer" style={{ fontSize: 12 }}>
                    Open Figma
                  </a>
                </div>

                <div style={{ padding: 12, display: 'grid', gap: 12 }}>
                  <div
                    style={{
                      border: '1px solid #e2e8f0',
                      borderRadius: 10,
                      background: '#f8fafc',
                      padding: 12,
                      display: 'grid',
                      gap: 8,
                    }}
                  >
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#0f172a' }}>
                      Figma Element Visualization
                    </div>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                      <button type="button" style={buildPreviewStyle(layer)}>
                        {layer.label}
                      </button>
                      <div style={{ fontSize: 12, color: '#475569' }}>
                        Live element preview generated from layer properties.
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
                        gap: 8,
                      }}
                    >
                      {layer.properties.map((item) => (
                        <div
                          key={`visual-${layer.id}-${item.property}`}
                          style={{
                            border: '1px solid #e2e8f0',
                            borderRadius: 8,
                            padding: 8,
                            background: '#fff',
                            display: 'grid',
                            gap: 6,
                          }}
                        >
                          <div style={{ fontSize: 11, color: '#64748b' }}>{item.property}</div>
                          {visualizeProperty(item)}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: 10 }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                      <thead>
                        <tr style={{ background: '#fff' }}>
                          <th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #e2e8f0' }}>
                            Property
                          </th>
                          <th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #e2e8f0' }}>
                            Variable
                          </th>
                          <th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #e2e8f0' }}>
                            Token
                          </th>
                          <th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #e2e8f0' }}>
                            Value
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {layer.properties.map((item) => (
                          <tr key={`${layer.id}-${item.property}`}>
                            <td style={{ padding: 10, borderBottom: '1px solid #f1f5f9' }}>{item.property}</td>
                            <td style={{ padding: 10, borderBottom: '1px solid #f1f5f9', color: '#475569' }}>
                              {item.variable}
                            </td>
                            <td style={{ padding: 10, borderBottom: '1px solid #f1f5f9', color: '#475569' }}>
                              {item.token}
                            </td>
                            <td style={{ padding: 10, borderBottom: '1px solid #f1f5f9', color: '#0f172a' }}>
                              {item.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div style={{ display: 'grid', gap: 8 }}>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        onClick={() => copyText(jsonScript, `JSON copied (${layer.label})`)}
                        style={{
                          border: '1px solid #cbd5e1',
                          borderRadius: 8,
                          padding: '5px 10px',
                          background: '#fff',
                          fontSize: 12,
                          cursor: 'pointer',
                        }}
                      >
                        JSON Convert
                      </button>
                      <button
                        type="button"
                        onClick={() => copyText(cssScript, `CSS copied (${layer.label})`)}
                        style={{
                          border: '1px solid #cbd5e1',
                          borderRadius: 8,
                          padding: '5px 10px',
                          background: '#fff',
                          fontSize: 12,
                          cursor: 'pointer',
                        }}
                      >
                        CSS Convert
                      </button>
                      <span style={{ fontSize: 12, color: '#475569', alignSelf: 'center' }}>{copyLabel}</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      <textarea
                        readOnly
                        value={jsonScript}
                        style={{
                          width: '100%',
                          minHeight: 150,
                          fontSize: 11,
                          fontFamily:
                            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Courier New", monospace',
                          border: '1px solid #e2e8f0',
                          borderRadius: 8,
                          padding: 8,
                          background: '#f8fafc',
                        }}
                      />
                      <textarea
                        readOnly
                        value={cssScript}
                        style={{
                          width: '100%',
                          minHeight: 150,
                          fontSize: 11,
                          fontFamily:
                            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Courier New", monospace',
                          border: '1px solid #e2e8f0',
                          borderRadius: 8,
                          padding: 8,
                          background: '#f8fafc',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default MenuPlayground
