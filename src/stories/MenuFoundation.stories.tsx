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

const mapToTiles = (props: LayerProperty[]) => props.map(p => ({ label: p.property, properties: [p] }))

/* ── Meta ── */
const meta: Meta<typeof DesignSpecPage> = {
  title: '1. Foundation',
  component: DesignSpecPage,
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
}
export default meta
type Story = StoryObj<typeof DesignSpecPage>

/* ═══════════════════════════════════════════════
   1.1 Colors
   ═══════════════════════════════════════════════ */
export const Colors: Story = {
  name: '1.1 Colors',
  args: {
    menuKey: '1.1 Colors',
    title: 'Colors',
    section: 'Foundation',
    description:
      '블루팜코리아 디자인 시스템의 컬러 팔레트입니다. Primary, Neutral, Semantic 컬러 세트와 각 컬러의 CSS Variable, Token을 확인하고 소스로 변환할 수 있습니다.',
    layers: [
      {
        label: 'Primary Palette',
        tiles: mapToTiles([
          p('Primary 50', 'background', '#eff6ff', '--color-primary-50', 'foundation.color.primary.50'),
          p('Primary 100', 'background', '#dbeafe', '--color-primary-100', 'foundation.color.primary.100'),
          p('Primary 500', 'background', '#3b82f6', '--color-primary-500', 'foundation.color.primary.500'),
          p('Primary 700', 'background', '#1d4ed8', '--color-primary-700', 'foundation.color.primary.700'),
        ]),
      },
      {
        label: 'Neutral Palette',
        tiles: mapToTiles([
          p('Neutral 0', 'background', '#ffffff', '--color-neutral-0', 'foundation.color.neutral.0'),
          p('Neutral 50', 'background', '#f8fafc', '--color-neutral-50', 'foundation.color.neutral.50'),
          p('Neutral 200', 'background', '#e2e8f0', '--color-neutral-200', 'foundation.color.neutral.200'),
          p('Neutral 700', 'background', '#334155', '--color-neutral-700', 'foundation.color.neutral.700'),
          p('Neutral 900', 'background', '#0f172a', '--color-neutral-900', 'foundation.color.neutral.900'),
        ]),
      },
      {
        label: 'Semantic Colors',
        tiles: mapToTiles([
          p('Success', 'background', '#16a34a', '--color-semantic-success', 'foundation.color.semantic.success'),
          p('Warning', 'background', '#f59e0b', '--color-semantic-warning', 'foundation.color.semantic.warning'),
          p('Danger', 'background', '#dc2626', '--color-semantic-danger', 'foundation.color.semantic.danger'),
        ]),
      },
    ],
  } satisfies DesignSpecPageProps,
  parameters: { ...createDesignParameters('1.1 Colors') },
}

/* ═══════════════════════════════════════════════
   1.2 Typography
   ═══════════════════════════════════════════════ */
export const Typography: Story = {
  name: '1.2 Typography',
  args: {
    menuKey: '1.2 Typography',
    title: 'Typography',
    section: 'Foundation',
    description:
      '타입 스케일, 폰트 패밀리, Weight 및 Line Height 토큰을 정의합니다.',
    layers: [
      {
        label: 'Font Family',
        tiles: mapToTiles([
          p('Base Font', 'font-family', "'Pretendard', 'Noto Sans KR', system-ui, sans-serif", '--font-family-base', 'foundation.typography.fontFamily.base'),
        ]),
      },
      {
        label: 'Font Size Scale',
        tiles: mapToTiles([
          p('XS (12px)', 'font-size', '12px', '--font-size-xs', 'foundation.typography.fontSize.xs'),
          p('SM (14px)', 'font-size', '14px', '--font-size-sm', 'foundation.typography.fontSize.sm'),
          p('MD (16px)', 'font-size', '16px', '--font-size-md', 'foundation.typography.fontSize.md'),
          p('LG (20px)', 'font-size', '20px', '--font-size-lg', 'foundation.typography.fontSize.lg'),
          p('XL (24px)', 'font-size', '24px', '--font-size-xl', 'foundation.typography.fontSize.xl'),
        ]),
      },
      {
        label: 'Font Weight',
        tiles: mapToTiles([
          p('Regular', 'font-weight', '400', '--font-weight-regular', 'foundation.typography.fontWeight.regular'),
          p('Medium', 'font-weight', '500', '--font-weight-medium', 'foundation.typography.fontWeight.medium'),
          p('Bold', 'font-weight', '700', '--font-weight-bold', 'foundation.typography.fontWeight.bold'),
        ]),
      },
      {
        label: 'Line Height',
        tiles: mapToTiles([
          p('Tight', 'line-height', '1.3', '--line-height-tight', 'foundation.typography.lineHeight.tight'),
          p('Normal', 'line-height', '1.5', '--line-height-normal', 'foundation.typography.lineHeight.normal'),
          p('Relaxed', 'line-height', '1.7', '--line-height-relaxed', 'foundation.typography.lineHeight.relaxed'),
        ]),
      },
    ],
  } satisfies DesignSpecPageProps,
  parameters: { ...createDesignParameters('1.2 Typography') },
}

