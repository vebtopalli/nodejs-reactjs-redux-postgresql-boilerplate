'use strict';
const passport=require('passport'),
bcrypt=require('bcrypt-nodejs'),
LocalStrategy=require('passport-local');
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy   = passportJWT.Strategy;
const config=require('./../config');

var options={
  // usernameField: 'username',
  // passwordField : 'password',
  // passReqToCallback : true
};

passport.use(new LocalStrategy(options, (username, password, done) => {
  var UserModel=require('./../../db/models/Models').UserModel;
  UserModel.findOne({
        attributes:[
          'id',
          'name',
          'email',
          'password',
          'address_1',
          'address_2',
          'city',
          'postal_code',
          'country',
          'phone',
          'role',
          'social_register'
      ],
      where:{
          email:username
      }
  }).then((results)=>{
      if (!results) return done(null, false);
      const compare=bcrypt.compareSync(password,results.password);
      if (!compare) {
        return done(null, 423);
      } else {
        return done(null,results);
      }
  })

}));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : config.secret
  },
  function (jwtPayload, cb) {
    var UserModel=require('./../../db/models/Models').UserModel;
    return UserModel.findOne({
                attributes:[
                  'id',
                  'name',
                  'email',
                  'password',
                  'address_1',
                  'address_2',
                  'city',
                  'postal_code',
                  'country',
                  'phone',
                  'role',
                  'social_register'
              ],
              where:{
                  id:jwtPayload.id
              }
            }).then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
  }
));


// var FacebookStrategy = require('passport-facebook').Strategy;

// passport.use(new FacebookStrategy({
//     clientID: "",
//     clientSecret: "",
//     callbackURL: "http://localhost:3001/customer/login/facebook/callback",
//     profileFields: ['id', 'emails', 'name','address','gender']
//   },
//   function(accessToken, refreshToken, profile, done) {
//     if(!accessToken && !profile){
//       return done(null, 423);
//     }
//     return done(null,[profile,accessToken]);
    
//   })
// );