const Router = require('koa-router');
const queries = require('../db/queries/carModels');

const { getFullModels } = require("../helpers/carModels.js")
const router = new Router();
const BASE_URL = `/api/car-models`;



router.get(BASE_URL, async (ctx) => {
    try {
        const models = await getFullModels();
        ctx.body = {
            success: true,
            data: models
        };
    } catch (err) {
        console.log(err)
    }
})

router.get(`${BASE_URL}/:id`, async (ctx) => {
    try {
        const model = await queries.getSingleModel(ctx.params.id);

        if (model.length) {

            ctx.body = {
                success: true,
                data: model
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That model does not exist.'
            };
        }
    } catch (err) {
        console.log(err)
    }
})


router.post(`${BASE_URL}`, async (ctx) => {
    try {
        const { err, result } = await queries.addModel(ctx.request.body);
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
        const model = await queries.updateModel(ctx.params.id, ctx.request.body);
        if (model.length) {
            ctx.status = 200;
            ctx.body = {
                success: true,
                data: model
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That model does not exist.'
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
        const model = await queries.deleteModel(ctx.params.id);
        if (model.length) {
            ctx.status = 200;
            ctx.body = {
                success: true,
                data: model
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That model does not exist.'
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