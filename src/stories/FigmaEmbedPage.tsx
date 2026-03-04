import { useMemo, useState } from 'react'

type InfoCard = {
  title: string
  description: string
  linkLabel?: string
  linkUrl?: string
}

type TokenInfo = {
  name: string
  variable: string
  token: string
  description?: string
}

type FigmaFrame = {
  title: string
  url: string
}

type FigmaEmbedPageProps = {
  title: string
  description?: string
  figmaUrl: string
  cards?: InfoCard[]
  tokens?: TokenInfo[]
  figmaFrames?: FigmaFrame[]
}

const defaultCards = (figmaUrl: string): InfoCard[] => [
  {
    title: 'Overview',
    description: 'Design guidance and usage details for this section.',
  },
  {
    title: 'Figma Source',
    description: 'Open the full layout and inspect component details.',
    linkLabel: 'Open in Figma',
    linkUrl: figmaUrl,
  },
]

const FigmaEmbedPage = ({
  title,
  description,
  figmaUrl,
  cards = defaultCards(figmaUrl),
  tokens = [],
  figmaFrames = [{ title: 'Main frame', url: figmaUrl }],
}: FigmaEmbedPageProps) => (
  <FigmaEmbedLayout
    title={title}
    description={description}
    cards={cards}
    tokens={tokens}
    figmaFrames={figmaFrames}
  />
)

const FigmaEmbedLayout = ({
  title,
  description,
  cards,
  tokens,
  figmaFrames,
}: {
  title: string
  description?: string
  cards: InfoCard[]
  tokens: TokenInfo[]
  figmaFrames: FigmaFrame[]
}) => {
  const [query, setQuery] = useState('')
  const [exportTab, setExportTab] = useState<'json' | 'css' | 'ts'>('json')
  const filteredTokens = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) {
      return tokens
    }
    return tokens.filter((token) =>
      [token.name, token.variable, token.token, token.description ?? '']
        .join(' ')
        .toLowerCase()
        .includes(normalized)
    )
  }, [query, tokens])

  return (
    <div style={{ padding: 16 }}>
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ margin: '0 0 4px', fontSize: 18 }}>{title}</h3>
        <p style={{ margin: 0, color: '#4b5563' }}>
          {description ?? 'Figma design guidance is embedded for quick review.'}
        </p>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 1.1fr) minmax(320px, 1fr)',
          gap: 16,
          alignItems: 'start',
        }}
      >
        <div style={{ display: 'grid', gap: 12 }}>
          {figmaFrames.map((frame) => (
            <div
              key={frame.title}
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: 12,
                overflow: 'hidden',
                background: '#f8fafc',
              }}
            >
              <div
                style={{
                  padding: 12,
                  borderBottom: '1px solid #e2e8f0',
                  background: '#ffffff',
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 12,
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 600 }}>
                  {frame.title}
                </div>
                <a
                  href={frame.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: 12, color: '#2563eb' }}
                >
                  Open in Figma
                </a>
              </div>
              <div style={{ position: 'relative', paddingTop: '64%' }}>
                <iframe
                  title={`Figma ${title} ${frame.title}`}
                  src={`https://www.figma.com/embed?embed_host=storybook&url=${encodeURIComponent(
                    frame.url
                  )}`}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    border: 0,
                  }}
                  allowFullScreen
                />
              </div>
            </div>
          ))}
        </div>
        <div>
          <div
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: 12,
              padding: 12,
              background: '#ffffff',
              marginBottom: 12,
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 700 }}>Tokens</div>
            {tokens.length > 0 ? (
              <div
                style={{
                  display: 'flex',
                  gap: 12,
                  alignItems: 'center',
                  marginTop: 8,
                }}
              >
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search name, variable, token..."
                  style={{
                    flex: 1,
                    border: '1px solid #e2e8f0',
                    borderRadius: 10,
                    padding: '8px 12px',
                    fontSize: 12,
                  }}
                />
                <div style={{ fontSize: 12, color: '#64748b' }}>
                  {filteredTokens.length} tokens
                </div>
              </div>
            ) : (
              <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 6 }}>
                준비중
              </div>
            )}
          </div>
          <div
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: 12,
              padding: 12,
              background: '#ffffff',
              marginBottom: 12,
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>
              Exports
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              {(['json', 'css', 'ts'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setExportTab(tab)}
                  style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: 8,
                    padding: '4px 8px',
                    fontSize: 12,
                    background: exportTab === tab ? '#e2e8f0' : '#ffffff',
                    cursor: 'pointer',
                  }}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>
            <textarea
              readOnly
              value={
                tokens.length === 0
                  ? '준비중'
                  : exportTab === 'json'
                  ? JSON.stringify(
                      tokens.map((token) => ({
                        name: token.name,
                        variable: token.variable,
                        token: token.token,
                      })),
                      null,
                      2
                    )
                  : exportTab === 'css'
                  ? tokens.map((token) => `${token.variable}: var(${token.variable});`).join('\n')
                  : [
                      'export const tokens = {',
                      ...tokens.map(
                        (token) =>
                          `  '${token.token}': { name: '${token.name}', variable: '${token.variable}' },`
                      ),
                      '} as const',
                    ].join('\n')
              }
              style={{
                width: '100%',
                minHeight: 140,
                fontSize: 11,
                fontFamily:
                  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                border: '1px solid #e2e8f0',
                borderRadius: 8,
                padding: 8,
                background: '#f8fafc',
              }}
            />
          </div>
          {tokens.length > 0 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 12,
              }}
            >
              {filteredTokens.map((token) => (
                <div
                  key={`${token.name}-${token.token}`}
                  style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: 12,
                    padding: 12,
                    background: '#ffffff',
                  }}
                >
                  <div style={{ fontSize: 12, fontWeight: 700 }}>
                    {token.name}
                  </div>
                  <div style={{ fontSize: 11, color: '#64748b', marginTop: 6 }}>
                    <div>Name: {token.name}</div>
                    <div>Variable: {token.variable}</div>
                    <div>Token: {token.token}</div>
                  </div>
                  {token.description && (
                    <div
                      style={{ fontSize: 11, color: '#94a3b8', marginTop: 6 }}
                    >
                      {token.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {tokens.length === 0 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 12,
              }}
            >
              {cards.map((card) => (
                <div
                  key={card.title}
                  style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: 12,
                    padding: 12,
                    background: '#ffffff',
                  }}
                >
                  <div style={{ fontSize: 12, fontWeight: 700 }}>
                    {card.title}
                  </div>
                  <div style={{ fontSize: 12, color: '#475569', marginTop: 6 }}>
                    {card.description}
                  </div>
                  {card.linkLabel && card.linkUrl && (
                    <a
                      href={card.linkUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        fontSize: 12,
                        color: '#2563eb',
                        marginTop: 8,
                        display: 'inline-block',
                      }}
                    >
                      {card.linkLabel}
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FigmaEmbedPage
