import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { getMenuFigmaEntry } from '../../config/menuFigmaMap'
import VisualGrid from './VisualGrid'
import type { TileData } from './VisualGrid'
import ExportPanel from './ExportPanel'
import FigmaPreview from './FigmaPreview'
import '../storybook-theme.css'

/* ── Types ── */

export type LayerProperty = {
    property: string
    cssProperty: string
    value: string
    variable: string
    token: string
}

export type DesignSpecLayer = {
    label: string
    /** The collection of visual tiles for this layer/section */
    tiles: TileData[]
}

export type DesignSpecPageProps = {
    /** Menu key matching menuFigmaMap, e.g. '1.1 Colors' */
    menuKey: string
    /** Display title */
    title: string
    /** Brief description */
    description?: string
    /** Section badge label, e.g. 'Foundation', 'Components' */
    section?: string
    /** Structured layer data */
    layers: DesignSpecLayer[]
    /** Optional custom content rendered between Figma preview and property table */
    children?: ReactNode
}

/* ── Helpers ── */

const toKebab = (v: string) =>
    v
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

/* ── Component ── */

const DesignSpecPage = ({
    menuKey,
    title,
    description,
    section,
    layers,
    children,
}: DesignSpecPageProps) => {
    const entry = getMenuFigmaEntry(menuKey)
    const [searchQuery, setSearchQuery] = useState('')
    const [expandedLayer, setExpandedLayer] = useState<string | null>(null)

    const figmaFrames = useMemo(() => {
        if (!entry?.path) return []
        return [
            { label: 'Overview', url: entry.path },
            ...entry.layers.map((url, i) => ({
                label: `Layer ${i + 1}`,
                url,
            })),
        ]
    }, [entry])

    const allTiles = useMemo(
        () => layers.flatMap((l) => l.tiles),
        [layers]
    )

    const allProperties = useMemo(
        () => allTiles.flatMap((t) => t.properties),
        [allTiles]
    )

    const totalTiles = allTiles.length
    const totalTokens = allProperties.length

    return (
        <div className="ds-page">
            {/* ── Hero ── */}
            <div className="ds-hero">
                {section && <div className="ds-hero__badge">🎨 {section}</div>}
                <h1 className="ds-hero__title">{title}</h1>
                <p className="ds-hero__desc">
                    {description ??
                        'Figma 디자인과 동기화된 속성 정보를 확인하고, 퍼블리셔를 위한 라이브러리 코드를 생성합니다.'}
                </p>
                <div className="ds-hero__meta">
                    <span>📐 {layers.length} Layer{layers.length > 1 ? 's' : ''}</span>
                    <span>🖼️ {totalTiles} Visual Tiles</span>
                    <span>🎯 {totalTokens} Properties</span>
                    <span>🔗 {figmaFrames.length} Figma Frame{figmaFrames.length > 1 ? 's' : ''}</span>
                </div>
            </div>

            {/* ── Figma Previews ── */}
            {figmaFrames.length > 0 && (
                <div className="ds-section">
                    <div className="ds-section__title">Figma Design Preview</div>
                    <div style={{ display: 'grid', gap: 16, gridTemplateColumns: figmaFrames.length > 1 ? 'repeat(auto-fit, minmax(400px, 1fr))' : '1fr' }}>
                        {figmaFrames.map((f) => (
                            <FigmaPreview key={f.url} label={f.label} url={f.url} />
                        ))}
                    </div>
                </div>
            )}

            {/* ── Custom content slot ── */}
            {children}

            {/* ── Visual Tile Grid Mapping ── */}
            <div className="ds-section">
                <div className="ds-section__title">Visual Design Tiles & Properties</div>

                {/* Search */}
                <div className="ds-search">
                    <input
                        className="ds-search__input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search elements, properties, variables, tokens..."
                    />
                    <span className="ds-search__count">{totalTiles} visual tiles</span>
                </div>

                {layers.map((layer) => {
                    const isExpanded = expandedLayer === null || expandedLayer === layer.label
                    return (
                        <div key={layer.label} className="ds-layer">
                            <div className="ds-layer__header">
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <span className="ds-layer__label">{layer.label}</span>
                                    <span style={{ fontSize: 11, color: 'var(--ds-text-muted)' }}>
                                        {layer.tiles.length} elements
                                    </span>
                                </div>
                                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                                    <button
                                        type="button"
                                        className="ds-export__btn"
                                        onClick={() =>
                                            setExpandedLayer(expandedLayer === layer.label ? null : layer.label)
                                        }
                                        style={{ fontSize: 11, padding: '4px 10px' }}
                                    >
                                        {isExpanded ? '▼ Collapse' : '▶ Expand'}
                                    </button>
                                </div>
                            </div>

                            {isExpanded && (
                                <div className="ds-layer__body" style={{ padding: '0 20px 20px' }}>
                                    <VisualGrid tiles={layer.tiles} searchQuery={searchQuery} />
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

            {/* ── Export Panel ── */}
            <div className="ds-section">
                <div className="ds-section__title">Source Export (Library Conversion)</div>
                <ExportPanel componentName={toKebab(menuKey)} layers={layers} />
            </div>
        </div>
    )
}

export default DesignSpecPage
