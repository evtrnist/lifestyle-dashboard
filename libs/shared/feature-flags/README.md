# @lifestyle-dashboard/feature-flags

Shared feature flag definitions for the Lifestyle Dashboard monorepo.

The library exposes a single `FEATURES` object that can be imported from the
package alias and used as a central place for application-level toggles.

## Installation

Use the workspace alias:

```ts
import { FEATURES } from '@lifestyle-dashboard/feature-flags';
```

## API

```ts
export const FEATURES = {
  newUi: true,
  newInsights: false,
};
```

## Current flags

- `newUi`: global switch for the new UI.
- `newInsights`: reserved flag for future insights-related functionality.

## Usage

```ts
import { FEATURES } from '@lifestyle-dashboard/feature-flags';

if (FEATURES.newUi) {
  // render the new UI
}
```

## Build

```bash
nx build feature-flags
```

Build output is written to `dist/libs/shared/feature-flags`.

## Test

```bash
nx test feature-flags
```
