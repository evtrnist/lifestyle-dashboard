import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta = {
  title: 'Foundations/Tokens Preview',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

export const Overview: Story = {
  render: () => ({
    props: {
      chips: [
        { label: 'Health', color: 'var(--color-category-health)' },
        { label: 'Leisure', color: 'var(--color-category-leisure)' },
        { label: 'Routine', color: 'var(--color-category-routine)' },
      ],
    },
    template: `
      <section
        style="
          width: min(720px, 100%);
          padding: var(--space-8);
          border: 1px solid var(--color-border-default);
          border-radius: var(--radius-xl);
          background: linear-gradient(
            135deg,
            var(--color-surface-raised),
            var(--color-surface-accent-soft)
          );
          box-shadow: var(--shadow-lg);
          color: var(--color-text-primary);
          font-family: var(--font-family-sans);
        "
      >
        <p
          style="
            margin: 0 0 var(--space-3);
            color: var(--color-text-accent);
            font-size: var(--font-size-sm);
            font-weight: var(--font-weight-semibold);
            letter-spacing: var(--letter-spacing-wide);
            text-transform: uppercase;
          "
        >
          UI Kit
        </p>

        <h2
          style="
            margin: 0 0 var(--space-3);
            font-size: var(--font-size-3xl);
            line-height: var(--line-height-tight);
          "
        >
          Storybook smoke test
        </h2>

        <p
          style="
            margin: 0 0 var(--space-6);
            color: var(--color-text-secondary);
            font-size: var(--font-size-base);
            line-height: var(--line-height-relaxed);
          "
        >
          If you can see this card, theme switcher, and token-based colors, Storybook is wired correctly.
        </p>

        <div style="display: flex; gap: var(--space-3); flex-wrap: wrap; margin-bottom: var(--space-6);">
          <span
            *ngFor="let chip of chips"
            [style.background]="chip.color"
            style="
              display: inline-flex;
              align-items: center;
              padding: var(--space-2) var(--space-4);
              border-radius: var(--radius-full);
              color: var(--color-text-on-accent);
              font-size: var(--font-size-sm);
              font-weight: var(--font-weight-semibold);
            "
          >
            {{ chip.label }}
          </span>
        </div>

        <button
          type="button"
          style="
            border: 0;
            border-radius: var(--radius-full);
            padding: var(--space-3) var(--space-5);
            background: var(--color-accent-primary);
            color: var(--color-text-on-accent);
            font: inherit;
            font-weight: var(--font-weight-semibold);
            box-shadow: var(--shadow-md);
            cursor: pointer;
          "
        >
          Accent Button
        </button>
      </section>
    `,
  }),
};
