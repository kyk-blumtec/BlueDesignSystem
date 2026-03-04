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
  title: '1. Foundation',
  component: MenuPlayground,
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Foundation 메뉴별 Figma 링크(path/layers)와 Controls 기반 수치 조정, JSON 복사 워크플로우를 제공합니다.',
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

export const Colors: Story = {
  name: '1.1 Colors',
  args: {
    ...baseArgs,
    menuKey: '1.1 Colors',
    title: 'Colors',
    description: 'Color palettes and semantic usage.',
  },
  parameters: { ...createDesignParameters('1.1 Colors') },
}

export const Typography: Story = {
  name: '1.2 Typography',
  args: {
    ...baseArgs,
    menuKey: '1.2 Typography',
    title: 'Typography',
    description: 'Type scale, font family, and text styles.',
  },
  parameters: { ...createDesignParameters('1.2 Typography') },
}

export const Grid: Story = {
  name: '1.3 Grid',
  args: {
    ...baseArgs,
    menuKey: '1.3 Grid',
    title: 'Grid',
    description: 'Layout grid and spacing patterns.',
  },
  parameters: { ...createDesignParameters('1.3 Grid') },
}

export const Icon: Story = {
  name: '1.4 Icon',
  args: {
    ...baseArgs,
    menuKey: '1.4 Icon',
    title: 'Icon',
    description: 'Icon system and usage rule.',
  },
  parameters: { ...createDesignParameters('1.4 Icon') },
}

export const Radius: Story = {
  name: '1.5 Radius',
  args: {
    ...baseArgs,
    menuKey: '1.5 Radius',
    title: 'Radius',
    description: 'Border radius scale and usage.',
  },
  parameters: { ...createDesignParameters('1.5 Radius') },
}

export const Shadow: Story = {
  name: '1.6 Shadow',
  args: {
    ...baseArgs,
    menuKey: '1.6 Shadow',
    title: 'Shadow',
    description: 'Elevation and shadow tokens.',
  },
  parameters: { ...createDesignParameters('1.6 Shadow') },
}
