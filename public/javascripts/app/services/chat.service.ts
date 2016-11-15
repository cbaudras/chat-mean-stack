import { Injectable } from '@angular/core';
import {Component} from '@angular/core';
import {Http, URLSearchParams, Headers, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import * as io from 'socket.io-client';

@Injectable()
export class ChatService {
    socket = null;

    constructor( private _http: Http){
        this.socket = io('http://localhost:8001');
    }

    send(username, text) {
        this.socket.emit('newMessage', {
            'username': username,
            'text': text
        });
    }

    getLastMessages() : Observable<any[]> {
        return this._http.get('/message/last')
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

    }

    newUser(username){
        this.socket.emit('newUser', username)
    }

    chatUpdate(){
        return Observable.create(observer => {
            this.socket.on('chatUpdate', data => { observer.next(data); });
        });
    }

}