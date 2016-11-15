import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }   from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { HttpModule }   from '@angular/http';

import {AppComponent}  from './components/app.component';
import {ChatComponent}  from './components/chat.component';
import {UserLoginComponent}  from './components/userLogin.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'chat',  component: ChatComponent },
            { path: 'login', component: UserLoginComponent },
            { path: '',  component: ChatComponent },
            { path: '**',  component: ChatComponent }
        ]),
        FormsModule, BrowserModule, HttpModule
    ],
    declarations: [
        AppComponent,
        ChatComponent,
        UserLoginComponent,
    ],
    bootstrap: [ AppComponent]
})
export class AppModule { }