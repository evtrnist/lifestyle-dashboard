export class StorageAreaService {
  protected readonly storage: Storage | null = null;

  public get<TValue>(key: string): TValue | null {
    if (this.storage === null) {
      return null;
    }

    const rawValue = this.storage.getItem(key);

    if (rawValue === null || rawValue === undefined) {
      return null;
    }

    try {
      return JSON.parse(rawValue) as TValue;
    } catch (e) {
      console.error(`Error parsing storage value for key "${key}":`, e);
      return rawValue as TValue;
    }
  }

  public set<TValue>(key: string, value: TValue): void {
    if (this.storage === null) {
      return;
    }

    this.storage?.setItem(key, JSON.stringify(value));
  }

  public remove(key: string): void {
    if (this.storage === null) {
      return;
    }

    this.storage?.removeItem(key);
  }

  public has(key: string): boolean {
    if (this.storage === null) {
      return false;
    }

    return this.storage?.getItem(key) !== null;
  }

  public clear(): void {
    if (this.storage === null) {
      return;
    }

    this.storage?.clear();
  }
}
