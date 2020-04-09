const ReduxCurrentRouteAction=(route)=>{
    return {
        type:"currentroute",
        payload:route
    }
};

export default ReduxCurrentRouteAction;