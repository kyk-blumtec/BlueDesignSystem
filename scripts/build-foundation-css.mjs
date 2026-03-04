import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(process.cwd())
const tokenFile = path.join(root, 'src', 'tokens', 'foundation', 'tokens.json')
const cssFile = path.join(root, 'src', 'tokens', 'foundation', 'variables.css')

const tokenJson = JSON.parse(fs.readFileSync(tokenFile, 'utf8'))
const foundation = tokenJson.foundation ?? {}

const entries = []
const toKebab = (value) => value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()

const visit = (node, prefix = []) => {
  if (!node || typeof node !== 'object') return

  if (Object.prototype.hasOwnProperty.call(node, 'value')) {
    entries.push({
      key: prefix.map(toKebab).join('-'),
      value: String(node.value),
    })
    return
  }

  for (const [key, value] of Object.entries(node)) {
    visit(value, [...prefix, key])
  }
}

visit(foundation.color, ['color'])
visit(foundation.typography, [])
visit(foundation.radius, ['radius'])

const lines = [':root {']
for (const entry of entries) {
  lines.push(`  --${entry.key}: ${entry.value};`)
}
lines.push('}')
lines.push('')

fs.writeFileSync(cssFile, lines.join('\n'), 'utf8')
console.log(`Generated ${path.relative(root, cssFile)} (${entries.length} variables)`)
