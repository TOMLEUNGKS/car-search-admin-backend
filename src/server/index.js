const environment = process.env.NODE_ENV || 'development';

const Koa = require('koa');
const koaBody = require('koa-body');
const session = require('koa-session');
const passport = require('koa-passport');
const serve = require('koa-static')
const mount = require('koa-mount')
const logger = require("koa-logger")

const cors = require('@koa/cors');
const path = require('path')
const settings = require("settings");


require('dotenv').config()


const brandRoutes = require('./routes/carBrands');
const specRoutes = require('./routes/carSpecs');
const modelRoutes = require('./routes/carModels');
const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payment');
const postRoutes = require('./routes/carPosts');
const optionRoutes = require('./routes/searchOptions');

const app = new Koa();
app.use(serve("./images"))
// app.use(mount('/public ', serve(".")))
app.use(logger())


app.use(cors({
    credentials: true
}));
const PORT = environment == "production" ? process.env.PROD_PORT : process.env.PORT;


// sessions
app.keys = [process.env.SESSION_SECRET_KEY];
const CONFIG = {
    key: 'SESSION', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/

}


app.use(session(CONFIG, app));



app.use(koaBody({
    multipart: true, // Allow multiple files to be uploaded
    formidable: {
        uploadDir: path.join(settings.PROJECT_DIR, 'images'),
        maxFileSize: 512 * 512 * 60,//Upload file size
        keepExtensions: true, //  Extensions to save images
    }
}));

// authentication
require('./auth');
app.use(passport.initialize());
app.use(passport.session());


// routes
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        // will only respond with JSON
        ctx.status = err.statusCode || err.status || 500;
        console.log(err.message);
        ctx.body = {
            success: false,
            message: err.message,
        };
    }
});



app.use(brandRoutes.routes());
app.use(specRoutes.routes());
app.use(modelRoutes.routes());
app.use(authRoutes.routes());
app.use(paymentRoutes.routes());
app.use(postRoutes.routes());
app.use(optionRoutes.routes());


const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;