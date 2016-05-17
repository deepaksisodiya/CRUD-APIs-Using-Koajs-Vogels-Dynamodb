/**
 * Created by deepaksisodiya on 08/05/16.
 */


import koa from 'koa';
let app = koa();

import koaBody from 'koa-body';
app.use(koaBody());

import model from './model';

import routes from './route';

app.use(routes.routes());

app.listen(3000);