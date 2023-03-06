const Router = require('koa-router');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const router = new Router();
const paymentQueries = require('../db/queries/payment');
const postQueries = require('../db/queries/carPosts');

router.post("/confirm-payment/:session_id", async (ctx) => {
    const session_id = ctx.request.params.session_id

    const session = await stripe.checkout.sessions.retrieve(
        session_id
    );
    const paymentObj = await paymentQueries.getSinglePayment(session_id);
    paymentObj.status = session.payment_status
    const result = await paymentQueries.updatePayment(session_id, paymentObj);
    if (result) {
        console.log("Updated " + session_id + " status");
        ctx.body = { success: true, session_id: session.id };
    }
})


router.post(`/create-checkout-session`, async (ctx) => {
    const { lineItems, success_url, cancel_url, amount, post_id } = ctx.request.body

    const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: lineItems,
        success_url: success_url + "?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: cancel_url,
    });

    const post = await postQueries.getSinglePost(post_id);
    post.payment_session_id = session.id
    console.log(post);

    await postQueries.updatePost(post_id, post);

    const paymentObj = {
        session_id: session.id,
        amount: amount,
        status: session.payment_status
    }

    const { err, result } = await paymentQueries.addPayment(paymentObj);

    ctx.body = { url: session.url, session_id: session.id };
})


module.exports = router;