export type MenuPlaygroundArgs = {
  label: string
  paddingX: number
  paddingY: number
  radius: number
  fontSize: number
  fontWeight: number
  backgroundColor: string
  textColor: string
}

type DesignSpec = {
  component: 'MenuPlayground'
  menuKey: string
  title: string
  props: Record<
    keyof MenuPlaygroundArgs,
    { type: string; default: string | number; token?: string }
  >
  values: MenuPlaygroundArgs
}

export const getDesignSpecs = (
  menuKey: string,
  title: string,
  overrides: Partial<MenuPlaygroundArgs> = {}
): DesignSpec => ({
  component: 'MenuPlayground',
  menuKey,
  title,
  props: {
    label: { type: 'string', default: 'Preview' },
    paddingX: { type: 'number(px)', default: 16 },
    paddingY: { type: 'number(px)', default: 10 },
    radius: { type: 'number(px)', default: 8, token: '--radius-md' },
    fontSize: { type: 'number(px)', default: 14, token: '--font-size-sm' },
    fontWeight: { type: 'number', default: 500, token: '--font-weight-medium' },
    backgroundColor: { type: 'string(color)', default: 'var(--color-primary-500)' },
    textColor: { type: 'string(color)', default: 'var(--color-neutral-0)' },
  },
  values: {
    label: 'Preview',
    paddingX: 16,
    paddingY: 10,
    radius: 8,
    fontSize: 14,
    fontWeight: 500,
    backgroundColor: 'var(--color-primary-500)',
    textColor: 'var(--color-neutral-0)',
    ...overrides,
  },
})
