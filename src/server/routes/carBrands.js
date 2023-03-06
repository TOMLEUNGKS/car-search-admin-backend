const Router = require('koa-router');
const queries = require('../db/queries/carBrands');

const { uploadImg } = require('../middleware/upload.js')

const { uploadS3Img, getS3Img, deleteS3Img } = require("../middleware/s3Img.js")

const { getFullBrands } = require("../helpers/carBrands")
const router = new Router();
const BASE_URL = `/api/car-brands`;



router.get(BASE_URL, async (ctx, next) => {
    try {
        const brands = await getFullBrands();

        ctx.body = {
            success: true,
            data: brands
        };
    } catch (err) {
        console.log(err)
    }
})

router.get(`${BASE_URL}/:id`, async (ctx) => {
    try {
        const brand = await queries.getSingleBrand(ctx.params.id);

        if (brand.length) {

            ctx.body = {
                success: true,
                data: brand
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That brand does not exist.'
            };
        }
    } catch (err) {
        console.log(err)
    }
})

router.post(`${BASE_URL}`, async (ctx) => {

    try {

        await next()

        ctx.request.body.imgs = ctx.state.uplaod_img

        const { err, result } = await queries.addBrand(ctx.request.body);
        result[0].imgs_path = ctx.state.uplaod_img_path

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
}, uploadS3Img("car_brands", "brand_name"))


router.put(`${BASE_URL}/:id`, async (ctx) => {
    try {
        const brand = await queries.updateBrand(ctx.params.id, ctx.request.body);
        if (brand.length) {
            ctx.status = 200;
            ctx.body = {
                success: true,
                data: brand
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That brand does not exist.'
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


router.delete(`${BASE_URL}/:id`, async (ctx, next) => {
    try {
        const brand = await queries.deleteBrand(ctx.params.id);
        ctx.state.brand = brand[0]
        await next()
        if (brand.length) {
            ctx.status = 200;
            ctx.body = {
                success: true,
                data: brand
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That brand does not exist.'
            };
        }
    } catch (err) {
        ctx.status = 400;
        ctx.body = {
            status: 'error',
            message: err.message || 'Sorry, an error has occurred.'
        };
    }
}, deleteS3Img("car_brands", "brand_name"))
module.exports = router;