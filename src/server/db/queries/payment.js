const knex = require('../connection');

function getAllPayments() {
    return knex('car_payments')
        .select('*');
}

async function getSinglePayment(id) {
    const result = await knex('car_payments')
        .select('*')
        .where({ session_id: id });
    return result[0]
}


async function addPayment(payment) {
    console.log(payment);
    try {
        const result = await knex('car_payments')
            .insert(payment)
            .returning('*');

        return { result }
    } catch (err) {
        console.log(err.message);
        return { err: err.message }
    }
}

function updatePayment(id, payment) {
    return knex('car_payments')
        .update(payment)
        .where({ session_id: id })
        .returning('*');
}
function deletePayment(id) {
    return knex('car_payments')
        .del()
        .where({ session_id: id })
        .returning('*');
}

module.exports = {
    getAllPayments,
    getSinglePayment,
    addPayment,
    updatePayment,
    deletePayment
};