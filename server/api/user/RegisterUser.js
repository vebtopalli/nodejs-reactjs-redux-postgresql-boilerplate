
module.exports=(req,res,next)=>{
    var data=req.body
   if(!data.name || !data.email || !data.password || !data.address_1 || !data.city || !data.region || !data.postal_code || !data.country){
    res.status(403).json({
        "code": "USR_05",
        "message": "Please Fill All Fields",
      });
   }else{
     CreateUserF(req,res,next);
   }
}


function CreateUserF(req,res,next){
    var data=req.body;


    if(data.region==1){
     res.status(403).json({
         "code": "USR_05",
         "message": "Please Select Region First",
       });
    }

    var UserModel=require('./../../db/models/Models').UserModel;

    UserModel.findOne({
        where:{
            email:data.email
        }
    }).then((results)=>{
        if(results){
            res.status(403).json({
                "code": "USR_10",
                "message": "User Already Exists",
              });
        }else{
            UserModel.create({
                name:data.name,
                email:data.email,
                password_h:data.password,
                address_1:data.address_1,
                address_2:data.address_2,
                city:data.city,
                postal_code:data.postal_code,
                country:data.country,
                phone:data.phone,
                role:data.role
            }).then((response)=>{
                let jwt = require('jsonwebtoken'),
                config = require('./../../config/config');
                jwt.sign( {response} , config.secret,{
                    expiresIn:'24h'
                }, (err,token)=>{
                    if(!err){
                        req.session.authorization=token;
                        req.session.user=response;
                        res.status(200).json(
                            {
                                user:{
                                    schema:{
                                            'user_id':response.id,
                                            'name':response.name,
                                            'email':response.email,
                                            'address_1':response.address_1,
                                            'address_2':response.address_2,
                                            'city':response.city,
                                            'postal_code':response.postal_code,
                                            'country':response.country,
                                            'phone':response.phone,
                                            'role':response.role,
                                    }
                                },
                                'accessToken':token,
                                'expires_in':"24h",
                            }
                        );
                    }else{
                        res.status(200).json(
                            {
                                user:{
                                    schema:{
                                            'id':response.id,
                                            'name':response.name,
                                            'email':response.email,
                                            'address_1':response.address_1,
                                            'address_2':response.address_2,
                                            'city':response.city,
                                            'postal_code':response.postal_code,
                                            'country':response.country,
                                            'phone':response.phone,
                                            'role':response.role,
                                    }
                                },
                            }
                        );
                    }
                } )
            }).catch((error)=>{
                res.status(403).json({
                  "code": "USR_06",
                  "message": "Something Went Wrong , please try again later",
                });
            })
            
        }
    }).catch((error)=>{
        res.status(403).json({
          "code": "USR_06",
          "message": "Something Went Wrong , please try again later",
        });
    })
}