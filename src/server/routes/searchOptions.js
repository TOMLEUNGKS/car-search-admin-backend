const Router = require('koa-router');
const queries = require('../db/queries/searchOptions');

const router = new Router();
const BASE_URL = `/api/search-options`;


router.get(BASE_URL, async (ctx) => {
    try {
        const options = await queries.getAllOptions();
        ctx.body = {
            success: true,
            data: options
        };
    } catch (err) {
        console.log(err)
    }
})

router.get(`${BASE_URL}/:id`, async (ctx) => {
    try {
        const option = await queries.getSingleOption(ctx.params.id);

        if (option.length) {

            ctx.body = {
                success: true,
                data: option
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That option does not exist.'
            };
        }
    } catch (err) {
        console.log(err)
    }
})

router.post(`${BASE_URL}`, async (ctx) => {

    try {
        const { err, result } = await queries.addOption(ctx.request.body);
        console.log(result);
        if (result) {
            ctx.status = 201;
            ctx.body = {
                success: true,
                data: result[0]
            };
        } else {
            ctx.status = 400;
            ctx.body = {
                status: 'error',
                message: err
            };
        }
    } catch (err) {
        ctx.status = 400;
        ctx.body = {
            status: 'error',
            message: err.message || 'Sorry, an error has occurred.'
        };
    }
})


router.put(`${BASE_URL}/:id`, async (ctx) => {
    try {
        const option = await queries.updateOption(ctx.params.id, ctx.request.body);
        if (option.length) {
            ctx.status = 200;
            ctx.body = {
                success: true,
                data: option
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That option does not exist.'
            };
        }
    } catch (err) {
        ctx.status = 400;
        ctx.body = {
            status: 'error',
            message: err.message || 'Sorry, an error has occurred.'
        };
    }
})


router.delete(`${BASE_URL}/:id`, async (ctx) => {
    try {
        const option = await queries.deleteOption(ctx.params.id);
        if (option.length) {
            ctx.status = 200;
            ctx.body = {
                success: true,
                data: option
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That option does not exist.'
            };
        }
    } catch (err) {
        ctx.status = 400;
        ctx.body = {
            status: 'error',
            message: err.message || 'Sorry, an error has occurred.'
        };
    }
})
module.exports = router;