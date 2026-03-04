import { useMemo, useState } from 'react'
import { getDesignSpecs } from './getDesignSpecs'
import type { MenuPlaygroundArgs } from './getDesignSpecs'

type MenuPlaygroundProps = MenuPlaygroundArgs & {
  menuKey: string
  title: string
  description?: string
}

const MenuPlayground = ({
  menuKey,
  title,
  description,
  ...args
}: MenuPlaygroundProps) => {
  const [copyLabel, setCopyLabel] = useState('Copy JSON')
  const specs = useMemo(
    () =>
      getDesignSpecs(menuKey, title, {
        ...args,
      }),
    [menuKey, title, args]
  )
  const specsJson = useMemo(() => JSON.stringify(specs, null, 2), [specs])

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
    <div style={{ display: 'grid', gap: 16, padding: 8 }}>
      <div>
        <h3 style={{ margin: '0 0 6px' }}>{title}</h3>
        <p style={{ margin: 0, color: 'var(--color-neutral-700)' }}>
          {description ?? 'Menu.md 기반 Storybook playground'}
        </p>
      </div>
      <div
        style={{
          border: '1px solid var(--color-neutral-200)',
          borderRadius: 12,
          padding: 16,
          background: 'var(--color-neutral-50)',
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
          }}
        >
          {args.label}
        </button>
      </div>
      <div
        style={{
          border: '1px solid var(--color-neutral-200)',
          borderRadius: 12,
          padding: 12,
          background: 'var(--color-neutral-0)',
          display: 'grid',
          gap: 8,
          maxWidth: 760,
        }}
      >
        <strong style={{ fontSize: 13 }}>Design Specs JSON</strong>
        <textarea
          readOnly
          value={specsJson}
          style={{
            width: '100%',
            minHeight: 220,
            fontSize: 12,
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            border: '1px solid var(--color-neutral-200)',
            borderRadius: 8,
            padding: 8,
          }}
        />
        <div>
          <button
            type="button"
            onClick={copyJson}
            style={{
              border: '1px solid var(--color-neutral-200)',
              borderRadius: 8,
              padding: '6px 10px',
              background: 'var(--color-neutral-0)',
              cursor: 'pointer',
            }}
          >
            {copyLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export default MenuPlayground
