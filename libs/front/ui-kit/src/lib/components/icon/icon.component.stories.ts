import { Meta, StoryObj } from '@storybook/angular';
import { LifeelIcon } from './icon.component';
import { LIFEEL_ICON_NAMES } from './icon.registry';

const meta: Meta<LifeelIcon> = {
  title: 'UI Kit/Icon',
  component: LifeelIcon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: LIFEEL_ICON_NAMES,
    },

    size: {
      control: 'number',
    },

    strokeWidth: {
      control: 'number',
    },
    color: {
      control: 'color',
    },
  },
};

export default meta;

type Story = StoryObj<LifeelIcon>;

export const Primary: Story = {
  args: {
    name: 'cat',
    size: 16,
    strokeWidth: 2,
  },
  render: (args) => ({
    props: args,

    template: `
      <lifeel-icon
        [name]="name"
        [size]="size"
        [strokeWidth]="strokeWidth"
        [color]="color"
      />
    `,
  }),
};
