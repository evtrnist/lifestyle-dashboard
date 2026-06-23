import { Meta, StoryObj } from '@storybook/angular';
import { LifeelDivider } from './divider.component';

const meta: Meta<LifeelDivider> = {
  title: 'UI Kit/Divider',
  component: LifeelDivider,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<LifeelDivider>;

export const Default: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 10px; width: 1000px;">
        <lifeel-divider />
      </div>`,
  }),
};

export const WithContent: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 10px; width: 1000px;">
        <lifeel-divider>
            <div>content</div>
        </lifeel-divider>
      </div>`,
  }),
};
