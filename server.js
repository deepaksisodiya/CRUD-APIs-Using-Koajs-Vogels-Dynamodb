/**
 * Created by deepaksisodiya on 08/05/16.
 */


import koa from 'koa';
let app = koa();

app.use(function *() {
  this.body = 'Hello from koa.js';
});

app.listen(3000);