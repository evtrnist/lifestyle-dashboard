import { Meta, StoryObj } from '@storybook/angular';
import { LifeelButton } from './button.component';

const meta: Meta<LifeelButton> = {
  title: 'UI Kit/Button',
  component: LifeelButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',

      options: ['primary', 'ghost', 'secondary', 'danger'],
    },

    size: {
      control: 'select',

      options: ['sm', 'md', 'lg'],
    },

    loading: {
      control: 'boolean',
    },

    disabled: {
      control: 'boolean',
    },
  },

  args: {
    variant: 'primary',

    size: 'md',

    loading: false,

    disabled: false,
  },
};

export default meta;

type Story = StoryObj<LifeelButton>;

export const Primary: Story = {
  args: {
    variant: 'primary',
  },

  render: (args) => ({
    props: args,

    template: `

      <button

        lifeelbutton

        [variant]="variant"

        [size]="size"

        [loading]="loading"

        [disabled]="disabled"

      >

        Primary button

      </button>

    `,
  }),
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },

  render: (args) => ({
    props: args,

    template: `

      <button

        lifeelbutton

        [variant]="variant"

        [size]="size"

        [loading]="loading"

        [disabled]="disabled"

      >

        Ghost button

      </button>

    `,
  }),
};

export const Danger: Story = {
  args: {
    variant: 'danger',
  },

  render: (args) => ({
    props: args,

    template: `

      <button

        lifeelbutton

        [variant]="variant"

        [size]="size"

        [loading]="loading"

        [disabled]="disabled"

      >

        Delete

      </button>

    `,
  }),
};

export const Loading: Story = {
  args: {
    variant: 'primary',

    loading: true,
  },

  render: (args) => ({
    props: args,

    template: `

      <button

        lifeelbutton

        [variant]="variant"

        [size]="size"

        [loading]="loading"

        [disabled]="disabled"

      >

        Saving

      </button>

    `,
  }),
};

export const Disabled: Story = {
  args: {
    variant: 'primary',

    disabled: true,
  },

  render: (args) => ({
    props: args,

    template: `

      <button

        lifeelbutton

        [variant]="variant"

        [size]="size"

        [loading]="loading"

        [disabled]="disabled"

      >

        Disabled button

      </button>

    `,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    template: `

      <div style="display: flex; align-items: center; gap: 16px;">

        <button lifeelbutton size="sm">Small</button>

        <button lifeelbutton size="md">Medium</button>

        <button lifeelbutton size="lg">Large</button>

      </div>

    `,
  }),
};
