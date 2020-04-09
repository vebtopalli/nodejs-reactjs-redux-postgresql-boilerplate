const loggedInRedurec=(state=false,action)=>{
    if(action.type==='loggedinaction'){
        state=action.payload;
    }
    return state;
}

export default loggedInRedurec;