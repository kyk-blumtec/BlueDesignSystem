import { useMemo, useState } from 'react'
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

const MenuPlayground = ({ menuKey, title, description, ...args }: MenuPlaygroundProps) => {
  const entry = getMenuFigmaEntry(menuKey)
  const [activeLayerId, setActiveLayerId] = useState<string>('')
  const [scriptTab, setScriptTab] = useState<'json' | 'css'>('json')
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

  const activeLayer = useMemo(() => {
    if (layers.length === 0) return null
    const found = layers.find((layer) => layer.id === activeLayerId)
    return found ?? layers[0]
  }, [layers, activeLayerId])

  const script = useMemo(() => {
    if (!activeLayer) return 'No layer selected'
    return scriptTab === 'json'
      ? toLayerJson(menuKey, title, activeLayer)
      : toLayerCss(menuKey, activeLayer)
  }, [activeLayer, menuKey, title, scriptTab])

  const copyScript = async () => {
    try {
      await navigator.clipboard.writeText(script)
      setCopyLabel('Copied')
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
          {description ?? 'Layer based properties with variable/token and JSON/CSS conversion'}
        </p>
      </section>

      <section style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>
          1) Figma Layer Properties
        </div>
        {layers.length === 0 && (
          <div style={{ fontSize: 12, color: '#64748b' }}>No Figma path/layers for this menu.</div>
        )}
        {layers.length > 0 && (
          <div style={{ display: 'grid', gap: 10 }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {layers.map((layer) => (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => setActiveLayerId(layer.id)}
                  style={{
                    border: '1px solid #cbd5e1',
                    borderRadius: 999,
                    padding: '4px 10px',
                    background: activeLayer?.id === layer.id ? '#e2e8f0' : '#fff',
                    fontSize: 12,
                    cursor: 'pointer',
                  }}
                >
                  {layer.label}
                </button>
              ))}
            </div>

            {activeLayer && (
              <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, overflow: 'hidden' }}>
                <div
                  style={{
                    padding: '8px 10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: '#f8fafc',
                    borderBottom: '1px solid #e2e8f0',
                  }}
                >
                  <strong style={{ fontSize: 13 }}>{activeLayer.label}</strong>
                  <a href={activeLayer.url} target="_blank" rel="noreferrer" style={{ fontSize: 12 }}>
                    Open Figma
                  </a>
                </div>
                <div style={{ overflowX: 'auto' }}>
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
                      {activeLayer.properties.map((item) => (
                        <tr key={`${activeLayer.id}-${item.property}`}>
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
              </div>
            )}
          </div>
        )}
      </section>

      <section style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 700 }}>
            2) JSON / CSS Conversion ({activeLayer?.label ?? 'No Layer'})
          </div>
          <button
            type="button"
            onClick={copyScript}
            style={{
              border: '1px solid #cbd5e1',
              borderRadius: 8,
              padding: '6px 10px',
              background: '#fff',
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            {copyLabel}
          </button>
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <button
            type="button"
            onClick={() => setScriptTab('json')}
            style={{
              border: '1px solid #cbd5e1',
              borderRadius: 8,
              padding: '4px 10px',
              background: scriptTab === 'json' ? '#e2e8f0' : '#fff',
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            JSON
          </button>
          <button
            type="button"
            onClick={() => setScriptTab('css')}
            style={{
              border: '1px solid #cbd5e1',
              borderRadius: 8,
              padding: '4px 10px',
              background: scriptTab === 'css' ? '#e2e8f0' : '#fff',
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            CSS
          </button>
        </div>
        <textarea
          readOnly
          value={script}
          style={{
            width: '100%',
            minHeight: 240,
            fontSize: 12,
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            border: '1px solid #e2e8f0',
            borderRadius: 10,
            padding: 10,
            background: '#f8fafc',
          }}
        />
      </section>

      <section style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>3) Figma Layer Preview</div>
        <div style={{ display: 'grid', gap: 12 }}>
          {layers.length === 0 && (
            <div style={{ fontSize: 12, color: '#64748b' }}>No preview links available.</div>
          )}
          {layers.map((layer) => (
            <div
              key={`preview-${layer.id}`}
              style={{ border: '1px solid #e2e8f0', borderRadius: 10, overflow: 'hidden' }}
            >
              <div
                style={{
                  padding: '8px 10px',
                  fontSize: 12,
                  fontWeight: 700,
                  borderBottom: '1px solid #e2e8f0',
                  background: '#f8fafc',
                }}
              >
                {layer.label}
              </div>
              <div style={{ position: 'relative', width: '100%', paddingTop: '50%' }}>
                <iframe
                  title={`${menuKey}-${layer.label}`}
                  src={`https://www.figma.com/embed?embed_host=storybook&url=${encodeURIComponent(layer.url)}`}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
                  allowFullScreen
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default MenuPlayground
