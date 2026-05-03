import { inject, Injectable } from '@angular/core';
import { SESSION_STORAGE } from './session-storage.token';
import { StorageAreaService } from './storage-area.service';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageAreaService extends StorageAreaService {
  protected override readonly storage = inject(SESSION_STORAGE);
}
