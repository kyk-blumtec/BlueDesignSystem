import { addons } from '@storybook/manager-api';

console.log('ANTIGRAVITY_MANAGER_TS_LOADED_V3');

/**
 * Storybook Sidebar Customization
 * 1. Hides icons for 1st-depth items (0, 1, 2, 3) with aggressive redundancy.
 * 2. Replaces icons for 3.1 and 3.3 with component icons.
 * 3. Maintains bookmark icon for 3.2.
 */
setInterval(() => {
  const hiddenLabels = ['0. Docs', '1. Foundation', '2. Components', '3. UX-writing'];
  const uxReplaceTargets = ['3.1 문장 작성 원칙', '3.3 유형별 작성 가이드'];
  
  // A. Process all sidebar-related buttons
  const sidebarButtons = document.querySelectorAll('button.sidebar-item, button[id*="0-docs"], button[id*="1-foundation"], button[id*="2-components"], button[class*="css-"]');

  sidebarButtons.forEach(btn => {
    const text = btn.textContent?.trim() || '';

    // 1. Hide 1-depth icons (Strict)
    if (hiddenLabels.some(label => text.startsWith(label) || text.includes(label) && !text.includes('.'))) {
      // Find all SVGs that aren't specifically marked as "arrow" (if any)
      const svgs = btn.querySelectorAll('svg');
      svgs.forEach(svg => {
        // Only hide if it's the secondary color or has the component icon signature
        // Or just hide ALL icons in 1st depth items as they shouldn't have any (expansion arrows are usually separate spans/css)
        (svg as HTMLElement).style.setProperty('display', 'none', 'important');
        (svg as HTMLElement).style.width = '0';
        (svg as HTMLElement).style.margin = '0';
      });
      
      // Force padding/alignment
      if (btn.classList.contains('sidebar-item')) {
        (btn as HTMLElement).style.setProperty('padding-left', '10px', 'important');
      }
    }

    // 2. Specific replacements for UX-writing sub-items
    if (uxReplaceTargets.some(target => text.includes(target))) {
      const useTag = btn.querySelector('use');
      const svgEl = btn.querySelector('svg');
      if (useTag && svgEl) {
        useTag.setAttribute('href', '#icon--component');
        useTag.setAttribute('xlink:href', '#icon--component');
        svgEl.setAttribute('class', 'css-13mxo4m');
        svgEl.setAttribute('color', 'secondary');
        (svgEl as HTMLElement).style.setProperty('display', 'inline-block', 'important');
        (svgEl as HTMLElement).style.setProperty('width', '14px', 'important');
        (svgEl as HTMLElement).style.setProperty('margin', '0 6px 0 0', 'important');
      }
    }
  });

  // B. Catch-all for other sidebar elements to ensure visual consistency
  document.querySelectorAll('svg use').forEach(use => {
    const href = use.getAttribute('href') || use.getAttribute('xlink:href') || '';
    const svg = use.closest('svg');
    if (!svg) return;
    const btn = svg.closest('button');
    if (!btn) return;
    const text = btn.textContent?.trim() || '';

    // Ignore items we specifically handled or want to preserve
    if (hiddenLabels.some(l => text.includes(l)) || uxReplaceTargets.some(t => text.includes(t)) || text.includes('3.2')) return;

    if (href.includes('icon--folder')) {
      use.setAttribute('href', '#icon--component');
      use.setAttribute('xlink:href', '#icon--component');
      svg.setAttribute('class', 'css-13mxo4m');
      svg.setAttribute('color', 'secondary');
    } else if (href.includes('icon--document')) {
      use.setAttribute('href', '#icon--bookmarkhollow');
      use.setAttribute('xlink:href', '#icon--bookmarkhollow');
      svg.setAttribute('class', 'css-1tr7j7n');
    }
  });

}, 100);
