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

api.get('/user/:userId', function *() {
  this.body = yield getSingleUser(model, this.params.userId);
});

api.delete('/user/:userId', function *() {
  this.body = yield deleteSingleUser(model, this.params.userId);
});

api.put('/user/:userId', function *() {
  let data = Object.assign({}, {userId:this.params.userId}, this.request.body);
  this.body = yield updateUser(model, data);
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

const getSingleUser = (model, userId) => {
  return new Promise((resolve, reject) => {
    model.get({userId: userId}, (err, user) => {
      if(err) {
        reject(new Error('Error in getting the user'));
      }
      resolve(user);
    });
  });
};

const deleteSingleUser = (model, userId) => {
  return new Promise((resolve, reject) => {
    model.destroy({userId: userId}, (err) => {
      if(err) {
        reject(new Error('Error in deleting the user'));
      }
      resolve('User deleted successfully');
    });
  });
};

const updateUser = (model, data) => {
  return new Promise((resolve, reject) => {
    model.update(data, (err, user) => {
      if(err) {
        reject(new Error('error in updating the user'));
      }
      resolve(user);
    });
  });
};

app.listen(3000);