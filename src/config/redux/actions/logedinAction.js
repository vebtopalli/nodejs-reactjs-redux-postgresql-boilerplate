const ReduxLoggedInAction=(user)=>{
    return {
        type:"loggedinaction",
        payload:user
    }
};

export default ReduxLoggedInAction;