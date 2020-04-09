
module.exports=(req,res,next)=>{
    const passport=require('passport');
    let jwt = require('jsonwebtoken'),
    config = require('./../../../config/config');
     
       passport.authenticate('facebook',{ failureRedirect: '/user/login' }, (err, user, info) => {
         if (err) { 
          res.status(400).json({
            "code": "USR_02",
            "message": "An Error Has Occur , please try again!",
            "field": "example"
          });
        }
 
        if(typeof user!='undefined' && user[0]){
          var UserModel=require('./../../../db/models/Models').UserModel;
          UserModel.findOne({
            where:{
              email:user[0].emails[0].value
            }
          }).then((results)=>{
            if(results){ // user exist on db
              req.logIn(results, function (err) {
                if (err) { 
                     res.status(500).json({status: 'error'});
                 }
                 jwt.sign( {results} , config.secret,{
                   expiresIn:'24h'
                 }, (err,token)=>{
                   if(err){
                     res.send(err);
                   }
                   results.password=undefined;
                   results.social_register=undefined;
                   req.session.authorization='Bearer '+token;
                   res.redirect('/');
                   return res.json({
                     user:{
                       schema:results
                     },
                     accessToken:'Bearer '+token,
                     expires_in:'24h'
                   });
                 });
              });
            }else{ // user doesnt exist on db
              UserModel.create({
                name:user[0].name.givenName+' '+user[0].name.familyName,
                email:user[0].emails[0].value,
                password_h:user[0].id,
                address_1:'',
                address_2:'',
                city:'',
                postal_code:'',
                country:'',
                day_phone:'',
                eve_phone:'',
                mob_phone:'',
                credit_card:'',
                social_register:true,
              }).then((user)=>{
                if(user){
                  req.logIn(user, function (err) {
                    if (err) { 
                         res.status(500).json({status: 'error'});
                     }
                     jwt.sign( {user} , config.secret,{
                       expiresIn:'24h'
                     }, (err,token)=>{
                       if(err){
                          res.send(err);
                       }
                       user.password=undefined;
                       user.updatedAt=undefined;
                       user.createdAt=undefined;
                       user.social_register=undefined;
                       req.session.authorization='Bearer '+token;
                       res.redirect('/');
                       return res.json({
                        user:{
                           schema:user
                         },
                         accessToken:'Bearer '+token,
                         expires_in:'24h'
                       });
                     });
                  });
                }
              })
            }
          })
        }
       })(req, res, next);
  }