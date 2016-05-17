/**
 * Created by deepaksisodiya on 17/05/16.
 */


import Router from 'koa-router';
let api = Router();

import {createUser, getUsers, getUser, deleteUser, updateUser} from './controller';

api.post('/user', createUser);

api.get('/users', getUsers);

api.get('/user/:userId', getUser);

api.delete('/user/:userId', deleteUser);

api.put('/user/:userId', updateUser);

export default api;