import { useState } from 'react'
import type { ReactNode } from 'react'

type TokenCardProps = {
    name: string
    variable: string
    token: string
    description?: string
    /** Visual preview renderer */
    preview?: ReactNode
}

const TokenCard = ({ name, variable, token, description, preview }: TokenCardProps) => {
    const [copied, setCopied] = useState(false)

    const handleClick = async () => {
        try {
            await navigator.clipboard.writeText(variable !== 'n/a' ? variable : token)
            setCopied(true)
            setTimeout(() => setCopied(false), 1200)
        } catch {
            /* silent */
        }
    }

    return (
        <div className="ds-token-card" onClick={handleClick} role="button" tabIndex={0}>
            {preview && <div style={{ marginBottom: 10 }}>{preview}</div>}
            <div className="ds-token-card__name">{name}</div>
            <div className="ds-token-card__detail">
                <div>Variable: {variable}</div>
                <div>Token: {token}</div>
            </div>
            {description && (
                <div style={{ fontSize: 11, color: 'var(--ds-text-secondary)', marginTop: 6 }}>
                    {description}
                </div>
            )}
            {copied && <div className="ds-copy-status" style={{ marginTop: 6 }}>✅ Copied!</div>}
        </div>
    )
}

export default TokenCard
