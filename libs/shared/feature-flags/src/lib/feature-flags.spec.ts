import { featureFlags } from './feature-flags';

describe('featureFlags', () => {
  it('should work', () => {
    expect(featureFlags()).toEqual('feature-flags');
  });
});
