import type { Meta, StoryObj } from '@storybook/react'
import MenuPlayground from './MenuPlayground'
import { createDesignParameters } from './createDesignParameters'

const baseArgs = {
  label: 'Preview',
  paddingX: 16,
  paddingY: 10,
  radius: 8,
  fontSize: 14,
  fontWeight: 500,
  backgroundColor: 'var(--color-primary-500)',
  textColor: 'var(--color-neutral-0)',
}

const meta: Meta<typeof MenuPlayground> = {
  title: '2. Components',
  component: MenuPlayground,
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Components 메뉴별 Figma path/layers를 Design 탭에 연결하고, Controls 변경값을 JSON으로 복사할 수 있습니다.',
      },
    },
  },
  argTypes: {
    paddingX: { control: { type: 'number', min: 0, max: 48, step: 1 } },
    paddingY: { control: { type: 'number', min: 0, max: 32, step: 1 } },
    radius: { control: { type: 'number', min: 0, max: 32, step: 1 } },
    fontSize: { control: { type: 'number', min: 10, max: 32, step: 1 } },
    fontWeight: { control: { type: 'number', min: 100, max: 900, step: 100 } },
    backgroundColor: { control: 'text' },
    textColor: { control: 'text' },
  },
}

export default meta

type Story = StoryObj<typeof MenuPlayground>

export const Buttons: Story = {
  name: '2.1 Buttons',
  args: {
    ...baseArgs,
    menuKey: '2.1 Buttons',
    title: 'Buttons',
    description: 'Primary, secondary, and utility button patterns.',
  },
  parameters: { ...createDesignParameters('2.1 Buttons') },
}

export const Input: Story = {
  name: '2.2 Input',
  args: {
    ...baseArgs,
    menuKey: '2.2 Input',
    title: 'Input',
    description: 'Text fields, states, and validation patterns.',
  },
  parameters: { ...createDesignParameters('2.2 Input') },
}

export const Modal: Story = {
  name: '2.3 Modal',
  args: {
    ...baseArgs,
    menuKey: '2.3 Modal',
    title: 'Modal',
    description: 'Dialog layout and interaction patterns.',
  },
  parameters: { ...createDesignParameters('2.3 Modal') },
}

export const Checkbox: Story = {
  name: '2.4 Checkbox',
  args: {
    ...baseArgs,
    menuKey: '2.4 Checkbox',
    title: 'Checkbox',
    description: 'Checkbox states and grouping patterns.',
  },
  parameters: { ...createDesignParameters('2.4 Checkbox') },
}

export const RadioGroup: Story = {
  name: '2.5 RadioGroup',
  args: {
    ...baseArgs,
    menuKey: '2.5 RadioGroup',
    title: 'RadioGroup',
    description: 'Radio option layout and selection states.',
  },
  parameters: { ...createDesignParameters('2.5 RadioGroup') },
}

export const Pagination: Story = {
  name: '2.6 Pagination',
  args: {
    ...baseArgs,
    menuKey: '2.6 Pagination',
    title: 'Pagination',
    description: 'Pagination variants and interaction patterns.',
  },
  parameters: { ...createDesignParameters('2.6 Pagination') },
}

export const Navigation: Story = {
  name: '2.7 Navigation',
  args: {
    ...baseArgs,
    menuKey: '2.7 Navigation',
    title: 'Navigation',
    description: 'Menus, breadcrumb, and navigation hierarchy.',
  },
  parameters: { ...createDesignParameters('2.7 Navigation') },
}

export const Tab: Story = {
  name: '2.8 Tab',
  args: {
    ...baseArgs,
    menuKey: '2.8 Tab',
    title: 'Tab',
    description: 'Tabs and segmented navigation states.',
  },
  parameters: { ...createDesignParameters('2.8 Tab') },
}

export const Tooltip: Story = {
  name: '2.9 Tooltip',
  args: {
    ...baseArgs,
    menuKey: '2.9 Tooltip',
    title: 'Tooltip',
    description: 'Tooltip trigger and placement variants.',
  },
  parameters: { ...createDesignParameters('2.9 Tooltip') },
}

export const BadgeAndTag: Story = {
  name: '2.10 Badge & Tag',
  args: {
    ...baseArgs,
    menuKey: '2.10 Badge & Tag',
    title: 'Badge & Tag',
    description: 'Badge/tag colors, shapes, and states.',
  },
  parameters: { ...createDesignParameters('2.10 Badge & Tag') },
}

export const Card: Story = {
  name: '2.11 Card',
  args: {
    ...baseArgs,
    menuKey: '2.11 Card',
    title: 'Card',
    description: 'Card layout and content composition patterns.',
  },
  parameters: { ...createDesignParameters('2.11 Card') },
}
