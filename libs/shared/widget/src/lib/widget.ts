import { Type } from '@angular/core';
import { Slot } from './slot';

export interface Widget {
  slot: Slot;
  content: Type<unknown>;
  getData?: () => void; 
  getInfo?: () => void;
}