import type { Preview } from '@storybook/angular';

export const preview: Preview = {
  parameters: { backgrounds: { disable: true }, layout: 'centered' },
  globalTypes: {
    theme: {
      description: 'Theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (storyFn, ctx) => {
      document.documentElement.setAttribute('data-theme', ctx.globals['theme']);
      return storyFn();
    },
  ],
};
export default preview;
