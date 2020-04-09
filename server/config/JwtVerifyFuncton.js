const jwtVerify=(req,res)=>{
    const config=require('./config');
    let jwt = require('jsonwebtoken');
    return new Promise((resolve, reject) => {
        var header=req.headers.authorization || req.session.authorization;
        if(typeof header !== 'undefined') {
            var split_token=header.split(' ');
            header=split_token[1];
            jwt.verify(header,config.secret,(err,authData)=>{
                if (err) {
                    if(err.name=='TokenExpiredError'){
                        req.logout();  
                        req.session = null;
                        res.clearCookie("session")
                        res.clearCookie("session.sig")
                        res.redirect('/?logout=success');
                        reject({
                            "code": "USR_09",
                            "message": "Api/Token key is invalid",
                        })
                    }else{
                        reject({
                            "code": "USR_06",
                            "message": "Something Went Wrong , please try again later",
                        })
                    }
                    return;
                }
                var user=authData.user?authData.user:authData.results;
                if(user.id){
                    resolve(user);
                }else{
                    reject({
                        "code": "USR_09",
                        "message": "Api/Token key is invalid",
                    })
                }
            });
        }else{
            reject({
                "code": "USR_01",
                "message": "User Not Logged In",
            })
        }
        
    });
    
}
module.exports.jwtVerify=jwtVerify;