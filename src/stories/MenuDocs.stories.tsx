import type { Meta, StoryObj } from '@storybook/react'
import './storybook-theme.css'

/* ── Docs Page Component ── */
const DocsPage = ({
  title,
  subtitle,
  sections,
}: {
  variant?: 'intro' | 'guide' | 'writing'
  title: string
  subtitle: string
  sections: { icon: string; heading: string; body: string }[]
}) => (
  <div className="ds-page">
    <div className="ds-docs-hero">
      <div className="ds-hero__badge" style={{ display: 'inline-flex', marginBottom: 16 }}>
        🎨 Blue Design System
      </div>
      <h1 className="ds-docs-hero__title">{title}</h1>
      <p className="ds-docs-hero__desc">{subtitle}</p>
    </div>
    <div className="ds-info-grid">
      {sections.map((s) => (
        <div key={s.heading} className="ds-info-card">
          <div className="ds-info-card__icon">{s.icon}</div>
          <h3 className="ds-info-card__title">{s.heading}</h3>
          <p className="ds-info-card__desc">{s.body}</p>
        </div>
      ))}
    </div>
  </div>
)

/* ── Meta ── */
const meta: Meta<typeof DocsPage> = {
  title: '0. Docs',
  component: DocsPage,
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
}
export default meta
type Story = StoryObj<typeof DocsPage>

/* ═══════════════════════════════════════════════
   0.1 Introduction
   ═══════════════════════════════════════════════ */
export const Introduction: Story = {
  name: '0.1 Introduction',
  args: {
    variant: 'intro',
    title: 'Blue Design System',
    subtitle:
      '블루팜코리아의 디자인 시스템입니다. 기획자, 디자이너, 퍼블리셔가 동일한 디자인 언어로 소통하기 위한 공통 View를 제공합니다.',
    sections: [
      {
        icon: '🎨',
        heading: 'Foundation',
        body: 'Colors, Typography, Grid, Icon, Radius, Shadow 등 디자인의 기초가 되는 토큰과 변수를 정의합니다.',
      },
      {
        icon: '🧩',
        heading: 'Components',
        body: 'Button, Input, Modal 등 재사용 가능한 UI 컴포넌트의 속성과 상태를 문서화합니다.',
      },
      {
        icon: '🔄',
        heading: 'Source Export',
        body: '디자인 속성을 JSON, CSS, SCSS, TypeScript 등 다양한 포맷으로 변환하여 퍼블리셔의 라이브러리 구축을 지원합니다.',
      },
      {
        icon: '🔗',
        heading: 'Figma Integration',
        body: 'Figma 디자인 파일과 직접 연동하여, 레이어별 속성을 실시간으로 확인할 수 있습니다.',
      },
    ],
  },
}

/* ═══════════════════════════════════════════════
   0.2 Guide
   ═══════════════════════════════════════════════ */
export const Guide: Story = {
  name: '0.2 Guide',
  args: {
    variant: 'guide',
    title: 'Design System Guide',
    subtitle:
      '디자인 시스템 사용 가이드라인과 원칙을 설명합니다.',
    sections: [
      {
        icon: '📐',
        heading: '일관성 (Consistency)',
        body: '모든 컴포넌트와 패턴은 동일한 디자인 토큰을 사용하여 시각적 일관성을 보장합니다.',
      },
      {
        icon: '♿',
        heading: '접근성 (Accessibility)',
        body: 'WCAG 2.1 AA 기준을 충족하도록 컬러 대비, 키보드 접근성, ARIA 레이블을 적용합니다.',
      },
      {
        icon: '📱',
        heading: '반응형 (Responsive)',
        body: '모바일, 태블릿, 데스크탑 등 다양한 디바이스에서 최적의 경험을 제공합니다.',
      },
      {
        icon: '🔧',
        heading: '확장성 (Extensibility)',
        body: '토큰 기반 구조로 테마 변경, 브랜드 커스터마이징이 용이합니다.',
      },
      {
        icon: '📦',
        heading: 'How to Use',
        body: '각 Foundation/Component 메뉴에서 Properties 테이블을 확인하고, Export 패널에서 원하는 포맷의 소스코드를 복사하세요.',
      },
      {
        icon: '🗂️',
        heading: 'Token Naming',
        body: 'foundation.{category}.{property}.{variant} 또는 component.{name}.{property} 형식을 따릅니다.',
      },
    ],
  },
}

