

const postQuery = require("../db/queries/carPosts.js")
const specHelper = require("./carSpec.js")

async function getFullPosts(limit) {
    const posts = await postQuery.getAllPosts(limit);

    const promises = posts.map(async post => {

        const spec = await specHelper.retriveCarSpec(post.carID)
        const subStrs = spec.name.split(" ")
        subStrs[0] = post.built_year || subStrs[0]
        const name = subStrs.join(" ")
        return { name, ...post, car: spec }
    });

    return await Promise.all(promises)
}

async function getSinglePost(id) {

    const post = await postQuery.getSinglePost(id);


    const spec = await specHelper.retriveCarSpec(post.carID)
    const subStrs = spec.name.split(" ")
    subStrs[0] = post.built_year || subStrs[0]
    const name = subStrs.join(" ")
    return { name, ...post, car: spec }
}

async function getDealerPosts(dealerID) {

    const posts = await postQuery.getDealerPosts(dealerID);

    const promises = posts.map(async post => {

        const spec = await specHelper.retriveCarSpec(post.carID)
        const subStrs = spec.name.split(" ")
        subStrs[0] = post.built_year || subStrs[0]
        const name = subStrs.join(" ")
        return { name, ...post, car: spec }
    });
    return await Promise.all(promises)
}



module.exports = {
    getFullPosts,
    getSinglePost,
    getDealerPosts

};