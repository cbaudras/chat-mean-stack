import {Component} from '@angular/core';
import {Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {UserService} from '../services/user.service';
import {ChatService} from '../services/chat.service';

@Component({
    selector: 'chat',
    templateUrl: 'templates/chat.html',
    providers: [UserService, ChatService]
})
export class ChatComponent {
    message = '';
    conversation = [];

    constructor(private _router: Router,
                private userService: UserService, private chatService: ChatService){}

    ngOnInit() {

        if (sessionStorage.getItem("username") === null || sessionStorage.getItem("username") == ""){
            this._router.navigate(['/login']);
        }

        this.chatService.getLastMessages().subscribe(
            messages => {this.conversation = messages.concat(this.conversation)},
            err => {}
        );

        this.chatService.send('', '');

        this.chatService.chatUpdate().subscribe(data => {this.conversation.push(data);})
    }

    send() {
        this.chatService.send(sessionStorage.getItem("username"), this.message);
        this.message = '';
    }

    logout() {
        this.userService.logout()
            .subscribe(
            (reponse: any) =>{
                sessionStorage.clear();
                this._router.navigate(['/login']);
            },
                error => {}
        );
    }

    keypressHandler(event) {
        if (event.keyCode === 13){
            this.send();
        }
    }

    isNewUserAlert(data){
        return data.username === '';
    }

    canSendMessage(){
        return this.message != null && this.message != '';
    }
}