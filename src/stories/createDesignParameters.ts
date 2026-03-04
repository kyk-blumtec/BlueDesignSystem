import type { Parameters } from '@storybook/react'
import { getMenuFigmaEntry } from '../config/menuFigmaMap'

type DesignSpec = {
  name: string
  type: 'figma'
  url: string
}

export const createDesignParameters = (menuKey: string): Parameters => {
  const entry = getMenuFigmaEntry(menuKey)
  if (!entry?.path) {
    return {}
  }

  const designSpecs: DesignSpec[] = [
    { name: 'path', type: 'figma', url: entry.path },
    ...entry.layers.map((url, index) => ({
      name: `layers${index + 1}`,
      type: 'figma' as const,
      url,
    })),
  ]

  return {
    design: designSpecs.length === 1 ? designSpecs[0] : designSpecs,
  }
}
