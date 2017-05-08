import { Injectable } from '@angular/core';

declare var localStorage;
declare var sessionStorage;
@Injectable()
export class StorageService {

  public get(key: string) {
    return JSON.parse(localStorage.getItem(`oxivisuals:${key}`));
  }

  public set(key: string, value: any) {
    localStorage.setItem(`oxivisuals:${key}`, JSON.stringify(value));
  }

  public remove(key: string) {
    localStorage.removeItem(`oxivisuals:${key}`);
  }

  public getSession(key: string) {
    return JSON.parse(sessionStorage.getItem(`oxivisuals:${key}`));
  }

  public setSession(key: string, value: any) {
    sessionStorage.setItem(`oxivisuals:${key}`, JSON.stringify(value));
  }

  public removeSession(key: string) {
    sessionStorage.removeItem(`oxivisuals:${key}`);
  }
}