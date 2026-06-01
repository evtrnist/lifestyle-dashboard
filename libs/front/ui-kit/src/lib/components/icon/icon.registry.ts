import {
  LucideCat,
  LucideCirclePlus,
  LucideDot,
  LucideLeaf,
  LucideSunrise,
  LucideTrash,
  LucideUser,
} from '@lucide/angular';

export const LIFEEL_ICONS = {
  cat: LucideCat,
  leaf: LucideLeaf,
  sunrise: LucideSunrise,
  dot: LucideDot,
  ['circle-plus']: LucideCirclePlus,
  trash: LucideTrash,
  user: LucideUser,
} as const;

export const LIFEEL_ICON_NAMES = Object.keys(LIFEEL_ICONS) as Array<keyof typeof LIFEEL_ICONS>;

export type LifeelIconName = keyof typeof LIFEEL_ICONS;
