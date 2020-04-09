const currentUserInfo=(state=false,action)=>{
    if(action.type==='userinformation'){
        state=action.payload;
    }
    return state;
}

export default currentUserInfo;