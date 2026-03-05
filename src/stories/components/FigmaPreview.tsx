type FigmaPreviewProps = {
    label: string
    url: string
    nodeId?: string
}

const getNodeId = (url: string) => {
    const match = url.match(/node-id=([^&]+)/)
    return match ? decodeURIComponent(match[1]) : undefined
}

const FigmaPreview = ({ label, url, nodeId }: FigmaPreviewProps) => {
    const resolvedNodeId = nodeId ?? getNodeId(url) ?? 'n/a'

    return (
        <div className="ds-figma-card">
            <div className="ds-figma-card__header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span className="ds-figma-card__label">{label}</span>
                    <span className="ds-figma-card__node">{resolvedNodeId}</span>
                </div>
                <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="ds-figma-card__link"
                >
                    Open in Figma ↗
                </a>
            </div>
            <div className="ds-figma-card__embed">
                <iframe
                    title={`Figma – ${label}`}
                    src={`https://www.figma.com/embed?embed_host=storybook&url=${encodeURIComponent(url)}`}
                    className="ds-figma-card__iframe"
                    allowFullScreen
                />
            </div>
        </div>
    )
}

export default FigmaPreview
