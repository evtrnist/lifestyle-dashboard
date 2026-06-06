import { Meta, StoryObj } from '@storybook/angular';
import { LifeelBadge } from './badge.component';

const meta: Meta<LifeelBadge> = {
  title: 'UI Kit/Badge',
  component: LifeelBadge,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['accent', 'success', 'danger'],
    },
  },
};

export default meta;

type Story = StoryObj<LifeelBadge>;

export const Types: Story = {
  args: {
    type: 'accent',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <lifeel-badge [type]="'accent'">Accent</lifeel-badge>
        <lifeel-badge [type]="'success'">Success</lifeel-badge>
        <lifeel-badge [type]="'danger'">Danger</lifeel-badge>
      </div>`,
  }),
};
