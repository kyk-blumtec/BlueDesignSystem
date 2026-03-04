import type { Meta, StoryObj } from '@storybook/react'
import { createDesignParameters } from '../../stories/createDesignParameters'

type PlaceholderProps = {
  label: string
}

const Placeholder = ({ label }: PlaceholderProps) => (
  <div style={{ padding: 16, border: '1px solid #e2e8f0', borderRadius: 8 }}>
    {label}
  </div>
)

const MENU_KEY = '2.4 Checkbox'

const meta: Meta<typeof Placeholder> = {
  title: '2. Components/2.4 Checkbox',
  component: Placeholder,
  parameters: {
    ...createDesignParameters(MENU_KEY),
  },
}

export default meta

type Story = StoryObj<typeof Placeholder>

export const Default: Story = {
  args: {
    label: 'Replace Placeholder with real component',
  },
}
