import type { BlueButtonProps } from './BlueButton'

type DesignPropSpec = {
  type: string
  default: string | number | boolean
  token?: string
}

type BlueButtonDesignSpecs = {
  component: 'BlueButton'
  props: Record<string, DesignPropSpec>
  values: BlueButtonProps
}

const defaultValues: BlueButtonProps = {
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
}

export const getDesignSpecs = (
  overrides: Partial<BlueButtonProps> = {}
): BlueButtonDesignSpecs => ({
  component: 'BlueButton',
  props: {
    label: { type: 'string', default: 'Primary' },
    state: { type: '"primary" | "hover" | "active" | "disabled"', default: 'primary' },
    paddingX: { type: 'number(px)', default: 16 },
    paddingY: { type: 'number(px)', default: 10 },
    radius: { type: 'number(px)', default: 8, token: '--radius-md' },
    fontSize: { type: 'number(px)', default: 14, token: '--font-size-sm' },
    fontWeight: { type: 'number', default: 500, token: '--font-weight-medium' },
    backgroundColor: { type: 'string(color)', default: 'var(--color-primary-500)' },
    hoverBackgroundColor: { type: 'string(color)', default: 'var(--color-primary-700)' },
    activeBackgroundColor: { type: 'string(color)', default: 'var(--color-primary-700)' },
    textColor: { type: 'string(color)', default: 'var(--color-neutral-0)' },
  },
  values: {
    ...defaultValues,
    ...overrides,
  },
})
