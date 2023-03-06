const Router = require('koa-router');
const queries = require('../db/queries/carPosts');
// const multer = require('@koa/multer')

// const path = require('path');
const { uploadImg } = require("../middleware/upload.js")

const { getFullPosts, getSinglePost, getDealerPosts } = require("../helpers/carPost.js")
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, '/assets'))
//     },
//     filename: function (req, file, cb) {
//         let type = file.originalname.split('.')[1]
//         cb(null, `${file.fieldname}-${file.originalname}`)
//     }
// })
// const upload = multer({
//     storage,
//     limits: {
//         fileSize: 1024 * 1024
//     },

// })


const router = new Router();
const BASE_URL = `/api/car-posts`;



router.get(BASE_URL, async (ctx) => {
    try {
        const posts = await getFullPosts();
        ctx.body = {
            success: true,
            data: posts
        };
    } catch (err) {
        console.log(err)
    }
})

router.get(`${BASE_URL}/:id`, async (ctx) => {
    try {
        const post = await getSinglePost(ctx.params.id);
        if (post) {

            ctx.body = {
                success: true,
                data: post
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That post does not exist.'
            };
        }
    } catch (err) {
        console.log(err)
    }
})

router.get(`${BASE_URL}/manage/:dealer`, async (ctx) => {
    try {
        const post = await getDealerPosts(ctx.params.dealer);
        if (post) {

            ctx.body = {
                success: true,
                data: post
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That post does not exist.'
            };
        }
    } catch (err) {
        console.log(err)
    }
})

//create 

router.post(`${BASE_URL}/img`, ctx => {
    const file = ctx.request.files.Imgs
    console.log(file);
    ctx.body = { path: file.path }
})



router.post(`${BASE_URL}`, uploadImg("posts"), async (ctx) => {
    try {

        if (Array.isArray(ctx.state.uplaod_img)) {
            ctx.request.body.imgs = ctx.state.uplaod_img
        } else {
            ctx.request.body.imgs = [ctx.state.uplaod_img]
        }

        if (!Array.isArray(ctx.request.body.Services)) {
            ctx.request.body.Services = [ctx.request.body.Services]
        }

        const { err, result } = await queries.addPost(ctx.request.body);
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
        console.log(err);
        ctx.status = 400;
        ctx.body = {
            status: 'error',
            message: err.message || 'Sorry, an error has occurred.'
        };
    }
})


router.put(`${BASE_URL}/:id`, async (ctx) => {
    try {
        const post = await queries.updatePost(ctx.params.id, ctx.request.body);
        if (post.length) {
            ctx.status = 200;
            ctx.body = {
                success: true,
                data: post
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That post does not exist.'
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
        const post = await queries.deletePost(ctx.params.id);
        if (post.length) {
            ctx.status = 200;
            ctx.body = {
                success: true,
                data: post
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That post does not exist.'
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