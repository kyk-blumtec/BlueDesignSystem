import type { ReactNode } from 'react'
import type { LayerProperty } from './DesignSpecPage'
import '../storybook-theme.css'

export type VisualTileProps = {
    /** Identifier/Name for this tile (e.g., 'Primary 500', 'Hover State') */
    label: string
    /** Component to render visually representing the properties */
    preview: ReactNode
    /** List of properties associated with this specific tile */
    properties: LayerProperty[]
}

const VisualTile = ({ label, preview, properties }: VisualTileProps) => {
    return (
        <div className="ds-tile">
            {/* Top: Visual Preview Area */}
            <div className="ds-tile__preview">
                {preview}
            </div>

            {/* Bottom: Information Area */}
            <div className="ds-tile__info">
                <h4 className="ds-tile__label">{label}</h4>

                <div className="ds-tile__props">
                    {properties.map((p, i) => (
                        <div key={i} className="ds-tile-prop">
                            <span className="ds-tile-prop__key">{p.property}</span>
                            <div className="ds-tile-prop__values">
                                {p.variable !== 'n/a' && (
                                    <span className="ds-tile-prop__mono ds-text-primary">{p.variable}</span>
                                )}
                                <span className="ds-tile-prop__mono">{p.token !== 'n/a' ? p.token : p.cssProperty}</span>
                                <span className="ds-tile-prop__value">{p.value}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default VisualTile
