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
  nodeId: string
  properties: LayerProperty[]
}

const toKebab = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const getNodeId = (url: string) => {
  const match = url.match(/node-id=([^&]+)/)
  return match ? decodeURIComponent(match[1]) : 'n/a'
}

const createProp = (
  property: string,
  cssProperty: string,
  value: string,
  variable: string,
  token: string
): LayerProperty => ({ property, cssProperty, value, variable, token })

const getLayerLabel = (menuKey: string, index: number) => {
  if (menuKey === '2.1 Buttons') {
    const labels = ['Path', 'Primary', 'Hover', 'Active', 'Disabled']
    return labels[index] ?? `Layer ${index}`
  }
  if (menuKey === '2.3 Modal') {
    const labels = ['Path', 'Default', 'Scrollable', 'Fullscreen']
    return labels[index] ?? `Layer ${index}`
  }
  return index === 0 ? 'Path' : `Layer ${index}`
}

const getMenuProperties = (
  menuKey: string,
  layerIndex: number,
  args: MenuPlaygroundArgs
): LayerProperty[] => {
  if (menuKey === '1.1 Colors') {
    return [
      createProp('Primary', 'background', layerIndex % 2 === 0 ? 'var(--color-primary-500)' : 'var(--color-primary-700)', '--color-primary-500', 'foundation.color.primary.500'),
      createProp('Neutral', 'color', 'var(--color-neutral-900)', '--color-neutral-900', 'foundation.color.neutral.900'),
      createProp('Surface', 'border-color', 'var(--color-neutral-200)', '--color-neutral-200', 'foundation.color.neutral.200'),
    ]
  }
  if (menuKey === '1.2 Typography') {
    return [
      createProp('Font Family', 'font-family', 'var(--font-family-base)', '--font-family-base', 'foundation.typography.fontFamily.base'),
      createProp('Font Size', 'font-size', layerIndex === 0 ? '24px' : '16px', '--font-size-lg', 'foundation.typography.fontSize.lg'),
      createProp('Font Weight', 'font-weight', layerIndex === 0 ? '700' : '500', '--font-weight-bold', 'foundation.typography.fontWeight.bold'),
      createProp('Line Height', 'line-height', 'var(--line-height-normal)', '--line-height-normal', 'foundation.typography.lineHeight.normal'),
    ]
  }
  if (menuKey === '1.3 Grid') {
    return [
      createProp('Columns', 'grid-template-columns', layerIndex === 0 ? 'repeat(12, 1fr)' : 'repeat(8, 1fr)', 'n/a', 'foundation.grid.columns'),
      createProp('Gutter', 'column-gap', layerIndex === 0 ? '24px' : '16px', 'n/a', 'foundation.grid.gutter'),
      createProp('Margin', 'padding-inline', layerIndex === 0 ? '24px' : '16px', 'n/a', 'foundation.grid.margin'),
    ]
  }
  if (menuKey === '1.4 Icon') {
    return [
      createProp('Size', 'font-size', layerIndex === 0 ? '24px' : '20px', 'n/a', 'foundation.icon.size'),
      createProp('Stroke', 'border-width', '1.5px', 'n/a', 'foundation.icon.stroke'),
      createProp('Color', 'color', 'var(--color-neutral-700)', '--color-neutral-700', 'foundation.color.neutral.700'),
    ]
  }
  if (menuKey === '1.5 Radius') {
    return [
      createProp('Radius', 'border-radius', layerIndex === 0 ? '4px' : '12px', '--radius-md', 'foundation.radius.md'),
      createProp('Surface', 'background', 'var(--color-neutral-50)', '--color-neutral-50', 'foundation.color.neutral.50'),
      createProp('Border', 'border-color', 'var(--color-neutral-200)', '--color-neutral-200', 'foundation.color.neutral.200'),
    ]
  }
  if (menuKey === '1.6 Shadow') {
    return [
      createProp('Shadow', 'box-shadow', layerIndex === 0 ? '0 2px 8px rgba(15,23,42,0.12)' : '0 8px 24px rgba(15,23,42,0.2)', 'n/a', 'foundation.shadow.level'),
      createProp('Radius', 'border-radius', '12px', '--radius-lg', 'foundation.radius.lg'),
      createProp('Surface', 'background', '#ffffff', 'n/a', 'foundation.color.neutral.0'),
    ]
  }

  if (menuKey === '2.1 Buttons') {
    const bg = layerIndex === 2 || layerIndex === 3 ? 'var(--color-primary-700)' : layerIndex === 4 ? 'var(--color-neutral-200)' : 'var(--color-primary-500)'
    const text = layerIndex === 4 ? 'var(--color-neutral-700)' : 'var(--color-neutral-0)'
    return [
      createProp('Background', 'background', bg, bg.includes('700') ? '--color-primary-700' : bg.includes('200') ? '--color-neutral-200' : '--color-primary-500', 'component.button.background'),
      createProp('Text', 'color', text, text.includes('700') ? '--color-neutral-700' : '--color-neutral-0', 'component.button.text'),
      createProp('Radius', 'border-radius', '8px', '--radius-md', 'foundation.radius.md'),
      createProp('Font Size', 'font-size', '14px', '--font-size-sm', 'foundation.typography.fontSize.sm'),
      createProp('Font Weight', 'font-weight', '500', '--font-weight-medium', 'foundation.typography.fontWeight.medium'),
      createProp('Padding', 'padding', '10px 16px', 'n/a', 'component.button.padding'),
      ...(layerIndex === 3 ? [createProp('Transform', 'transform', 'translateY(1px)', 'n/a', 'component.button.activeTransform')] : []),
      ...(layerIndex === 4 ? [createProp('Cursor', 'cursor', 'not-allowed', 'n/a', 'component.button.disabledCursor')] : []),
    ]
  }
  if (menuKey === '2.2 Input') {
    return [
      createProp('Background', 'background', '#ffffff', 'n/a', 'component.input.background'),
      createProp('Border', 'border', layerIndex === 0 ? '1px solid var(--color-neutral-200)' : '1px solid var(--color-primary-500)', 'n/a', 'component.input.border'),
      createProp('Radius', 'border-radius', '8px', '--radius-md', 'foundation.radius.md'),
      createProp('Padding', 'padding', '10px 12px', 'n/a', 'component.input.padding'),
      createProp('Text', 'color', 'var(--color-neutral-900)', '--color-neutral-900', 'foundation.color.neutral.900'),
    ]
  }
  if (menuKey === '2.3 Modal') {
    return [
      createProp('Surface', 'background', '#ffffff', 'n/a', 'component.modal.surface'),
      createProp('Radius', 'border-radius', layerIndex === 3 ? '0px' : '16px', '--radius-xl', 'foundation.radius.xl'),
      createProp('Shadow', 'box-shadow', '0 12px 28px rgba(15,23,42,0.25)', 'n/a', 'foundation.shadow.level'),
      createProp('Padding', 'padding', layerIndex === 3 ? '24px' : '20px', 'n/a', 'component.modal.padding'),
      createProp('Width', 'width', layerIndex === 3 ? '100%' : layerIndex === 2 ? '720px' : '560px', 'n/a', 'component.modal.width'),
    ]
  }
  if (menuKey === '2.4 Checkbox') {
    return [
      createProp('Size', 'width', '16px', 'n/a', 'component.checkbox.size'),
      createProp('Radius', 'border-radius', '4px', '--radius-sm', 'foundation.radius.sm'),
      createProp('Border', 'border', '1px solid var(--color-neutral-700)', 'n/a', 'component.checkbox.border'),
      createProp('Checked Color', 'background', 'var(--color-primary-500)', '--color-primary-500', 'component.checkbox.checkedBg'),
    ]
  }
  if (menuKey === '2.5 RadioGroup') {
    return [
      createProp('Size', 'width', '16px', 'n/a', 'component.radio.size'),
      createProp('Border', 'border', '1px solid var(--color-neutral-700)', 'n/a', 'component.radio.border'),
      createProp('Checked Dot', 'background', 'var(--color-primary-500)', '--color-primary-500', 'component.radio.dot'),
      createProp('Gap', 'gap', '8px', 'n/a', 'component.radio.groupGap'),
    ]
  }
  if (menuKey === '2.6 Pagination') {
    return [
      createProp('Item Size', 'width', '32px', 'n/a', 'component.pagination.itemSize'),
      createProp('Radius', 'border-radius', '8px', '--radius-md', 'foundation.radius.md'),
      createProp('Active Color', 'background', 'var(--color-primary-500)', '--color-primary-500', 'component.pagination.activeBg'),
      createProp('Text', 'color', 'var(--color-neutral-700)', '--color-neutral-700', 'foundation.color.neutral.700'),
    ]
  }
  if (menuKey === '2.7 Navigation') {
    return [
      createProp('Height', 'height', '56px', 'n/a', 'component.nav.height'),
      createProp('Surface', 'background', '#ffffff', 'n/a', 'component.nav.surface'),
      createProp('Border', 'border-bottom', '1px solid var(--color-neutral-200)', 'n/a', 'component.nav.border'),
      createProp('Active', 'color', 'var(--color-primary-500)', '--color-primary-500', 'component.nav.active'),
    ]
  }
  if (menuKey === '2.8 Tab') {
    return [
      createProp('Indicator', 'border-bottom', '2px solid var(--color-primary-500)', 'n/a', 'component.tab.indicator'),
      createProp('Text', 'color', 'var(--color-neutral-700)', '--color-neutral-700', 'foundation.color.neutral.700'),
      createProp('Active Text', 'font-weight', '600', 'n/a', 'component.tab.activeWeight'),
      createProp('Gap', 'gap', '20px', 'n/a', 'component.tab.gap'),
    ]
  }
  if (menuKey === '2.9 Tooltip') {
    return [
      createProp('Background', 'background', '#0f172a', 'n/a', 'component.tooltip.background'),
      createProp('Text', 'color', '#ffffff', 'n/a', 'component.tooltip.text'),
      createProp('Radius', 'border-radius', '6px', '--radius-sm', 'foundation.radius.sm'),
      createProp('Padding', 'padding', '6px 10px', 'n/a', 'component.tooltip.padding'),
    ]
  }
  if (menuKey === '2.10 Badge & Tag') {
    return [
      createProp('Background', 'background', layerIndex % 2 === 0 ? 'var(--color-primary-50)' : 'var(--color-neutral-200)', '--color-primary-50', 'component.badge.background'),
      createProp('Text', 'color', 'var(--color-primary-700)', '--color-primary-700', 'component.badge.text'),
      createProp('Radius', 'border-radius', '9999px', '--radius-full', 'foundation.radius.full'),
      createProp('Padding', 'padding', '4px 10px', 'n/a', 'component.badge.padding'),
    ]
  }
  if (menuKey === '2.11 Card') {
    return [
      createProp('Surface', 'background', '#ffffff', 'n/a', 'component.card.surface'),
      createProp('Radius', 'border-radius', '12px', '--radius-lg', 'foundation.radius.lg'),
      createProp('Shadow', 'box-shadow', '0 4px 12px rgba(15,23,42,0.14)', 'n/a', 'component.card.shadow'),
      createProp('Padding', 'padding', '16px', 'n/a', 'component.card.padding'),
    ]
  }

  return [
    createProp('Background', 'background', args.backgroundColor, '--color-primary-500', 'default.background'),
    createProp('Text', 'color', args.textColor, '--color-neutral-0', 'default.text'),
  ]
}

