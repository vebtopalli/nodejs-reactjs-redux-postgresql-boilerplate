'use strict';
const passport=require('passport');

passport.serializeUser((user, done) => {
    done(null, user.id);
});
  
passport.deserializeUser((id, done) => {
    var UserModel=require('./../../db/models/Models').UserModel;
    UserModel.findAll({
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
            'social_register',
        ],
        where:{
            id:id
        }
    }).then((results)=>{
        done(null, results);
    }).catch((err) => { done(err,null); });

});
