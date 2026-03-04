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
  title: '0. Docs',
  component: MenuPlayground,
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Controls로 CSS 수치를 실시간 조정하고, 하단 JSON을 복사해 퍼블리셔/개발 전달 포맷으로 사용할 수 있습니다.',
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

export const Introduction: Story = {
  name: '0.1 Introduction',
  args: {
    ...baseArgs,
    menuKey: '0.1 Introduction',
    title: 'Introduction',
    description: 'Entry point for design system overview and onboarding.',
  },
  parameters: { ...createDesignParameters('0.1 Introduction') },
}

export const Guide: Story = {
  name: '0.2 Guide',
  args: {
    ...baseArgs,
    menuKey: '0.2 Guide',
    title: 'Guide',
    description: 'Guidelines and principles for using the design system.',
  },
  parameters: { ...createDesignParameters('0.2 Guide') },
}

export const Writing: Story = {
  name: '0.3 Writing',
  args: {
    ...baseArgs,
    menuKey: '0.3 Writing',
    title: 'Writing',
    description: 'Writing tone, terminology, and microcopy standards.',
  },
  parameters: { ...createDesignParameters('0.3 Writing') },
}
