import { useMemo, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import BlueButton from './BlueButton'
import type { BlueButtonProps } from './BlueButton'
import { getDesignSpecs } from './getDesignSpecs'

const FIGMA_PATH_URL =
  'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=2-9&m=dev'
const FIGMA_LAYER_1_URL =
  'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=245-2274&m=dev'
const FIGMA_LAYER_2_URL =
  'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=247-2855&m=dev'
const FIGMA_LAYER_3_URL =
  'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=252-738&m=dev'
const FIGMA_LAYER_4_URL =
  'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=252-801&m=dev'

const StoryPanel = (args: BlueButtonProps) => {
  const [copyLabel, setCopyLabel] = useState('Copy JSON')
  const specs = useMemo(
    () =>
      getDesignSpecs({
        ...args,
      }),
    [args]
  )
  const specsJson = useMemo(() => JSON.stringify(specs, null, 2), [specs])

  const copyJson = async () => {
    try {
      await navigator.clipboard.writeText(specsJson)
      setCopyLabel('Copied')
      setTimeout(() => setCopyLabel('Copy JSON'), 1200)
    } catch {
      setCopyLabel('Copy failed')
      setTimeout(() => setCopyLabel('Copy JSON'), 1200)
    }
  }

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <BlueButton {...args} />
      <div
        style={{
          border: '1px solid var(--color-neutral-200)',
          borderRadius: 12,
          padding: 12,
          background: 'var(--color-neutral-0)',
          display: 'grid',
          gap: 8,
          maxWidth: 640,
        }}
      >
        <strong style={{ fontSize: 13 }}>Design Specs JSON</strong>
        <textarea
          readOnly
          value={specsJson}
          style={{
            width: '100%',
            minHeight: 220,
            fontSize: 12,
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            border: '1px solid var(--color-neutral-200)',
            borderRadius: 8,
            padding: 8,
          }}
        />
        <div>
          <button
            type="button"
            onClick={copyJson}
            style={{
              border: '1px solid var(--color-neutral-200)',
              borderRadius: 8,
              padding: '6px 10px',
              background: 'var(--color-neutral-0)',
              cursor: 'pointer',
            }}
          >
            {copyLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

const meta: Meta<typeof BlueButton> = {
  title: '2. Components/2.1 Buttons/Buttons',
  component: BlueButton,
  parameters: {
    design: [
      { name: 'Path', type: 'figma', url: FIGMA_PATH_URL },
      { name: 'Primary state (Layer 1)', type: 'figma', url: FIGMA_LAYER_1_URL },
      { name: 'Hover state (Layer 2)', type: 'figma', url: FIGMA_LAYER_2_URL },
      { name: 'Active state (Layer 3)', type: 'figma', url: FIGMA_LAYER_3_URL },
      { name: 'Disabled/state variants (Layer 4)', type: 'figma', url: FIGMA_LAYER_4_URL },
    ],
    docs: {
      description: {
        story:
          'Controls에서 padding/radius/fontSize/fontWeight/color 값을 실시간 조정하고, 아래 JSON 패널에서 `getDesignSpecs()` 결과를 복사해 개발 전달 포맷으로 사용할 수 있습니다.',
      },
    },
  },
  argTypes: {
    state: {
      control: 'inline-radio',
      options: ['primary', 'hover', 'active', 'disabled'],
    },
    paddingX: { control: { type: 'number', min: 0, max: 48, step: 1 } },
    paddingY: { control: { type: 'number', min: 0, max: 32, step: 1 } },
    radius: { control: { type: 'number', min: 0, max: 32, step: 1 } },
    fontSize: { control: { type: 'number', min: 10, max: 32, step: 1 } },
    fontWeight: { control: { type: 'number', min: 100, max: 900, step: 100 } },
    backgroundColor: { control: 'text' },
    hoverBackgroundColor: { control: 'text' },
    activeBackgroundColor: { control: 'text' },
    textColor: { control: 'text' },
  },
}

export default meta

type Story = StoryObj<typeof BlueButton>

export const Playground: Story = {
  args: {
    label: 'Primary',
    state: 'primary',
    paddingX: 16,
    paddingY: 10,
    radius: 8,
    fontSize: 14,
    fontWeight: 500,
    backgroundColor: 'var(--color-primary-500)',
    hoverBackgroundColor: 'var(--color-primary-700)',
    activeBackgroundColor: 'var(--color-primary-700)',
    textColor: 'var(--color-neutral-0)',
  },
  render: (args) => <StoryPanel {...args} />,
}
