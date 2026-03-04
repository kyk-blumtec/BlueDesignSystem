export type MenuFigmaEntry = {
  key: string
  title: string
  section: 'docs' | 'foundation' | 'components'
  path?: string
  layers: string[]
}

export const MENU_FIGMA_MAP: Record<string, MenuFigmaEntry> = {
  '0.1 Introduction': {
    key: '0.1 Introduction',
    title: 'Introduction',
    section: 'docs',
    layers: [],
  },
  '0.2 Guide': {
    key: '0.2 Guide',
    title: 'Guide',
    section: 'docs',
    layers: [],
  },
  '0.3 Writing': {
    key: '0.3 Writing',
    title: 'Writing',
    section: 'docs',
    layers: [],
  },
  '1.1 Colors': {
    key: '1.1 Colors',
    title: 'Colors',
    section: 'foundation',
    path: 'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=2-4&m=dev',
    layers: [
      'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=13-184&m=dev',
      'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=265-936&m=dev',
    ],
  },
  '1.2 Typography': {
    key: '1.2 Typography',
    title: 'Typography',
    section: 'foundation',
    path: 'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=2-5&m=dev',
    layers: [
      'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=86-364&m=dev',
    ],
  },
  '1.3 Grid': {
    key: '1.3 Grid',
    title: 'Grid',
    section: 'foundation',
    path: 'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=2-6&m=dev',
    layers: [
      'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=16-251&m=dev',
      'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=16-714&m=dev',
    ],
  },
  '1.4 Icon': {
    key: '1.4 Icon',
    title: 'Icon',
    section: 'foundation',
    path: 'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=2-7&m=dev',
    layers: [
      'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=556-2392&m=dev',
    ],
  },
  '1.5 Radius': {
    key: '1.5 Radius',
    title: 'Radius',
    section: 'foundation',
    path: 'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=3-9&m=dev',
    layers: [
      'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=108-83&m=dev',
    ],
  },
  '1.6 Shadow': {
    key: '1.6 Shadow',
    title: 'Shadow',
    section: 'foundation',
    layers: [],
  },
  '2.1 Buttons': {
    key: '2.1 Buttons',
    title: 'Buttons',
    section: 'components',
    path: 'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=2-9&m=dev',
    layers: [
      'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=245-2274&m=dev',
      'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=247-2855&m=dev',
      'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=252-738&m=dev',
      'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=252-801&m=dev',
    ],
  },
  '2.2 Input': {
    key: '2.2 Input',
    title: 'Input',
    section: 'components',
    path: 'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=3-2&m=dev',
    layers: [
      'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=140-456&m=dev',
    ],
  },
  '2.3 Modal': {
    key: '2.3 Modal',
    title: 'Modal',
    section: 'components',
    path: 'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=3-3&m=dev',
    layers: [
      'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=516-2156&m=dev',
      'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=516-1885&m=dev',
      'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=516-1562&m=dev',
    ],
  },
  '2.4 Checkbox': {
    key: '2.4 Checkbox',
    title: 'Checkbox',
    section: 'components',
    path: 'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=36-74&m=dev',
    layers: [
      'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=147-297&m=dev',
    ],
  },
  '2.5 RadioGroup': {
    key: '2.5 RadioGroup',
    title: 'RadioGroup',
    section: 'components',
    path: 'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=4-481&m=dev',
    layers: [
      'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=480-819&m=dev',
    ],
  },
  '2.6 Pagination': {
    key: '2.6 Pagination',
    title: 'Pagination',
    section: 'components',
    path: 'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=4-481&m=dev',
    layers: [
      'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=512-2095&m=dev',
    ],
  },
  '2.7 Navigation': {
    key: '2.7 Navigation',
    title: 'Navigation',
    section: 'components',
    layers: [],
  },
  '2.8 Tab': {
    key: '2.8 Tab',
    title: 'Tab',
    section: 'components',
    path: 'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=3-5&m=dev',
    layers: [
      'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=589-3315&m=dev',
      'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=623-606&m=dev',
    ],
  },
  '2.9 Tooltip': {
    key: '2.9 Tooltip',
    title: 'Tooltip',
    section: 'components',
    path: 'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=3-7&m=dev',
    layers: [
      'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=382-1395&m=dev',
      'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=382-3104&m=dev',
    ],
  },
  '2.10 Badge & Tag': {
    key: '2.10 Badge & Tag',
    title: 'Badge & Tag',
    section: 'components',
    path: 'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=3-8&m=dev',
    layers: [
      'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=407-326&m=dev',
      'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=407-1044&m=dev',
      'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=412-1430&m=dev',
      'https://www.figma.com/design/ec2KdFeSwTGXsQaNySybLO/%EB%B8%94%EB%A3%A8%ED%8C%9C%EC%BD%94%EB%A6%AC%EC%95%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=431-1071&m=dev',
    ],
  },
  '2.11 Card': {
    key: '2.11 Card',
    title: 'Card',
    section: 'components',
    layers: [],
  },
}

export const getMenuFigmaEntry = (menuKey: string) => MENU_FIGMA_MAP[menuKey]
