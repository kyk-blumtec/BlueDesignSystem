import type { Meta, StoryObj } from '@storybook/react'
import DesignSpecPage from './components/DesignSpecPage'
import type { DesignSpecPageProps } from './components/DesignSpecPage'
import type { LayerProperty } from './components/DesignSpecPage'
import { createDesignParameters } from './createDesignParameters'

/* ── Helper ── */
const p = (
  property: string,
  cssProperty: string,
  value: string,
  variable: string,
  token: string
): LayerProperty => ({ property, cssProperty, value, variable, token })

/* ── Meta ── */
const meta: Meta<typeof DesignSpecPage> = {
  title: '2. Components',
  component: DesignSpecPage,
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
}
export default meta
type Story = StoryObj<typeof DesignSpecPage>

/* ═══════════════════════════════════════════════
   2.1 Buttons
   ═══════════════════════════════════════════════ */
export const Buttons: Story = {
  name: '2.1 Buttons',
  args: {
    menuKey: '2.1 Buttons',
    title: 'Buttons',
    section: 'Components',
    description:
      'Primary, Secondary, Utility 버튼의 상태별(Default, Hover, Active, Disabled) 속성과 디자인 토큰을 정의합니다.',
    layers: [
      {
        label: 'Primary Button',
        tiles: [
          {
            label: 'Default State',
            properties: [
              p('Background', 'background', 'var(--color-primary-500)', '--color-primary-500', 'component.button.primary.bg'),
              p('Text Color', 'color', 'var(--color-neutral-0)', '--color-neutral-0', 'component.button.primary.text'),
              p('Border Radius', 'border-radius', '8px', '--radius-md', 'foundation.radius.md'),
              p('Font Size', 'font-size', '14px', '--font-size-sm', 'foundation.typography.fontSize.sm'),
              p('Font Weight', 'font-weight', '500', '--font-weight-medium', 'foundation.typography.fontWeight.medium'),
              p('Padding', 'padding', '10px 16px', 'n/a', 'component.button.padding'),
            ],
          },
          {
            label: 'Hover State',
            properties: [
              p('Background', 'background', 'var(--color-primary-700)', '--color-primary-700', 'component.button.hover.bg'),
              p('Text Color', 'color', 'var(--color-neutral-0)', '--color-neutral-0', 'component.button.hover.text'),
              p('Border Radius', 'border-radius', '8px', '--radius-md', 'foundation.radius.md'),
              p('Font Size', 'font-size', '14px', '--font-size-sm', 'foundation.typography.fontSize.sm'),
              p('Font Weight', 'font-weight', '500', '--font-weight-medium', 'foundation.typography.fontWeight.medium'),
              p('Padding', 'padding', '10px 16px', 'n/a', 'component.button.padding'),
            ],
          },
          {
            label: 'Active State',
            properties: [
              p('Background', 'background', 'var(--color-primary-700)', '--color-primary-700', 'component.button.active.bg'),
              p('Text Color', 'color', 'var(--color-neutral-0)', '--color-neutral-0', 'component.button.active.text'),
              p('Transform', 'transform', 'translateY(1px)', 'n/a', 'component.button.active.transform'),
              p('Border Radius', 'border-radius', '8px', '--radius-md', 'foundation.radius.md'),
              p('Padding', 'padding', '10px 16px', 'n/a', 'component.button.padding'),
            ],
          },
          {
            label: 'Disabled State',
            properties: [
              p('Background', 'background', 'var(--color-neutral-200)', '--color-neutral-200', 'component.button.disabled.bg'),
              p('Text Color', 'color', 'var(--color-neutral-700)', '--color-neutral-700', 'component.button.disabled.text'),
              p('Cursor', 'cursor', 'not-allowed', 'n/a', 'component.button.disabled.cursor'),
              p('Border Radius', 'border-radius', '8px', '--radius-md', 'foundation.radius.md'),
              p('Padding', 'padding', '10px 16px', 'n/a', 'component.button.padding'),
            ],
          },
        ]
      }
    ],
  } satisfies DesignSpecPageProps,
  parameters: { ...createDesignParameters('2.1 Buttons') },
}

/* ═══════════════════════════════════════════════
   2.2 Input
   ═══════════════════════════════════════════════ */
