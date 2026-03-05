import { useState } from 'react'
import type { DesignSpecLayer } from './DesignSpecPage'

type ExportFormat = 'json' | 'css' | 'scss' | 'ts'

type ExportPanelProps = {
    /** Identifier used for CSS class names (kebab-case) */
    componentName: string
    /** Layer-level property sets for grouped export */
    layers: DesignSpecLayer[]
}

const generateJson = (layers: ExportPanelProps['layers']) =>
    JSON.stringify(
        layers.map((l) => ({
            layer: l.label,
            properties: l.tiles.flatMap((t) => t.properties).map((p) => ({
                property: p.property,
                cssProperty: p.cssProperty,
                value: p.value,
                variable: p.variable,
                token: p.token,
            })),
        })),
        null,
        2
    )

const generateCss = (name: string, layers: ExportPanelProps['layers']) =>
    layers
        .map((l) => {
            const cls = `.${name}--${l.label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`
            const props = l.tiles.flatMap((t) => t.properties)
            return [cls + ' {', ...props.map((p) => `  ${p.cssProperty}: ${p.value};`), '}'].join('\n')
        })
        .join('\n\n')

const generateScss = (name: string, layers: ExportPanelProps['layers']) => {
    const vars = new Map<string, string>()
    layers.forEach((l) =>
        l.tiles.forEach((t) =>
            t.properties.forEach((p) => {
                if (p.variable && p.variable !== 'n/a') vars.set(p.variable, p.value)
            })
        )
    )
    const varBlock = Array.from(vars.entries())
        .map(([k, v]) => `$${k.replace(/^--/, '')}: ${v};`)
        .join('\n')

    const mixins = layers
        .map((l) => {
            const mixinName = `${name}-${l.label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`
            const props = l.tiles.flatMap((t) => t.properties)
            return [
                `@mixin ${mixinName} {`,
                ...props.map((p) => {
                    const ref = p.variable && p.variable !== 'n/a' ? `$${p.variable.replace(/^--/, '')}` : p.value
                    return `  ${p.cssProperty}: ${ref};`
                }),
                '}',
            ].join('\n')
        })
        .join('\n\n')

    return varBlock ? `// Variables\n${varBlock}\n\n// Mixins\n${mixins}` : mixins
}

const generateTs = (name: string, layers: ExportPanelProps['layers']) => {
    const entries = layers.map((l) => {
        const key = l.label.replace(/[^a-zA-Z0-9]/g, '')
        const props = l.tiles.flatMap(t => t.properties).map(
            (p) =>
                `    ${p.property.replace(/\s+/g, '')}: { css: '${p.cssProperty}', value: '${p.value}', variable: '${p.variable}', token: '${p.token}' },`
        )
        return `  ${key}: {\n${props.join('\n')}\n  },`
    })
    return `export const ${name.replace(/-/g, '_')} = {\n${entries.join('\n')}\n} as const`
}

const ExportPanel = ({ componentName, layers }: ExportPanelProps) => {
    const [tab, setTab] = useState<ExportFormat>('json')
    const [copyLabel, setCopyLabel] = useState('📋 Copy')

    const getCode = () => {
        switch (tab) {
            case 'json':
                return generateJson(layers)
            case 'css':
                return generateCss(componentName, layers)
            case 'scss':
                return generateScss(componentName, layers)
            case 'ts':
                return generateTs(componentName, layers)
        }
    }

    const code = getCode()

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(code)
            setCopyLabel('✅ Copied!')
            setTimeout(() => setCopyLabel('📋 Copy'), 1200)
        } catch {
            setCopyLabel('❌ Failed')
            setTimeout(() => setCopyLabel('📋 Copy'), 1200)
        }
    }

    const download = () => {
        const ext = tab === 'json' ? '.json' : tab === 'css' ? '.css' : tab === 'scss' ? '.scss' : '.ts'
        const blob = new Blob([code], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${componentName}${ext}`
        a.click()
        URL.revokeObjectURL(url)
    }

    const tabs: { key: ExportFormat; label: string }[] = [
        { key: 'json', label: 'JSON' },
        { key: 'css', label: 'CSS' },
        { key: 'scss', label: 'SCSS' },
        { key: 'ts', label: 'TypeScript' },
    ]

    return (
        <div className="ds-export">
            <div className="ds-export__tabs">
                {tabs.map((t) => (
                    <button
                        key={t.key}
                        type="button"
                        className={`ds-export__tab${tab === t.key ? ' ds-export__tab--active' : ''}`}
                        onClick={() => setTab(t.key)}
                    >
                        {t.label}
                    </button>
                ))}
            </div>
            <div className="ds-export__body">
                <div className="ds-export__actions">
                    <button
                        type="button"
                        className={`ds-export__btn${copyLabel.includes('Copied') ? ' ds-export__btn--success' : ''}`}
                        onClick={copy}
                    >
                        {copyLabel}
                    </button>
                    <button type="button" className="ds-export__btn" onClick={download}>
                        ⬇ Download
                    </button>
                </div>
                <textarea
                    readOnly
                    value={code}
                    className="ds-export__code"
                />
            </div>
        </div>
    )
}

export default ExportPanel
