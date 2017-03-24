import {Injectable} from '@angular/core';
import {Http, Headers } from '@angular/http';
import {StorageService} from "./storage.service";

@Injectable()
export class AuthService {

  constructor(
      private http: Http,
      private storageService: StorageService
  ) {}

  createAuthorizationHeader(headers: Headers) {
    let token = this.storageService.get("token") ||  this.storageService.tempToken;
    headers.append('authorization', token);
  }


  get(url) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, {
      headers: headers
    });
  }

  post(url, data = {}) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers: headers
    });
  }


}