export const Input: Story = {
  name: '2.2 Input',
  args: {
    menuKey: '2.2 Input',
    title: 'Input',
    section: 'Components',
    description:
      'Text Field의 Default, Focus 상태 및 Validation 패턴 속성을 정의합니다.',
    layers: [
      {
        label: 'Text Field',
        tiles: [
          {
            label: 'Default State',
            properties: [
              p('Background', 'background', '#ffffff', 'n/a', 'component.input.bg'),
              p('Border', 'border', '1px solid var(--color-neutral-200)', 'n/a', 'component.input.border.default'),
              p('Border Radius', 'border-radius', '8px', '--radius-md', 'foundation.radius.md'),
              p('Padding', 'padding', '10px 12px', 'n/a', 'component.input.padding'),
              p('Text Color', 'color', 'var(--color-neutral-900)', '--color-neutral-900', 'foundation.color.neutral.900'),
            ],
          },
          {
            label: 'Focus State',
            properties: [
              p('Background', 'background', '#ffffff', 'n/a', 'component.input.bg'),
              p('Border', 'border', '1px solid var(--color-primary-500)', '--color-primary-500', 'component.input.border.focus'),
              p('Border Radius', 'border-radius', '8px', '--radius-md', 'foundation.radius.md'),
              p('Padding', 'padding', '10px 12px', 'n/a', 'component.input.padding'),
              p('Text Color', 'color', 'var(--color-neutral-900)', '--color-neutral-900', 'foundation.color.neutral.900'),
            ],
          },
        ]
      }
    ],
  } satisfies DesignSpecPageProps,
  parameters: { ...createDesignParameters('2.2 Input') },
}

/* ═══════════════════════════════════════════════
   2.3 Modal
   ═══════════════════════════════════════════════ */
export const Modal: Story = {
  name: '2.3 Modal',
  args: {
    menuKey: '2.3 Modal',
    title: 'Modal',
    section: 'Components',
    description:
      'Dialog의 Default, Scrollable, Fullscreen 레이아웃 및 인터랙션 패턴을 정의합니다.',
    layers: [
      {
        label: 'Dialog Variants',
        tiles: [
          {
            label: 'Default Dialog',
            properties: [
              p('Surface', 'background', '#ffffff', 'n/a', 'component.modal.surface'),
              p('Border Radius', 'border-radius', '16px', '--radius-xl', 'foundation.radius.xl'),
              p('Shadow', 'box-shadow', '0 12px 28px rgba(15,23,42,0.25)', 'n/a', 'foundation.shadow.xl'),
              p('Padding', 'padding', '20px', 'n/a', 'component.modal.padding'),
              p('Width', 'width', '560px', 'n/a', 'component.modal.width.default'),
            ],
          },
          {
            label: 'Scrollable Dialog',
            properties: [
              p('Surface', 'background', '#ffffff', 'n/a', 'component.modal.surface'),
              p('Border Radius', 'border-radius', '16px', '--radius-xl', 'foundation.radius.xl'),
              p('Shadow', 'box-shadow', '0 12px 28px rgba(15,23,42,0.25)', 'n/a', 'foundation.shadow.xl'),
              p('Padding', 'padding', '20px', 'n/a', 'component.modal.padding'),
              p('Width', 'width', '720px', 'n/a', 'component.modal.width.large'),
            ],
          },
          {
            label: 'Fullscreen Dialog',
            properties: [
              p('Surface', 'background', '#ffffff', 'n/a', 'component.modal.surface'),
              p('Border Radius', 'border-radius', '0px', 'n/a', 'component.modal.radius.fullscreen'),
              p('Shadow', 'box-shadow', '0 12px 28px rgba(15,23,42,0.25)', 'n/a', 'foundation.shadow.xl'),
              p('Padding', 'padding', '24px', 'n/a', 'component.modal.padding.fullscreen'),
              p('Width', 'width', '100%', 'n/a', 'component.modal.width.fullscreen'),
            ],
          },
        ]
      }
    ],
  } satisfies DesignSpecPageProps,
  parameters: { ...createDesignParameters('2.3 Modal') },
}

/* ═══════════════════════════════════════════════
   2.4 Checkbox
   ═══════════════════════════════════════════════ */
export const Checkbox: Story = {
  name: '2.4 Checkbox',
  args: {
    menuKey: '2.4 Checkbox',
    title: 'Checkbox',
    section: 'Components',
    description:
      'Checkbox 상태(Default, Checked, Disabled) 및 그룹핑 패턴을 정의합니다.',
    layers: [
      {
        label: 'Checkbox Specs',
        tiles: [
          {
            label: 'Default Variant',
            properties: [
              p('Size', 'width', '16px', 'n/a', 'component.checkbox.size'),
              p('Border Radius', 'border-radius', '4px', '--radius-sm', 'foundation.radius.sm'),
              p('Border', 'border', '1px solid var(--color-neutral-700)', 'n/a', 'component.checkbox.border'),
              p('Checked Background', 'background', 'var(--color-primary-500)', '--color-primary-500', 'component.checkbox.checkedBg'),
            ]
          }
        ],
      },
    ],
  } satisfies DesignSpecPageProps,
  parameters: { ...createDesignParameters('2.4 Checkbox') },
}

