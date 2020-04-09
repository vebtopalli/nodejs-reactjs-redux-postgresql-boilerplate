module.exports=(req,res,next)=>{
    if(!req.body.name && !req.body.email){
        var UserModel=require('./../../db/models/Models').UserModel;
        var jwtVerify=require('./../../config/JwtVerifyFuncton').jwtVerify;

        jwtVerify(req,res)
        .then((user)=>{
            if(user.id){
                UserModel.findOne({
                    attributes:[
                        'id',
                        'name',
                        'email',
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
                        id:user.id
                    }
                }).then((results)=>{
                    res.status(200).json({results});
                })
            }else{
                res.status(403).json({
                    "code": "USR_09",
                    "message": "Api/Token key is invalid",
                });
            }
        }).catch((err)=>{
            res.status(403).json({
                "code":'USR_06',
                "message": "Something Went Wrong , please try again later",
            });
        })

    }else{
        res.status(403).json({
            "code":'USR_06',
            "message": "Something Went Wrong , please try again later",
        });
    }
}
