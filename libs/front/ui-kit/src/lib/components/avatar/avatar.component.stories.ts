import { Meta, StoryObj } from '@storybook/angular';
import { LifeelAvatar } from './avatar.component';

const meta: Meta<LifeelAvatar> = {
  title: 'UI Kit/Avatar',
  component: LifeelAvatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 's', 'm', 'l', 'xl'],
    },
    src: {
      control: 'text',
    },
    initials: {
      control: 'text',
    },
    isSquare: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<LifeelAvatar>;

export const Default: Story = {
  args: {
    size: 'm',
    src: 'https://randomuser.me/api/portraits/men/75.jpg',
    initials: 'JD',
    isSquare: false,
  },
};
