import type { CSSProperties, ReactNode } from 'react'
import VisualTile from './VisualTile'
import type { LayerProperty } from './DesignSpecPage'

export type TileData = {
    label: string
    properties: LayerProperty[]
    /** Custom preview element. If not provided, it attempts to Auto-generate based on properties */
    customPreview?: ReactNode
}

type VisualGridProps = {
    tiles: TileData[]
    searchQuery?: string
}

/** Helper to generate a generic preview style based on properties */
const generatePreviewStyle = (props: LayerProperty[]): CSSProperties => {
    const style: CSSProperties = {}
    props.forEach((p) => {
        // Basic camelCase conversion for CSS properties
        const camel = p.cssProperty.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())
            ; (style as Record<string, string>)[camel] = p.value
    })
    return style
}

/** Fallback auto-preview renderer */
const AutoPreview = ({ tile }: { tile: TileData }) => {
    // Try to determine the 'type' of element based on properties
    const cssProps = tile.properties.map(p => p.cssProperty)

    // If it's just a color/background
    if (cssProps.length === 1 && (cssProps.includes('background') || cssProps.includes('color'))) {
        const colorProp = tile.properties[0]
        return <div style={{ background: colorProp.value, width: '100%', height: '100px', borderRadius: 8 }} />
    }

    // If it looks like a button
    if (cssProps.includes('padding') && cssProps.includes('background')) {
        return (
            <button type="button" style={{ ...generatePreviewStyle(tile.properties), outline: 'none', border: 'none', cursor: 'pointer' }}>
                {tile.label}
            </button>
        )
    }

    // Generic fallback: a box applying the styles
    return (
        <div style={{
            ...generatePreviewStyle(tile.properties),
            minWidth: 40,
            minHeight: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {/* Only show label if it's text-related or empty box */}
            {!cssProps.includes('width') && !cssProps.includes('height') ? 'Aa' : ''}
        </div>
    )
}


const VisualGrid = ({ tiles, searchQuery }: VisualGridProps) => {
    const filtered = searchQuery
        ? tiles.filter((t) =>
            t.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.properties.some(p =>
                [p.property, p.cssProperty, p.value, p.variable, p.token]
                    .join(' ')
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
            )
        )
        : tiles

    if (filtered.length === 0) {
        return (
            <div style={{ fontSize: 13, color: 'var(--ds-text-muted)', padding: 12 }}>
                No matching tiles found.
            </div>
        )
    }

    return (
        <div className="ds-visual-grid">
            {filtered.map((tile, i) => (
                <VisualTile
                    key={`${tile.label}-${i}`}
                    label={tile.label}
                    properties={tile.properties}
                    preview={tile.customPreview || <AutoPreview tile={tile} />}
                />
            ))}
        </div>
    )
}

export default VisualGrid
