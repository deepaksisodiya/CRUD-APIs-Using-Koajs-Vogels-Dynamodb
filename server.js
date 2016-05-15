/**
 * Created by deepaksisodiya on 08/05/16.
 */


import koa from 'koa';
let app = koa();

import router from 'koa-router';
let api = router();

import koaBody from 'koa-body';
app.use(koaBody());


import model from './model';

app.use(api.routes());

api.get('/', function *() {
  this.body = 'Hello from koajs';
});

api.post('/user', function *() {
  console.log('name ', this.request.body);
  this.body = yield create(model, this.request.body);
});

api.get('/users', function *() {
  this.body = yield getAllUsers(model);
});

const create = (model, data) => {
  return new Promise((resolve, reject) => {
    model.create(data, (err, user) => {
      if(err) {
        reject(new Error('error in creating the user'))
      }
      resolve(user)
    });
  });
};

const getAllUsers = (model) => {
  return new Promise((resolve, reject) => {
    model.scan().exec((err, users) => {
      if(err) {
        reject(new Error('error in getting the users'))
      }
      resolve(users.Items);
    });
  });
};

app.listen(3000);