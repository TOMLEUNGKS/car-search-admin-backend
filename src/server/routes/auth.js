const Router = require('koa-router');
const passport = require('koa-passport');
const jsonwebtoken = require('jsonwebtoken')

const router = new Router();
const BASE_URL = `/api/login`;



router.post(`/api/login`, async (ctx) => {
    const { username, password } = ctx.request.body

    try {
        if (username == 'admin' && password == "admin") {

            ctx.session.user = {
                username: "admin",
            }

            ctx.body = {
                success: true,
                data: {
                    username: "admin",
                    nickname: "admin"
                }
            };
        }
    } catch (err) {
        console.log(err)
    }
})

router.post('/auth/login', async (ctx) => {
    return passport.authenticate('local', (err, user, info, status) => {
        if (err) {
            ctx.throw(err.status)
        }
        else if (user) {

            ctx.login(user);

            ctx.session.user = {
                id: user.id,
                username: user.username
            }

            const payload = {
                id: user.id
            }

            const token = jsonwebtoken.sign(
                payload,
                process.env.JWT_SECRET_KEY
            )

            ctx.body = {

                success: true,
                data: {
                    user,
                    token
                },

            };
        } else {
            ctx.status = 400;
            ctx.body = { success: false, status: 'error', info };
        }
    })(ctx);
});


router.get('/auth/getSession', async (ctx) => {
    try {
        if (ctx.isAuthenticated()) {
            ctx.body = {
                success: true,
                data: ctx.session.user,
            }
        } else {
            ctx.body = { success: false }
        }
    } catch (err) {
        throw new Error(err)
    }
})

router.post('/auth/logout', async (ctx) => {
    try {
        if (ctx.isAuthenticated()) {
            await ctx.logout();
            ctx.session.user = null
        }
        else {
            ctx.body = { success: false };
            ctx.throw(401);
        }
    } catch (err) {
        throw new Error(err)
    }
})

module.exports = router;