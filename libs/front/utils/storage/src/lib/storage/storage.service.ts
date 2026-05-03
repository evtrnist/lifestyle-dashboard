import { inject, Injectable } from '@angular/core';
import { LocalStorageAreaService } from './local-storage-area.service';
import { SessionStorageAreaService } from './session-storage-area.service';
import { StorageAreaService } from './storage-area.service';
import { StorageType } from './storage-type';

@Injectable({
  providedIn: 'root',
})
export class AppStorageService {
  private readonly local = inject(LocalStorageAreaService);
  private readonly session = inject(SessionStorageAreaService);

  public get<TValue>(key: string, type: StorageType = 'local'): TValue | null {
    return this.getArea(type).get<TValue>(key);
  }

  public set<TValue>(key: string, value: TValue, type: StorageType = 'local'): void {
    this.getArea(type).set(key, value);
  }

  public remove(key: string, type: StorageType = 'local'): void {
    this.getArea(type).remove(key);
  }

  public has(key: string, type: StorageType = 'local'): boolean {
    return this.getArea(type).has(key);
  }

  public clear(type: StorageType = 'local'): void {
    this.getArea(type).clear();
  }

  private getArea(type: StorageType): StorageAreaService {
    if (type === 'session') {
      return this.session;
    }

    return this.local;
  }
}
