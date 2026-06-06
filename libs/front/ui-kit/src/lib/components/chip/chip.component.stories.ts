import { Meta, StoryObj } from '@storybook/angular';
import { LifeelChip } from './chip.component';

const meta: Meta<LifeelChip> = {
  title: 'UI Kit/Chip',
  component: LifeelChip,
  tags: ['autodocs'],
  argTypes: {
    filter: {
      control: 'boolean',
    },
    size: {
      control: 'select',
      options: ['xs', 's', 'm', 'l', 'xs'],
    },
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'ghost',
        'secondary',
        'danger',
        'dotted-secondary',
        'health',
        'leisure',
        'routine',
        'selfdev',
      ],
    },
  },
  args: {
    filter: false,
    size: 'm',
    variant: 'primary',
  },
};

export default meta;

type Story = StoryObj<LifeelChip>;

export const Activities: Story = {
  args: {
    filter: false,
    size: 'm',
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
      <lifeel-chip variant="health">
        <span ngProjectAs="chip-icon">•</span>
        <span ngProjectAs="chip-label">Health</span>
      </lifeel-chip>
      <lifeel-chip variant="leisure">
        <span ngProjectAs="chip-icon">•</span>
        <span ngProjectAs="chip-label">Leisure</span>
      </lifeel-chip>
      <lifeel-chip variant="selfdev">
        <span ngProjectAs="chip-icon">•</span>
        <span ngProjectAs="chip-label">Self-dev</span>
      </lifeel-chip>
      <lifeel-chip variant="routine">
        <span ngProjectAs="chip-icon">•</span>
        <span ngProjectAs="chip-label">Routine</span>
      </lifeel-chip>
    </div>`,
  }),
};

export const Sport: Story = {
  args: {
    filter: false,
    size: 's',
  },
  render: (args) => ({
    props: args,
    template: `
      <lifeel-chip variant="secondary">
          <span ngProjectAs="chip-icon">🏃🏻‍♀️</span>
          <span ngProjectAs="chip-label">45min</span>
      </lifeel-chip>`,
  }),
};

export const Filter: Story = {
  args: {
    filter: true,
    size: 'm',
    variant: 'primary',
  },
  render: (args) => ({
    props: args,
    template: `
      <lifeel-chip [filter]="filter">
        <span ngProjectAs="chip-label">Today</span>
      </lifeel-chip>`,
  }),
};
