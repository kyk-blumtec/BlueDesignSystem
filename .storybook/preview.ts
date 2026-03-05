import type { Preview } from '@storybook/react'
import '../src/tokens/foundation/variables.css'
import '../src/stories/storybook-theme.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: [
          '0. Docs',
          ['0.1 Introduction', '0.2 Guide', '0.3 Writing'],
          '1. Foundation',
          ['1.1 Colors', '1.2 Typography', '1.3 Grid', '1.4 Icon', '1.5 Radius', '1.6 Shadow'],
          '2. Components',
          ['2.1 Buttons', '2.2 Input', '2.3 Modal', '2.4 Checkbox', '2.5 RadioGroup', '2.6 Pagination', '2.7 Navigation', '2.8 Tab', '2.9 Tooltip', '2.10 Badge & Tag', '2.11 Card'],
          'Example',
        ],
      },
    },
  },
}

export default preview
