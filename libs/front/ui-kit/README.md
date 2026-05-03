# @lifestyle-dashboard/ui-kit

The in-house design system for Lifeel. All visual primitives, design tokens, the theme service, and shared layout components live here.

> **Migration status:** mid-transition from Taiga UI to fully in-house components.
> The Taiga compat-shim in `src/lib/styles/taiga-compat.less` is temporary and is removed in Phase 9 of the migration. Until then, both UIs coexist.

## Layout

```
libs/front/ui-kit/src/lib/
├── styles/
│   ├── tokens.less          # CSS variables — semantic tokens (use these)
│   └── taiga-compat.less    # Taiga ↔ ours bridge (deleted in Phase 9)
├── tokens/
│   └── tokens.ts            # typed token values for TS / canvas / SVG
├── theme/
│   └── theme.service.ts     # light / dark switcher
├── components/              # atoms + molecules + dialog + tooltip
├── forms/                   # form utils (markAllControlsTouchedAndValidate)
└── icons/                   # lf-icon over lucide-angular
```

## Quick start

### Importing in a feature

The lib is **non-buildable** by design — Nx resolves it via `tsconfig.base.json` path mapping. Just import:

```ts
import {
  ButtonComponent,
  ThemeService,
  semanticTokens,
  TIME_TRACKER_CATEGORIES,
} from '@lifestyle-dashboard/ui-kit';
```

No deep imports — only the public API at `src/index.ts`.

### Using tokens in Less

`apps/front/project.json` has `stylePreprocessorOptions.includePaths` pointing into this lib's `styles/`, so feature `.less` files import without relative paths:

```less
@import 'tokens';

.my-card {
  background: var(--color-surface-raised);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  box-shadow: var(--shadow-md);
  color: var(--color-text-primary);
}
```

> **No hex colors in any component `.less`.** Always go through `var(--color-*)`.
> CI grep enforces this: `grep -P "#[0-9a-fA-F]{3,8}|rgb\(" libs/front/ui-kit/**/*.less` should be empty.

### Using a component

```html
<button lifeelButton variant="primary" size="md" (click)="save()">Save</button>

<lf-icon name="settings" />

<lf-form-field>
  <span slot="label">Email</span>
  <lf-textfield type="email" formControlName="email" />
  <span slot="error">Invalid email</span>
</lf-form-field>
```

### Switching theme

```ts
@Component({ /* ... */ })
export class HeaderComponent {
  private readonly theme = inject(ThemeService);
  toggle = () => this.theme.toggle();
}
```

`ThemeService` writes `data-theme="dark"` to `<html>` and persists the choice in `localStorage`. All component styles react via the `[data-theme="dark"]` block in `tokens.less`.

## Token system

Two layers, intentionally:

1. **Primitives** — raw values: `--_color-lavender-500`, `--_color-mint-300`, `--_color-neutral-200`, etc.
   **Don't reference these directly in component styles.**
2. **Semantics** — meaning-based: `--color-accent-primary`, `--color-text-primary`, `--color-surface-raised`, etc.
   **Use these.**

Why two layers: semantics give us free dark mode (they swap when `[data-theme="dark"]` is set) and free rebrand (change one mapping, all consumers update).

For non-CSS contexts (canvas, SVG, programmatic colors), use `tokens.ts`:

```ts
import { semanticTokens, cssVar } from '@lifestyle-dashboard/ui-kit';

const accent = semanticTokens.color.accent.primary;       // '#8B6DF2' — literal
const accentRef = cssVar('color-accent-primary');         // 'var(--color-accent-primary)' — preferred for CSS contexts
```

## Storybook

This lib hosts the Storybook for the whole front-end design system. Insights lib (`libs/front/ui/insights`) ships its stories into the same instance via the `stories` glob in `.storybook/main.ts` — single navigation, single deploy.

```bash
nx storybook ui-kit             # dev: http://localhost:4400
nx build-storybook ui-kit       # static build into dist/storybook/ui-kit
nx test-storybook ui-kit        # interaction tests
```

The toolbar has a **Light / Dark** switcher — every story renders in both themes via the `data-theme` decorator in `.storybook/preview.ts`.

## Adding a new component

Contract for any new primitive:

