export enum SettingUrl {
  WIDGET_LAYOUT = 'widget-layout',
  PROFILE = 'profile',
}

export interface SettingUrlItem {
  url: SettingUrl;
  name: string;
}

export const SETTING_URLS: SettingUrlItem[] = [
  {
    url: SettingUrl.WIDGET_LAYOUT,
    name: 'Widget Layout',
  },
  {
    url: SettingUrl.PROFILE,
    name: 'Profile',
  },
];
