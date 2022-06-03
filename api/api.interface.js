const Koa = require('koa');
const Router = require('@koa/router');

const app = new Koa();
const router = new Router();

// logger
app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});
  
// x-response-time
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});
  
router
    .get('/', (ctx, next) => {
        ctx.body = 'Hello World!';
    })
    // 
    .post('/performers', (ctx, next) => {
        // ...
    })
    .put('/users/:id', (ctx, next) => {
        // ...
    })
    .del('/users/:id', (ctx, next) => {
        // ...
    })
    .all('/users/:id', (ctx, next) => {
        // ...
    });
  
app
    .use(router.routes())
    .use(router.allowedMethods());  

export default app;