/* ═══════════════════════════════════════════════
   2.5 RadioGroup
   ═══════════════════════════════════════════════ */
export const RadioGroup: Story = {
  name: '2.5 RadioGroup',
  args: {
    menuKey: '2.5 RadioGroup',
    title: 'RadioGroup',
    section: 'Components',
    description:
      'Radio 옵션 레이아웃 및 선택 상태 속성을 정의합니다.',
    layers: [
      {
        label: 'Radio Specs',
        tiles: [
          {
            label: 'Default Variant',
            properties: [
              p('Size', 'width', '16px', 'n/a', 'component.radio.size'),
              p('Border', 'border', '1px solid var(--color-neutral-700)', 'n/a', 'component.radio.border'),
              p('Checked Dot', 'background', 'var(--color-primary-500)', '--color-primary-500', 'component.radio.dot'),
              p('Group Gap', 'gap', '8px', 'n/a', 'component.radio.groupGap'),
            ]
          }
        ],
      },
    ],
  } satisfies DesignSpecPageProps,
  parameters: { ...createDesignParameters('2.5 RadioGroup') },
}

/* ═══════════════════════════════════════════════
   2.6 Pagination
   ═══════════════════════════════════════════════ */
export const Pagination: Story = {
  name: '2.6 Pagination',
  args: {
    menuKey: '2.6 Pagination',
    title: 'Pagination',
    section: 'Components',
    description:
      'Pagination 변형 및 인터랙션 패턴 속성을 정의합니다.',
    layers: [
      {
        label: 'Pagination Specs',
        tiles: [
          {
            label: 'Default Variant',
            properties: [
              p('Item Size', 'width', '32px', 'n/a', 'component.pagination.itemSize'),
              p('Border Radius', 'border-radius', '8px', '--radius-md', 'foundation.radius.md'),
              p('Active Background', 'background', 'var(--color-primary-500)', '--color-primary-500', 'component.pagination.activeBg'),
              p('Text Color', 'color', 'var(--color-neutral-700)', '--color-neutral-700', 'foundation.color.neutral.700'),
            ]
          }
        ],
      },
    ],
  } satisfies DesignSpecPageProps,
  parameters: { ...createDesignParameters('2.6 Pagination') },
}

/* ═══════════════════════════════════════════════
   2.7 Navigation
   ═══════════════════════════════════════════════ */
export const Navigation: Story = {
  name: '2.7 Navigation',
  args: {
    menuKey: '2.7 Navigation',
    title: 'Navigation',
    section: 'Components',
    description:
      '메뉴, 브래드크럼, 네비게이션 계층 구조 패턴을 정의합니다.',
    layers: [
      {
        label: 'Navigation Specs',
        tiles: [
          {
            label: 'Default Variant',
            properties: [
              p('Height', 'height', '56px', 'n/a', 'component.nav.height'),
              p('Surface', 'background', '#ffffff', 'n/a', 'component.nav.surface'),
              p('Border', 'border-bottom', '1px solid var(--color-neutral-200)', 'n/a', 'component.nav.border'),
              p('Active Color', 'color', 'var(--color-primary-500)', '--color-primary-500', 'component.nav.active'),
            ]
          }
        ],
      },
    ],
  } satisfies DesignSpecPageProps,
  parameters: { ...createDesignParameters('2.7 Navigation') },
}

/* ═══════════════════════════════════════════════
   2.8 Tab
   ═══════════════════════════════════════════════ */
export const Tab: Story = {
  name: '2.8 Tab',
  args: {
    menuKey: '2.8 Tab',
    title: 'Tab',
    section: 'Components',
    description:
      '탭 및 세그먼트 네비게이션 상태를 정의합니다.',
    layers: [
      {
        label: 'Tab States',
        tiles: [
          {
            label: 'Default',
            properties: [
              p('Indicator', 'border-bottom', '2px solid var(--color-primary-500)', 'n/a', 'component.tab.indicator'),
              p('Text Color', 'color', 'var(--color-neutral-700)', '--color-neutral-700', 'foundation.color.neutral.700'),
              p('Active Weight', 'font-weight', '600', 'n/a', 'component.tab.activeWeight'),
              p('Gap', 'gap', '20px', 'n/a', 'component.tab.gap'),
            ],
          },
          {
            label: 'Active',
            properties: [
              p('Indicator', 'border-bottom', '2px solid var(--color-primary-500)', '--color-primary-500', 'component.tab.indicator.active'),
              p('Text Color', 'color', 'var(--color-primary-500)', '--color-primary-500', 'component.tab.text.active'),
              p('Font Weight', 'font-weight', '600', 'n/a', 'component.tab.activeWeight'),
            ],
          },
        ]
      }
    ],
  } satisfies DesignSpecPageProps,
  parameters: { ...createDesignParameters('2.8 Tab') },
}

