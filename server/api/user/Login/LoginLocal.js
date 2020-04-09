
module.exports=(req,res,next)=>{
    const passport=require('passport');
    let jwt = require('jsonwebtoken'),
    config = require('./../../../config/config');
     if(!req.body.username || !req.body.password){
      res.status(423).json({
        "code": "USR_05",
        "message": "Please Write User And Password to continue",
      });
     }else{
       passport.authenticate('local', (err, user, info) => {
         if (err) { 
          res.status(500).json({
            "code": "USR_06",
            "message": "Error",
          });
          console.log(err);
         }
         if (!user) { 
              res.status(400).json({
                "code": "USR_07",
                "message": "User Not Found",
              });
              console.log('status 2');
         }
         if(user==423){
           res.status(400).json({
             "code": "USR_08",
             "message": "User or Password is Wrong",
           });
           console.log('status 3');
         }
         if (user  && user!=423) {
           req.logIn(user, function (err) {
             if (err) { 
                res.status(400).json({
                  "code": "USR_06",
                  "message": "Something Went Wrong , please try again later",
                });
                  return;
              }
              jwt.sign( {user} , config.secret,{
                expiresIn:'24h'
              }, (err,token)=>{
                if(err){
                  res.send(err);
                }
                req.session.authorization='Bearer '+token;
                req.session.expiresIn='24h';
                user.password=undefined;
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
       })(req, res, next);
     }
  }