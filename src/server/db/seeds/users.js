const bcrypt = require('bcryptjs');
const path = require('path');

exports.seed = async (knex, Promise) => {

  const seed_file = path.basename(__filename)
  const seedIsExist = await knex('knex_seeds_lock').where({ seed_file }).first()
  if (seedIsExist) {
    return
  } else {

    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(process.env.ADMIN_PW, salt);
    await knex('users').truncate()

    await knex('knex_seeds_lock').insert({ seed_file })

    await knex('users').insert({
      username: 'admin',
      password: hash,
    })
    return
  }
};