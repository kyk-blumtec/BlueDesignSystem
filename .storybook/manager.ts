import { addons } from '@storybook/manager-api';

console.log('ANTIGRAVITY_MANAGER_TS_LOADED');

// Handle sidebar icon removal
setInterval(() => {
  ['0-docs', '1-foundation', '2-components'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      // Target the component/folder icon specifically
      const icons = btn.querySelectorAll('svg.css-13mxo4m, svg[color="secondary"]');
      icons.forEach(icon => {
        (icon as HTMLElement).style.display = 'none';
        (icon as HTMLElement).style.width = '0';
        (icon as HTMLElement).style.margin = '0';
      });
      // Adjust padding to remove the gap
      (btn as HTMLElement).style.paddingLeft = '10px';
    }
  });
}, 100);
