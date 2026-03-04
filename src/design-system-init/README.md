# Blue Design System Initial Structure

## Folder Strategy

- `src/foundation/*`: Foundation domains from `Menu.md` section 1.
- `src/components/*`: Component domains from `Menu.md` section 2.
- `src/tokens/foundation/tokens.json`: foundation tokens source of truth.
- `src/tokens/foundation/variables.css`: CSS variable output consumed by app and Storybook.
- `src/config/menuFigmaMap.ts`: `Menu.md` to code mapping for `path/layers`.
- `src/stories/createDesignParameters.ts`: automatic Storybook `design` parameter factory.
- `src/templates/MenuItem.stories.template.tsx`: story template for new component folders.

## Story Template Usage

1. Copy `src/templates/MenuItem.stories.template.tsx` into a target component folder.
2. Rename file to `*.stories.tsx`.
3. Replace:
   - `MENU_KEY` with menu key (example: `2.4 Checkbox`)
   - `title` with Storybook title path
   - placeholder component with real component
4. `createDesignParameters(MENU_KEY)` auto-wires `path/layers` Figma URLs.
