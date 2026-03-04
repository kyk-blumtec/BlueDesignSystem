import { useMemo, useState } from 'react'
import { getMenuFigmaEntry } from '../config/menuFigmaMap'
import { getDesignSpecs } from './getDesignSpecs'
import type { MenuPlaygroundArgs } from './getDesignSpecs'

type MenuPlaygroundProps = MenuPlaygroundArgs & {
  menuKey: string
  title: string
  description?: string
}

const sectionLabel = (menuKey: string) => {
  if (menuKey.startsWith('1.')) return 'Foundation'
  if (menuKey.startsWith('2.')) return 'Components'
  return 'Docs'
}

const MenuPlayground = ({
  menuKey,
  title,
  description,
  ...args
}: MenuPlaygroundProps) => {
  const [copyLabel, setCopyLabel] = useState('Copy JSON')
  const entry = getMenuFigmaEntry(menuKey)
  const specs = useMemo(() => getDesignSpecs(menuKey, title, { ...args }), [menuKey, title, args])
  const specsJson = useMemo(() => JSON.stringify(specs, null, 2), [specs])
  const figmaLinks = useMemo(() => {
    if (!entry?.path) return []
    return [
      { label: 'Path', url: entry.path },
      ...entry.layers.map((url, index) => ({ label: `Layer ${index + 1}`, url })),
    ]
  }, [entry])

  const copyJson = async () => {
    try {
      await navigator.clipboard.writeText(specsJson)
      setCopyLabel('Copied')
      setTimeout(() => setCopyLabel('Copy JSON'), 1200)
    } catch {
      setCopyLabel('Copy failed')
      setTimeout(() => setCopyLabel('Copy JSON'), 1200)
    }
  }

  return (
    <div
      style={{
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 48%)',
        minHeight: '100%',
        padding: 16,
      }}
    >
      <div
        style={{
          border: '1px solid #e2e8f0',
          borderRadius: 16,
          background: '#ffffff',
          padding: 20,
          marginBottom: 14,
        }}
      >
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
          <span
            style={{
              fontSize: 11,
              color: '#0f172a',
              border: '1px solid #cbd5e1',
              borderRadius: 999,
              padding: '2px 8px',
              background: '#f8fafc',
            }}
          >
            {sectionLabel(menuKey)}
          </span>
          <span
            style={{
              fontSize: 11,
              color: '#0f172a',
              border: '1px solid #cbd5e1',
              borderRadius: 999,
              padding: '2px 8px',
              background: '#f8fafc',
            }}
          >
            {menuKey}
          </span>
        </div>
        <h2 style={{ margin: '0 0 8px', fontSize: 24, letterSpacing: '-0.01em' }}>{title}</h2>
        <p style={{ margin: 0, color: '#334155', fontSize: 14 }}>
          {description ?? 'Interactive documentation view based on Menu.md and Figma mapping.'}
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(220px, 300px) minmax(0, 1fr)',
          gap: 14,
        }}
      >
        <aside
          style={{
            border: '1px solid #e2e8f0',
            borderRadius: 14,
            background: '#ffffff',
            padding: 14,
            alignSelf: 'start',
            display: 'grid',
            gap: 14,
          }}
        >
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>
              Figma Sources
            </div>
            <div style={{ display: 'grid', gap: 6 }}>
              {figmaLinks.length === 0 && (
                <div style={{ fontSize: 12, color: '#64748b' }}>No linked source in Menu.md</div>
              )}
              {figmaLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontSize: 12,
                    color: '#0f172a',
                    textDecoration: 'none',
                    border: '1px solid #e2e8f0',
                    borderRadius: 8,
                    padding: '6px 8px',
                    background: '#f8fafc',
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>
              Token Snapshot
            </div>
            <div style={{ display: 'grid', gap: 6, fontSize: 12, color: '#334155' }}>
              <div>BG: {args.backgroundColor}</div>
              <div>Text: {args.textColor}</div>
              <div>Radius: {args.radius}px</div>
              <div>Font: {args.fontSize}px / {args.fontWeight}</div>
              <div>Padding: {args.paddingY}px {args.paddingX}px</div>
            </div>
          </div>
        </aside>

        <main style={{ display: 'grid', gap: 14 }}>
          <section
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: 14,
              background: '#ffffff',
              padding: 16,
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10 }}>Live Preview</div>
            <div
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: 12,
                padding: 18,
                background: '#f8fafc',
              }}
            >
              <button
                type="button"
                style={{
                  border: 'none',
                  borderRadius: `${args.radius}px`,
                  background: args.backgroundColor,
                  color: args.textColor,
                  padding: `${args.paddingY}px ${args.paddingX}px`,
                  fontFamily: 'var(--font-family-base)',
                  fontSize: `${args.fontSize}px`,
                  fontWeight: args.fontWeight,
                  lineHeight: 'var(--line-height-normal)',
                  cursor: 'pointer',
                }}
              >
                {args.label}
              </button>
            </div>
          </section>

          <section
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: 14,
              background: '#ffffff',
              padding: 16,
              display: 'grid',
              gap: 8,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: 13 }}>Design Specs JSON</strong>
              <button
                type="button"
                onClick={copyJson}
                style={{
                  border: '1px solid #cbd5e1',
                  borderRadius: 8,
                  padding: '6px 10px',
                  background: '#ffffff',
                  cursor: 'pointer',
                  fontSize: 12,
                }}
              >
                {copyLabel}
              </button>
            </div>
            <textarea
              readOnly
              value={specsJson}
              style={{
                width: '100%',
                minHeight: 250,
                fontSize: 12,
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                border: '1px solid #e2e8f0',
                borderRadius: 10,
                padding: 10,
                background: '#f8fafc',
              }}
            />
          </section>
        </main>
      </div>
    </div>
  )
}

export default MenuPlayground
