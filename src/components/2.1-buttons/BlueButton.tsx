export type BlueButtonState = 'primary' | 'hover' | 'active' | 'disabled'

export type BlueButtonProps = {
  label: string
  state?: BlueButtonState
  paddingX?: number
  paddingY?: number
  radius?: number
  fontSize?: number
  fontWeight?: number
  backgroundColor?: string
  hoverBackgroundColor?: string
  activeBackgroundColor?: string
  textColor?: string
}

const resolveBackground = (state: BlueButtonState, props: BlueButtonProps) => {
  if (state === 'hover') return props.hoverBackgroundColor ?? 'var(--color-primary-700)'
  if (state === 'active') return props.activeBackgroundColor ?? 'var(--color-primary-700)'
  if (state === 'disabled') return 'var(--color-neutral-200)'
  return props.backgroundColor ?? 'var(--color-primary-500)'
}

export const BlueButton = ({
  label,
  state = 'primary',
  paddingX = 16,
  paddingY = 10,
  radius = 8,
  fontSize = 14,
  fontWeight = 500,
  backgroundColor = 'var(--color-primary-500)',
  hoverBackgroundColor = 'var(--color-primary-700)',
  activeBackgroundColor = 'var(--color-primary-700)',
  textColor = 'var(--color-neutral-0)',
}: BlueButtonProps) => (
  <button
    type="button"
    disabled={state === 'disabled'}
    style={{
      border: 'none',
      borderRadius: `${radius}px`,
      background: resolveBackground(state, {
        label,
        state,
        paddingX,
        paddingY,
        radius,
        fontSize,
        fontWeight,
        backgroundColor,
        hoverBackgroundColor,
        activeBackgroundColor,
        textColor,
      }),
      color: state === 'disabled' ? 'var(--color-neutral-700)' : textColor,
      padding: `${paddingY}px ${paddingX}px`,
      fontFamily: 'var(--font-family-base)',
      fontSize: `${fontSize}px`,
      fontWeight,
      lineHeight: 'var(--line-height-normal)',
      cursor: state === 'disabled' ? 'not-allowed' : 'pointer',
      opacity: state === 'active' ? 0.92 : 1,
      transform: state === 'active' ? 'translateY(1px)' : 'translateY(0)',
      transition: 'all 120ms ease',
    }}
  >
    {label}
  </button>
)

export default BlueButton
