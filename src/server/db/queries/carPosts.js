const knex = require('../connection');

function getAllPosts(limit) {
    let knex_limit = limit || 1000000
    return knex('car_posts')
        .limit(knex_limit)
        .select('*');
}

async function getSinglePost(id) {
    const result = await knex('car_posts')
        .select('*')
        .where({ postID: parseInt(id) });
    return result[0]
}

async function getDealerPosts(dealerID) {
    const result = await knex('car_posts')
        .select('*')
        .where({ dealerID: dealerID });
    return result
}


async function addPost(post) {
    console.log(post);
    try {

        const result = await knex('car_posts')
            .insert(post)
            .returning('*')
        return { result }
    } catch (err) {
        console.log(err.message);
        return { err: err.message }
    }
}

function updatePost(id, post) {
    return knex('car_posts')
        .update(post)
        .where({ postID: parseInt(id) })
        .returning('*');
}
function deletePost(id) {
    return knex('car_posts')
        .del()
        .where({ postID: parseInt(id) })
        .returning('*');
}

module.exports = {
    getAllPosts,
    getSinglePost,
    addPost,
    updatePost,
    deletePost,
    getDealerPosts
};