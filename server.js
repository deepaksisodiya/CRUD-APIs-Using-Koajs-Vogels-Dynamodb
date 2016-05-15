/**
 * Created by deepaksisodiya on 08/05/16.
 */


import koa from 'koa';
let app = koa();

import router from 'koa-router';
let api = router();

app.use(api.routes());

api.get('/', function *() {
  this.body = 'Hello from koajs';
});

app.listen(3000);