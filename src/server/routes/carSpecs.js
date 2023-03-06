const Router = require('koa-router');
const queries = require('../db/queries/carSpecs');

const { getFullSpecs, retriveCarSpec, retriveBaseCarSpec } = require("../helpers/carSpec.js")
const { uploadS3Img, getS3Img, deleteS3Img } = require("../middleware/s3Img.js")
const S3handler = require("../helpers/S3handler")

const router = new Router();
const BASE_URL = `/api/car-specs`;



router.get(BASE_URL, async (ctx) => {
    try {
        const specs = await getFullSpecs();
        ctx.body = {
            success: true,
            data: specs
        };
    } catch (err) {
        console.log(err)
    }
})

router.get(`${BASE_URL}/:id`, async (ctx) => {
    try {
        const spec = await queries.getSingleSpec(ctx.params.id);

        if (spec.length) {

            ctx.body = {
                success: true,
                data: spec
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That spec does not exist.'
            };
        }
    } catch (err) {
        console.log(err)
    }
})

router.post(`${BASE_URL}/img/:id`, async (ctx, next) => {
    try {
        const spec = await retriveBaseCarSpec(ctx.params.id);
        ctx.state.ukey = ctx.params.id
        await next()
        spec.imgs.push(...ctx.state.uplaod_img)
        await queries.updateSpec(ctx.params.id, spec);

        const specOut = await retriveCarSpec(ctx.params.id)

        if (specOut) {
            ctx.status = 201;
            ctx.body = {
                success: true,
                data: specOut
            };
        } else {
            ctx.status = 400;
            ctx.body = {
                status: 'error',
                message: err
            };
        }
    } catch (err) {
        console.log(err);
        ctx.status = 400;
        ctx.body = {
            status: 'error',
            message: err.message || 'Sorry, an error has occurred.'
        };
    }
}, uploadS3Img("car_specs"))

router.delete(`${BASE_URL}/img/:id/:img`, async (ctx, next) => {
    try {
        const spec = await retriveBaseCarSpec(ctx.params.id);
        ctx.state.ukey = ctx.params.id
        ctx.state.img = ctx.params.img
        await next()
        const idx = spec.imgs.indexOf(ctx.params.img)
        spec.imgs.splice(idx, 1)
        await queries.updateSpec(ctx.params.id, spec);
        const specOut = await retriveCarSpec(ctx.params.id)

        if (specOut) {
            ctx.status = 201;
            ctx.body = {
                success: true,
                data: specOut
            };
        } else {
            ctx.status = 400;
            ctx.body = {
                status: 'error',
                message: err
            };
        }
    } catch (err) {
        console.log(err);
        ctx.status = 400;
        ctx.body = {
            status: 'error',
            message: err.message || 'Sorry, an error has occurred.'
        };
    }
}, deleteS3Img("car_specs"))





router.get(`${BASE_URL}/img/:id`, async (ctx, next) => {
    try {

        const spec = await retriveBaseCarSpec(ctx.params.id);
        if (!spec.imgs) {
            throw "No imgs"
        }
        const img_keys = spec.imgs.map(ele => `car_specs/${ctx.params.id}/${ele}`)

        const img_urls = await S3handler.getImgUrls(img_keys)


        if (img_urls) {
            ctx.status = 201;
            ctx.body = {
                success: true,
                data: { imgs: spec.imgs, urls: img_urls }
            };
        } else {
            ctx.status = 400;
            ctx.body = {
                status: 'error',
                message: err
            };
        }
    } catch (err) {
        console.log(err);
        ctx.status = 400;
        ctx.body = {
            status: 'error',
            message: err.message || 'Sorry, an error has occurred.'
        };
    }
})


router.post(`${BASE_URL}`, async (ctx) => {
    try {
        const { err, result } = await queries.addSpec(ctx.request.body);
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
        const spec = await queries.updateSpec(ctx.params.id, ctx.request.body);
        if (spec.length) {
            ctx.status = 200;
            ctx.body = {
                success: true,
                data: spec
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That spec does not exist.'
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
        const spec = await queries.deleteSpec(ctx.params.id);
        if (spec.length) {
            ctx.status = 200;
            ctx.body = {
                success: true,
                data: spec
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That spec does not exist.'
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