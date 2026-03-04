import { useMemo, useState } from 'react'
import { getMenuFigmaEntry } from '../config/menuFigmaMap'
import { getDesignSpecs } from './getDesignSpecs'
import type { MenuPlaygroundArgs } from './getDesignSpecs'

type MenuPlaygroundProps = MenuPlaygroundArgs & {
  menuKey: string
  title: string
  description?: string
}

type LayerProperty = {
  name: string
  value: string
  token?: string
}

type LayerProperties = {
  label: string
  url: string
  properties: LayerProperty[]
}

const toKebab = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const getLayerName = (menuKey: string, index: number) => {
  if (menuKey === '2.1 Buttons') {
    const names = ['Path', 'Primary', 'Hover', 'Active', 'Disabled']
    return names[index] ?? `Layer ${index}`
  }
  return index === 0 ? 'Path' : `Layer ${index}`
}

const buildLayerProperties = (
  menuKey: string,
  index: number,
  args: MenuPlaygroundArgs
): LayerProperty[] => {
  const base: LayerProperty[] = [
    { name: 'Background', value: args.backgroundColor, token: '--color-primary-500' },
    { name: 'Text', value: args.textColor, token: '--color-neutral-0' },
    { name: 'Radius', value: `${args.radius}px`, token: '--radius-md' },
    { name: 'Font Size', value: `${args.fontSize}px`, token: '--font-size-sm' },
    { name: 'Font Weight', value: `${args.fontWeight}`, token: '--font-weight-medium' },
    { name: 'Padding', value: `${args.paddingY}px ${args.paddingX}px` },
  ]

  if (menuKey === '2.1 Buttons') {
    if (index === 2) {
      base[0] = { name: 'Background', value: 'var(--color-primary-700)', token: '--color-primary-700' }
    }
    if (index === 3) {
      base[0] = { name: 'Background', value: 'var(--color-primary-700)', token: '--color-primary-700' }
      base.push({ name: 'Pressed Offset', value: 'translateY(1px)' })
      base.push({ name: 'Opacity', value: '0.92' })
    }
    if (index === 4) {
      base[0] = { name: 'Background', value: 'var(--color-neutral-200)', token: '--color-neutral-200' }
      base[1] = { name: 'Text', value: 'var(--color-neutral-700)', token: '--color-neutral-700' }
      base.push({ name: 'Cursor', value: 'not-allowed' })
    }
  }

  return base
}

const MenuPlayground = ({ menuKey, title, description, ...args }: MenuPlaygroundProps) => {
  const entry = getMenuFigmaEntry(menuKey)
  const [copyLabel, setCopyLabel] = useState('Copy')
  const [scriptTab, setScriptTab] = useState<'json' | 'css'>('json')
  const specs = useMemo(() => getDesignSpecs(menuKey, title, { ...args }), [menuKey, title, args])
  const layerProperties = useMemo<LayerProperties[]>(() => {
    if (!entry?.path) return []
    const urls = [entry.path, ...entry.layers]
    return urls.map((url, index) => ({
      label: getLayerName(menuKey, index),
      url,
      properties: buildLayerProperties(menuKey, index, args),
    }))
  }, [entry, menuKey, args])

  const jsonScript = useMemo(
    () =>
      JSON.stringify(
        {
          menuKey,
          title,
          designSpecs: specs,
          layers: layerProperties.map((layer) => ({
            layer: layer.label,
            url: layer.url,
            properties: layer.properties,
          })),
        },
        null,
        2
      ),
    [menuKey, title, specs, layerProperties]
  )

  const cssScript = useMemo(() => {
    const className = `.${toKebab(menuKey)}-preview`
    return [
      `${className} {`,
      `  background: ${args.backgroundColor};`,
      `  color: ${args.textColor};`,
      `  border-radius: ${args.radius}px;`,
      `  font-size: ${args.fontSize}px;`,
      `  font-weight: ${args.fontWeight};`,
      `  padding: ${args.paddingY}px ${args.paddingX}px;`,
      `  font-family: var(--font-family-base);`,
      `  line-height: var(--line-height-normal);`,
      '}',
    ].join('\n')
  }, [menuKey, args])

  const scriptPreview = scriptTab === 'json' ? jsonScript : cssScript

  const copyScript = async () => {
    try {
      await navigator.clipboard.writeText(scriptPreview)
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
        <h2 style={{ margin: '0 0 6px', fontSize: 22 }}>{title}</h2>
        <div style={{ fontSize: 12, color: '#64748b', marginBottom: 10 }}>{menuKey}</div>
        <p style={{ margin: 0, color: '#334155', fontSize: 14 }}>
          {description ?? 'Menu based design properties and publisher scripts'}
        </p>
      </section>

      <section style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>1) Layer Properties</div>
        <div style={{ display: 'grid', gap: 10 }}>
          {layerProperties.length === 0 && (
            <div style={{ fontSize: 12, color: '#64748b' }}>No Figma path/layers for this menu.</div>
          )}
          {layerProperties.map((layer) => (
            <div
              key={layer.label}
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: 10,
                padding: 12,
                display: 'grid',
                gap: 8,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
                <strong style={{ fontSize: 13 }}>{layer.label}</strong>
                <a href={layer.url} target="_blank" rel="noreferrer" style={{ fontSize: 12 }}>
                  Open Figma
                </a>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 8 }}>
                {layer.properties.map((prop) => (
                  <div
                    key={`${layer.label}-${prop.name}`}
                    style={{ background: '#f8fafc', borderRadius: 8, padding: 8, border: '1px solid #e2e8f0' }}
                  >
                    <div style={{ fontSize: 11, color: '#64748b' }}>{prop.name}</div>
                    <div style={{ fontSize: 12, color: '#0f172a', fontWeight: 600 }}>{prop.value}</div>
                    {prop.token && <div style={{ fontSize: 11, color: '#475569' }}>{prop.token}</div>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 700 }}>2) Publisher Script Preview</div>
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
          value={scriptPreview}
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
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>3) Figma Page Preview</div>
        <div style={{ display: 'grid', gap: 12 }}>
          {layerProperties.length === 0 && (
            <div style={{ fontSize: 12, color: '#64748b' }}>No preview links available.</div>
          )}
          {layerProperties.map((layer) => (
            <div key={`preview-${layer.label}`} style={{ border: '1px solid #e2e8f0', borderRadius: 10, overflow: 'hidden' }}>
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
