import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions,Jsonp} from '@angular/http';
import {StorageService} from "./storage.service";
import 'rxjs/add/operator/map';
declare var alertify:any, URLSearchParams:any, XDomainRequest:any, jQuery:any;

@Injectable()
export class AuthService {

    private req;

    constructor(private http:Http,
                private storageService:StorageService,
                private _jsonP:Jsonp) {

    }

    createAuthorizationHeader(headers:Headers) {
        let token = this.storageService.get("token") || this.storageService.getSession("token");
        headers.append('Authorization', token);
    }

    get(url, options:any = {hasAuthHeader: true}) {
        let headers = new Headers({'Content-Type': 'application/json'});

        if (options.hasAuthHeader)this.createAuthorizationHeader(headers);
        if (options.isCross)headers.append('Access-Control-Allow-Origin', '*');
        return this.http.get(url, new RequestOptions({headers: headers}));
    }

    post(url, data = {}, options:any = {hasAuthHeader: true}) {
        let headers = new Headers();
        if (options.hasAuthHeader)this.createAuthorizationHeader(headers);
        return this.http.post(url, data, new RequestOptions({headers: headers}));
    }

    put(url, data = {}) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.put(url, data, new RequestOptions({headers: headers}));
    }

    delete(url, data = {}) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.delete(url, new RequestOptions({
            headers: headers,
            body: data
        }));
    }

    safeJS(jsCode):Function {
        let res = ()=> {
        };
        try {
            res = Function("return " + jsCode)();
        } catch (e) {
            alertify.error(e);
        } finally {
            return res;
        }
    }
}