const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;

const knex = require('./db/connection');
const bcrypt = require('bcryptjs');

const options = {};

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  return knex('users').where({ id }).first()
    .then((user) => { done(null, user); })
    .catch((err) => { done(err, null); });
});


passport.use(new LocalStrategy(options, (username, password, done) => {
  knex('users').where({ username }).first()
    .then((user) => {
      if (!user) return done(null, false, { message: 'User doesn\'t exist' });
      if (comparePass(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Password is incorrect' });
      }
    })
    .catch((err) => { return done(err); });
}));

passport.use(new JwtStrategy({
  jwtFromRequest: jwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY
},
  (payload, done) => {
    knex('users').where({ id: payload.id }).first()
      .then(user => {
        if (user) {
          done(null, user)
        } else {
          done(null, false)
        }
      }, err => done(err))
  }))