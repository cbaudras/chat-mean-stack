# chat-mean-stack
A very basic chat based on Mongo, ExpressJS, Angular 2 and Node.js

## What does it do ?

Not much... You register, you chat. How awesome is that ?




## Quick start

First of all, you'll need to install 2 things:
- [Node.js](https://nodejs.org/en/) 
- [MongoDB](https://docs.mongodb.com/getting-started/shell/installation/)



```bash
# clone the repo
git clone git@github.com:cbaudras/chat-mean-stack.git

# change directory 
cd chat-mean-stack

# install the dependencies with npm
npm install

# launch MongoDB server
mongod

# compiles the typescript files and launch local server
npm start

```

The chat should be up and running on [http://localhost:3000/](http://localhost:3000/)

MongoDB connection can be edited in `app.js`. Default is `mongoose.connect('mongodb://localhost/tchat_cb');`
