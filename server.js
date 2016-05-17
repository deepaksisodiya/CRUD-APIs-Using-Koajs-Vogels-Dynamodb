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

import {createUser, getUsers, getUser, deleteUser, updateUser} from './controller';

api.post('/user', createUser);

api.get('/users', getUsers);

api.get('/user/:userId', getUser);

api.delete('/user/:userId', deleteUser);

api.put('/user/:userId', updateUser);

app.listen(3000);