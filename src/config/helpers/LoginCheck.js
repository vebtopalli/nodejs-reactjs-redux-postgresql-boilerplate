var logged_in_cache=false;
export default function checkLogin(){
    return new Promise((resolve, reject) => {
        if(logged_in_cache){
            resolve(true);
        }else{
            var axios=require('axios');
            axios.get('/api/login?type=ax').then((results)=>{
                if(results.data){
                    if(results.data.code=='AUT_01'){
                        logged_in_cache=true;
                        resolve(true);
                    }else{                    
                        reject(true);
                    }
                }
            })  
        }
    });
}