/* ═══════════════════════════════════════════════
   2.9 Tooltip
   ═══════════════════════════════════════════════ */
export const Tooltip: Story = {
  name: '2.9 Tooltip',
  args: {
    menuKey: '2.9 Tooltip',
    title: 'Tooltip',
    section: 'Components',
    description:
      '툴팁 트리거 및 배치 변형 속성을 정의합니다.',
    layers: [
      {
        label: 'Tooltip Elements',
        tiles: [
          {
            label: 'Default Body',
            properties: [
              p('Background', 'background', '#0f172a', 'n/a', 'component.tooltip.bg'),
              p('Text Color', 'color', '#ffffff', 'n/a', 'component.tooltip.text'),
              p('Border Radius', 'border-radius', '6px', '--radius-sm', 'foundation.radius.sm'),
              p('Padding', 'padding', '6px 10px', 'n/a', 'component.tooltip.padding'),
            ],
          },
          {
            label: 'Tooltip Arrow',
            properties: [
              p('Arrow Size', 'width', '8px', 'n/a', 'component.tooltip.arrowSize'),
              p('Arrow Color', 'background', '#0f172a', 'n/a', 'component.tooltip.arrowColor'),
            ],
          },
        ]
      }
    ],
  } satisfies DesignSpecPageProps,
  parameters: { ...createDesignParameters('2.9 Tooltip') },
}

/* ═══════════════════════════════════════════════
   2.10 Badge & Tag
   ═══════════════════════════════════════════════ */
export const BadgeAndTag: Story = {
  name: '2.10 Badge & Tag',
  args: {
    menuKey: '2.10 Badge & Tag',
    title: 'Badge & Tag',
    section: 'Components',
    description:
      'Badge / Tag의 컬러, 형태, 상태별 속성을 정의합니다.',
    layers: [
      {
        label: 'Variants',
        tiles: [
          {
            label: 'Badge Primary',
            properties: [
              p('Background', 'background', 'var(--color-primary-50)', '--color-primary-50', 'component.badge.bg.primary'),
              p('Text Color', 'color', 'var(--color-primary-700)', '--color-primary-700', 'component.badge.text.primary'),
              p('Border Radius', 'border-radius', '9999px', '--radius-full', 'foundation.radius.full'),
              p('Padding', 'padding', '4px 10px', 'n/a', 'component.badge.padding'),
            ],
          },
          {
            label: 'Tag Neutral',
            properties: [
              p('Background', 'background', 'var(--color-neutral-200)', '--color-neutral-200', 'component.tag.bg.neutral'),
              p('Text Color', 'color', 'var(--color-neutral-700)', '--color-neutral-700', 'component.tag.text.neutral'),
              p('Border Radius', 'border-radius', '9999px', '--radius-full', 'foundation.radius.full'),
              p('Padding', 'padding', '4px 10px', 'n/a', 'component.tag.padding'),
            ],
          },
        ]
      }
    ],
  } satisfies DesignSpecPageProps,
  parameters: { ...createDesignParameters('2.10 Badge & Tag') },
}

/* ═══════════════════════════════════════════════
   2.11 Card
   ═══════════════════════════════════════════════ */
export const Card: Story = {
  name: '2.11 Card',
  args: {
    menuKey: '2.11 Card',
    title: 'Card',
    section: 'Components',
    description:
      '카드 레이아웃 및 콘텐츠 구성 패턴을 정의합니다.',
    layers: [
      {
        label: 'Card Variants',
        tiles: [
          {
            label: 'Default Card',
            properties: [
              p('Surface', 'background', '#ffffff', 'n/a', 'component.card.surface'),
              p('Border Radius', 'border-radius', '12px', '--radius-lg', 'foundation.radius.lg'),
              p('Shadow', 'box-shadow', '0 4px 12px rgba(15,23,42,0.14)', 'n/a', 'component.card.shadow'),
              p('Padding', 'padding', '16px', 'n/a', 'component.card.padding'),
            ]
          }
        ],
      },
    ],
  } satisfies DesignSpecPageProps,
  parameters: { ...createDesignParameters('2.11 Card') },
}
