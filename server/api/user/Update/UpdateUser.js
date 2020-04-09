function userUpdate(user_id,data,res,req,change_password){
    var UserModel=require('./../../../db/models/Models').UserModel;
    var update_obj={
        name:data.name,
        address_1:data.address_1,
        address_2:data.address_2,
        city:data.city,
        postal_code:data.postal_code,
        country:data.country,
        phone:data.phone,
    };
    if(change_password){
        update_obj['password_h']=data.password;
    }
    UserModel.update(
        update_obj,
        {
            where:{
                id:user_id,
            }
        }
    ).then((results)=>{
        if(results){
            req.logout();  
            req.session = null;
            res.clearCookie("session")
            res.clearCookie("session.sig")
            res.status(200).json(results);
        }else{
            res.status(403).json({
                "code":'USR_06',
                "message": "Something Went Wrong , please try again later",
            });
        }
    }).catch((error)=>{
        console.log(error);
        res.status(403).json({
            "code":'USR_06',
            "message": "Something Went Wrong , please try again later",
        });
    })
}

module.exports=(req,res,next)=>{

        var UserModel=require('./../../../db/models/Models').UserModel;
        var data=req.body;

        const jwtVerify=require('./../../../config/JwtVerifyFuncton').jwtVerify;
        jwtVerify(req,res)
        .then((user)=>{
            if(user.social_register){
                userUpdate(user.id,data,res,req,false);
            }else{
             if(data.old_password){
                 if(data.old_password){
                    UserModel.findOne({
                         attributes:[
                           'id',
                           'email',
                           'password',
                       ],
                       where:{
                           id:user.id,
                       }
                   }).then((results)=>{
                       if (!results){
                         res.status(403).json({
                             "code":'USR_06',
                             "message": "Something Went Wrong , please try again later",
                         });
                       }
                       const bcrypt=require('bcrypt-nodejs');
                       const compare=bcrypt.compareSync(data.old_password,results.password);
                       if (!compare) {
                         res.status(403).json({
                             "code":'USR_06',
                             "message": "Old Password is not Correct!",
                         });
                       } else {
                         if(data.password && data.password.length>5){
                            userUpdate(user.id,data,res,req,true);
                         }else{
                             res.status(403).json({
                                 "code":'USR_06',
                                 "message": "New Password Should be with more then 6 length",
                             });
                         }
                       }
                   }).catch((error)=>{
                         res.status(403).json({
                             "code":'USR_06',
                             "message": "Something Went Wrong , please try again later",
                         });
                   })
                 }else{
                     res.status(403).json({
                         "code":'USR_06',
                         "message": "If you wish to change password , please write current password",
                     });
                 }
             }else{
                userUpdate(user.id,data,res,req,false);
             }
            }
        }).catch((err)=>{
            res.status(403).json(err);
        })

}
