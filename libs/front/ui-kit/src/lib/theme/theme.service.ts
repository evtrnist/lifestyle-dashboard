import { DOCUMENT, effect, inject, Injectable, signal } from '@angular/core';
import { LOCAL_STORAGE } from '@lifestyle-dashboard/storage';

type Theme = 'dark' | 'light';
const STORAGE_KEY = 'lifeel-theme-key';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storage = inject(LOCAL_STORAGE);
  private readonly document = inject(DOCUMENT);
  private readonly $theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    effect(() => {
      const theme = this.$theme();
      this.document.documentElement.setAttribute('data-theme', theme);
    });
  }

  public setTheme(theme: Theme): void {
    this.$theme.set(theme);
    this.storage?.setItem(STORAGE_KEY, theme);
  }

  public toggleTheme(): void {
    const newTheme = this.$theme() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  private getInitialTheme(): Theme {
    const storedTheme = this.storage?.getItem(STORAGE_KEY) as Theme | null;

    if (storedTheme === 'dark' || storedTheme === 'light') {
      return storedTheme;
    }
    return 'light';
  }
}