1. **Standalone** — `standalone: true`. No `NgModule`.
2. **OnPush** — `changeDetection: ChangeDetectionStrategy.OnPush`.
3. **Signal-based API** — `input()`, `model()`, `output()` over `@Input()`/`@Output()`.
4. **Selector convention** — element + attribute: `lf-button, button[lifeelButton], a[lifeelButton]`.
5. **Token-only styles** — no hex colors, no rgb literals; sizes via `var(--space-*)`, radii via `var(--radius-*)`.
6. **Public API only** — export from `src/index.ts`. No deep imports for consumers.
7. **Story file required** — `<name>.component.stories.ts` next to the component. At minimum: one story per `variant`, plus an `AllStates` overview.
8. **Spec file required** — render + each input variant; for form components also a CVA round-trip test.

### File layout per component

```
libs/front/ui-kit/src/lib/components/<name>/
├── <name>.component.ts
├── <name>.component.html      # only if template > 5 lines
├── <name>.component.less
├── <name>.component.spec.ts
└── <name>.component.stories.ts
```

### Story template

```ts
import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Atoms / Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'ghost', 'secondary', 'danger'] },
    size:    { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    loading: { control: 'boolean' },
  },
  args: { variant: 'primary', size: 'md' },
  render: (args) => ({
    props: args,
    template: `
      <button lifeelButton [variant]="variant" [size]="size" [loading]="loading">
        Save
      </button>
    `,
  }),
};
export default meta;

type Story = StoryObj<ButtonComponent>;

export const Primary:  Story = {};
export const Ghost:    Story = { args: { variant: 'ghost' } };
export const Danger:   Story = { args: { variant: 'danger' } };
export const Loading:  Story = { args: { loading: true } };
export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display:flex; gap:12px; align-items:center;">
        <button lifeelButton size="sm">Small</button>
        <button lifeelButton size="md">Medium</button>
        <button lifeelButton size="lg">Large</button>
      </div>
    `,
  }),
};
```

## Conventions cheat sheet

| Topic | Rule |
|---|---|
| Selectors | `lf-` prefix on elements (`lf-button`), `lfX` on attribute directives (`lifeelButton`, `lfTooltip`) |
| Style language | Less, not SCSS — matches the rest of the app |
| Colors in styles | Only `var(--color-*)`. No hex, no rgb literals. |
| Spacing | `var(--space-1)` … `var(--space-20)`. No raw px outside tokens. |
| Radius | `var(--radius-sm)` … `var(--radius-2xl)`. |
| Dark mode | `[data-theme="dark"]` on `<html>`, **not** `prefers-color-scheme` media query — controlled by `ThemeService`. |
| Imports | From `@lifestyle-dashboard/ui-kit` only. No `@lifestyle-dashboard/ui-kit/lib/...`. |
| Change detection | `OnPush` everywhere. |
| RxJS vs signals | Prefer signals for state; RxJS only at I/O boundaries (HTTP, events). |

## Verification

The lib is non-buildable. The standard checks are:

```bash
nx test ui-kit          # unit tests
nx lint ui-kit          # ESLint + Stylelint
nx build front          # the real "is the lib wired up" check
```

A live import like `import { semanticTokens } from '@lifestyle-dashboard/ui-kit';` working in any feature lib is the proof that TS path mapping is correct.

## Migration context

This lib was created during the Lifeel design-system migration. While migration is in progress:

- Taiga UI 4.58 is still installed alongside.
- `taiga-compat.less` re-maps `--tui-*` variables to our `--color-*` so old Taiga components visually adopt the new palette without a code change.
- `TuiDay` and `TuiTime` types still leak through some service signatures — being removed in Phase 7 of the migration.

When you see a `@taiga-ui/...` import in a feature lib, it's a known migration debt — there's a matching `[P*]` issue on the project board for it.

## Related docs

- `MIGRATION_PLAN.md` (in `design/` workspace) — full phase-by-phase migration plan.
- `design/components.html` — legacy HTML showcase, being replaced by Storybook in Phase 9.5.
- `design/insights.html`, `design/auth.html`, `design/settings-layout.html` — design references for the screens.

---

_Status: bootstrapped in Phase 0. First primitives land in Phase 2._