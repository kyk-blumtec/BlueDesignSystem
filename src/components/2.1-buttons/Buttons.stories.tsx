import type { Meta, StoryObj } from '@storybook/react'
import BlueButton from './BlueButton'

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

export const Default: Story = {
  args: {
    label: 'Primary',
    state: 'primary',
  },
}
