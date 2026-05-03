import { inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE } from './local-storage.token';
import { StorageAreaService } from './storage-area.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageAreaService extends StorageAreaService {
  protected override readonly storage = inject(LOCAL_STORAGE);
}
