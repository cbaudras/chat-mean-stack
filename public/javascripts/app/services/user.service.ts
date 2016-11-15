import { Injectable } from '@angular/core';
import {Component} from '@angular/core';
import {Http, URLSearchParams, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

    constructor( private _http: Http){}

    login(username, password) {

        if(username == '' || password == ''){
            throw new Error('Username and password are mandatory');
        }

        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('username', username);
        urlSearchParams.append('password', password);
        let body = urlSearchParams.toString();

        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post('/user/login', body, {headers: headers});
    }

    logout() {
        return this._http.get('/user/logout');
    }

    register(username, password){
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('username', username);
        password = (password == null || password == '') ? username : password;
        urlSearchParams.append('password', password);
        let body = urlSearchParams.toString();

        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post('/user/register', body, {headers: headers});
    }
}