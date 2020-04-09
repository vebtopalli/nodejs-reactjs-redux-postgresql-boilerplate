const ReduxLanguageAction=(lang)=>{
    var d = new Date();
    d.setTime(d.getTime() + (60*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie='language='+lang+";"+expires;
    return {
        type:"language_action",
        payload:lang
    }
};

export default ReduxLanguageAction;