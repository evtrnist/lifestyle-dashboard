export interface HeaderLink {
  label: string;
  pathFragments: string[];
}

export const HEADER_LINKS: HeaderLink[] = [
  {
    label: 'Dashboard',
    pathFragments: ['/', 'dashboard'],
  },
  { label: 'Settings', pathFragments: ['/', 'settings'] },
  { label: 'Profile', pathFragments: ['/', 'settings', 'profile'] },
];
