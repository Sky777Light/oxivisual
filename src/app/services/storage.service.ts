import { Injectable } from '@angular/core';

declare var localStorage;
@Injectable()
export class StorageService {
  public tempToken: string;

  public get(key: string) {
    return JSON.parse(localStorage.getItem(`oxivisuals:${key}`));
  }

  public set(key: string, value: any) {
    localStorage.setItem(`oxivisuals:${key}`, JSON.stringify(value));
  }

  public remove(key: string) {
    localStorage.removeItem(`oxivisuals:${key}`);
  }
}