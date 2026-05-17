import { Meta, StoryObj } from '@storybook/angular';
import { LifeelIcon } from './icon.component';

const meta: Meta<LifeelIcon> = {
  title: 'UI Kit/Icon',
  component: LifeelIcon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
    },

    size: {
      control: 'number',
    },

    strokeWidth: {
      control: 'number',
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
      />
    `,
  }),
};