const toLayerJson = (menuKey: string, title: string, layer: LayerModel) =>
  JSON.stringify(
    {
      menuKey,
      title,
      layer: layer.label,
      figmaUrl: layer.url,
      nodeId: layer.nodeId,
      properties: layer.properties,
    },
    null,
    2
  )

const toLayerCss = (menuKey: string, layer: LayerModel) => {
  const className = `.${toKebab(menuKey)}-${toKebab(layer.label)}`
  return [
    `${className} {`,
    ...layer.properties.map((item) => `  ${item.cssProperty}: ${item.value};`),
    '}',
  ].join('\n')
}

const visualizeProperty = (item: LayerProperty): ReactNode => {
  if (item.cssProperty.includes('background') || item.cssProperty === 'color') {
    return (
      <div style={{ display: 'grid', gap: 6 }}>
        <div
          style={{
            width: '100%',
            height: 34,
            borderRadius: 8,
            border: '1px solid #cbd5e1',
            background: item.value,
          }}
        />
        <div style={{ fontSize: 11, color: '#334155' }}>{item.value}</div>
      </div>
    )
  }
  if (item.cssProperty === 'border-radius') {
    return (
      <div
        style={{
          width: '100%',
          height: 34,
          borderRadius: item.value,
          border: '1px solid #cbd5e1',
          background: '#f8fafc',
        }}
      />
    )
  }
  if (item.cssProperty === 'font-size' || item.cssProperty === 'font-weight') {
    return (
      <div style={{ fontSize: item.cssProperty === 'font-size' ? item.value : 14, fontWeight: item.cssProperty === 'font-weight' ? item.value : 500 }}>
        Aa Sample
      </div>
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

const previewStyleFromLayer = (layer: LayerModel): CSSProperties => {
  const style: CSSProperties = {
    fontFamily: 'var(--font-family-base)',
    lineHeight: 'var(--line-height-normal)',
  }
  layer.properties.forEach((item) => {
    const camel = item.cssProperty.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())
    ;(style as Record<string, string>)[camel] = item.value
  })
  return style
}

const MenuPlayground = ({ menuKey, title, description, ...args }: MenuPlaygroundProps) => {
  const entry = getMenuFigmaEntry(menuKey)
  const [copyStatus, setCopyStatus] = useState('Copy')

  const layers = useMemo<LayerModel[]>(() => {
    if (!entry?.path) return []
    const urls = [entry.path, ...entry.layers]
    return urls.map((url, index) => ({
      id: `${menuKey}-${index}`,
      label: getLayerLabel(menuKey, index),
      url,
      nodeId: getNodeId(url),
      properties: getMenuProperties(menuKey, index, args),
    }))
  }, [entry, menuKey, args])

  const copyToClipboard = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopyStatus(label)
      setTimeout(() => setCopyStatus('Copy'), 1000)
    } catch {
      setCopyStatus('Failed')
      setTimeout(() => setCopyStatus('Copy'), 1000)
    }
  }

  return (
    <div style={{ display: 'grid', gap: 16, padding: 16, background: '#f8fafc' }}>
      <section style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 16 }}>
        <h2 style={{ margin: '0 0 4px', fontSize: 22 }}>{title}</h2>
        <div style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>{menuKey}</div>
        <p style={{ margin: 0, color: '#334155', fontSize: 14 }}>
          {description ?? 'Layer-based visualization synced by Menu.md Figma paths and menu-specific properties.'}
        </p>
      </section>

      <section style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Layer Visual And Property Mapping</div>
        {layers.length === 0 && <div style={{ fontSize: 12, color: '#64748b' }}>No Figma path/layers for this menu.</div>}

        <div style={{ display: 'grid', gap: 14 }}>
          {layers.map((layer) => {
            const jsonScript = toLayerJson(menuKey, title, layer)
            const cssScript = toLayerCss(menuKey, layer)
            return (
              <article key={layer.id} style={{ border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
                <div
                  style={{
                    padding: '10px 12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 10,
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    background: '#f8fafc',
                    borderBottom: '1px solid #e2e8f0',
                  }}
                >
                  <strong style={{ fontSize: 13 }}>{layer.label}</strong>
                  <div style={{ fontSize: 11, color: '#64748b' }}>node-id: {layer.nodeId}</div>
                  <a href={layer.url} target="_blank" rel="noreferrer" style={{ fontSize: 12 }}>
                    Open Figma
                  </a>
                </div>

                <div style={{ padding: 12, display: 'grid', gap: 12 }}>
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: 10, background: '#f8fafc' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Visualized Element</div>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                      <button type="button" style={previewStyleFromLayer(layer)}>
                        {layer.label}
                      </button>
                      <span style={{ fontSize: 12, color: '#475569' }}>Menu-specific preview from this layer properties</span>
                    </div>
                  </div>

                  <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: 10 }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                      <thead>
                        <tr>
                          <th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #e2e8f0' }}>Property</th>
                          <th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #e2e8f0' }}>Variable</th>
                          <th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #e2e8f0' }}>Token</th>
                          <th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #e2e8f0' }}>Value</th>
                          <th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #e2e8f0' }}>Visual</th>
                        </tr>
                      </thead>
                      <tbody>
                        {layer.properties.map((item) => (
                          <tr key={`${layer.id}-${item.property}`}>
                            <td style={{ padding: 10, borderBottom: '1px solid #f1f5f9' }}>{item.property}</td>
                            <td style={{ padding: 10, borderBottom: '1px solid #f1f5f9', color: '#475569' }}>{item.variable}</td>
                            <td style={{ padding: 10, borderBottom: '1px solid #f1f5f9', color: '#475569' }}>{item.token}</td>
                            <td style={{ padding: 10, borderBottom: '1px solid #f1f5f9', color: '#0f172a' }}>{item.value}</td>
                            <td style={{ padding: 10, borderBottom: '1px solid #f1f5f9' }}>{visualizeProperty(item)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div style={{ display: 'grid', gap: 8 }}>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(jsonScript, `JSON copied (${layer.label})`)}
                        style={{ border: '1px solid #cbd5e1', borderRadius: 8, padding: '5px 10px', background: '#fff', fontSize: 12, cursor: 'pointer' }}
                      >
                        JSON Convert
                      </button>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(cssScript, `CSS copied (${layer.label})`)}
                        style={{ border: '1px solid #cbd5e1', borderRadius: 8, padding: '5px 10px', background: '#fff', fontSize: 12, cursor: 'pointer' }}
                      >
                        CSS Convert
                      </button>
                      <span style={{ fontSize: 12, color: '#475569', alignSelf: 'center' }}>{copyStatus}</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      <textarea
                        readOnly
                        value={jsonScript}
                        style={{
                          width: '100%',
                          minHeight: 150,
                          fontSize: 11,
                          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
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
                          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
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
