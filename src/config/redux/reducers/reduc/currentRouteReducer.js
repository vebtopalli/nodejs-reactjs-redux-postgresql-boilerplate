const currentRouteReducer=(state=false,action)=>{
    if(action.type==='currentroute'){
        state=action.payload;
    }
    return state;
}

export default currentRouteReducer;