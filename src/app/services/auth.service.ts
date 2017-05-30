import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {StorageService} from "./storage.service";

declare var alertify:any;

@Injectable()
export class AuthService {

  constructor(
      private http: Http,
      private storageService: StorageService
  ) {}

  createAuthorizationHeader(headers: Headers) {
    let token = this.storageService.get("token") ||  this.storageService.getSession("token");
    headers.append('Authorization', token);
  }


  get(url) {
    let headers = new Headers({'Content-Type': 'application/json'});

    this.createAuthorizationHeader(headers);
    return this.http.get(url, new RequestOptions({ headers: headers }));
  }

  post(url, data = {},options:any={hasAuthHeader:true}) {
    let headers = new Headers();
    if(options.hasAuthHeader)this.createAuthorizationHeader(headers);
    return this.http.post(url, data, new RequestOptions({ headers: headers }));
  }

  put(url, data = {}) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.put(url, data, new RequestOptions({ headers: headers }));
  }

  delete(url, data = {}) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.delete(url, new RequestOptions({
      headers: headers,
      body: data
    }));
  }

  saveJS(jsCode):Function{
    let res = ()=>{};
    try{
      res = Function("return "+jsCode)();
    }catch(e){
      alertify.error(e);
    }finally{
      return res ;
    }
  }
}