/* ═══════════════════════════════════════════════
   1.3 Grid
   ═══════════════════════════════════════════════ */
export const Grid: Story = {
  name: '1.3 Grid',
  args: {
    menuKey: '1.3 Grid',
    title: 'Grid',
    section: 'Foundation',
    description: '레이아웃 그리드 시스템 — 컬럼, 거터, 마진 규격을 정의합니다.',
    layers: [
      {
        label: 'Desktop Grid',
        tiles: [
          {
            label: 'Desktop Specs',
            properties: [
              p('Columns', 'grid-template-columns', 'repeat(12, 1fr)', 'n/a', 'foundation.grid.columns.desktop'),
              p('Gutter', 'column-gap', '24px', 'n/a', 'foundation.grid.gutter.desktop'),
              p('Margin', 'padding-inline', '24px', 'n/a', 'foundation.grid.margin.desktop'),
            ]
          }
        ],
      },
      {
        label: 'Tablet Grid',
        tiles: [
          {
            label: 'Tablet Specs',
            properties: [
              p('Columns', 'grid-template-columns', 'repeat(8, 1fr)', 'n/a', 'foundation.grid.columns.tablet'),
              p('Gutter', 'column-gap', '16px', 'n/a', 'foundation.grid.gutter.tablet'),
              p('Margin', 'padding-inline', '16px', 'n/a', 'foundation.grid.margin.tablet'),
            ]
          }
        ],
      },
    ],
  } satisfies DesignSpecPageProps,
  parameters: { ...createDesignParameters('1.3 Grid') },
}

/* ═══════════════════════════════════════════════
   1.4 Icon
   ═══════════════════════════════════════════════ */
export const Icon: Story = {
  name: '1.4 Icon',
  args: {
    menuKey: '1.4 Icon',
    title: 'Icon',
    section: 'Foundation',
    description: '아이콘 시스템 — 사이즈, 스트로크, 컬러 규격을 정의합니다.',
    layers: [
      {
        label: 'Icon Specs',
        tiles: [
          {
            label: 'Default & Small',
            properties: [
              p('Default Size', 'font-size', '24px', 'n/a', 'foundation.icon.size.default'),
              p('Small Size', 'font-size', '20px', 'n/a', 'foundation.icon.size.sm'),
              p('Stroke Width', 'border-width', '1.5px', 'n/a', 'foundation.icon.strokeWidth'),
              p('Default Color', 'color', 'var(--color-neutral-700)', '--color-neutral-700', 'foundation.color.neutral.700'),
            ]
          }
        ],
      },
    ],
  } satisfies DesignSpecPageProps,
  parameters: { ...createDesignParameters('1.4 Icon') },
}

/* ═══════════════════════════════════════════════
   1.5 Radius
   ═══════════════════════════════════════════════ */
export const Radius: Story = {
  name: '1.5 Radius',
  args: {
    menuKey: '1.5 Radius',
    title: 'Radius',
    section: 'Foundation',
    description: 'Border Radius 스케일 토큰을 정의합니다.',
    layers: [
      {
        label: 'Radius Scale',
        tiles: mapToTiles([
          p('None', 'border-radius', '0', '--radius-none', 'foundation.radius.none'),
          p('SM (4px)', 'border-radius', '4px', '--radius-sm', 'foundation.radius.sm'),
          p('MD (8px)', 'border-radius', '8px', '--radius-md', 'foundation.radius.md'),
          p('LG (12px)', 'border-radius', '12px', '--radius-lg', 'foundation.radius.lg'),
          p('XL (16px)', 'border-radius', '16px', '--radius-xl', 'foundation.radius.xl'),
          p('Full', 'border-radius', '9999px', '--radius-full', 'foundation.radius.full'),
        ]),
      },
    ],
  } satisfies DesignSpecPageProps,
  parameters: { ...createDesignParameters('1.5 Radius') },
}

/* ═══════════════════════════════════════════════
   1.6 Shadow
   ═══════════════════════════════════════════════ */
export const Shadow: Story = {
  name: '1.6 Shadow',
  args: {
    menuKey: '1.6 Shadow',
    title: 'Shadow',
    section: 'Foundation',
    description: 'Elevation / Shadow 토큰을 정의합니다.',
    layers: [
      {
        label: 'Shadow Levels',
        tiles: mapToTiles([
          p('Level 1 (sm)', 'box-shadow', '0 1px 3px rgba(15,23,42,0.06)', 'n/a', 'foundation.shadow.sm'),
          p('Level 2 (md)', 'box-shadow', '0 4px 12px rgba(15,23,42,0.08)', 'n/a', 'foundation.shadow.md'),
          p('Level 3 (lg)', 'box-shadow', '0 8px 24px rgba(15,23,42,0.12)', 'n/a', 'foundation.shadow.lg'),
          p('Level 4 (xl)', 'box-shadow', '0 12px 28px rgba(15,23,42,0.2)', 'n/a', 'foundation.shadow.xl'),
        ]),
      },
    ],
  } satisfies DesignSpecPageProps,
  parameters: { ...createDesignParameters('1.6 Shadow') },
}
