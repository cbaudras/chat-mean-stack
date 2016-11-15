import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Http, URLSearchParams, Headers, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {UserService} from '../services/user.service';
import {ChatService} from '../services/chat.service';

@Component({
    selector: 'user-login',
    templateUrl: 'templates/login.html',
    providers: [UserService, ChatService]
})
export class UserLoginComponent {
    username = '';
    password = '';
    errorMsg = null;

    constructor(private _router: Router, private userService: UserService, private chatService:ChatService){}

    ngOnInit() {
        if (sessionStorage.getItem("username") != null && sessionStorage.getItem("username") != ""){
            this._router.navigate(['/chat']);
        }
    }

    login() {
        try{
            this.userService.login(this.username, this.password).subscribe(
                (response: any) => {
                    let data = JSON.parse(response._body);
                    if(data.errorMsg != undefined){
                        this.errorMsg = data.errorMsg;
                    }else if(data.user != undefined && data.user.username != undefined){

                        sessionStorage.setItem("username", data.user.username);
                        this._router.navigate(['/chat']);
                        this.chatService.newUser(data.user.username);
                    }
                }, error => {
                }
            );
        }catch(e){
            this.errorMsg = e.message;
        }
    }

    register(){
        this.userService.register(this.username, this.password).subscribe(
            (response: any) => {
                let data = JSON.parse(response._body);
                if(data.errorMsg != undefined){
                    this.errorMsg = data.errorMsg;
                }else if(data.user != undefined && data.user.username != undefined){
                    sessionStorage.setItem("username", data.user.username);
                    this._router.navigate(['/chat']);
                }
            }, error => {}
        );
    }

    hasErrorMsg(){
        return this.errorMsg != null;
    }

    keypressHandler(event) {
        if (event.keyCode  === 13){
            this.login();
        }
    }
}