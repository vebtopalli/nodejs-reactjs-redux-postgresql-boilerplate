function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  

const languageReducer=(state=false,action)=>{
    switch(action.type){
        case "language_action":
            state=action.payload;
        break;
        default:
            var nav=window.navigator.language;
            if( getCookie("language") ){
                state=getCookie("language");
            }else{
                // if(nav.includes('de')){
                //     state='de';
                //     document.cookie="language=de";
                // }else{
                    document.cookie="language=en";
                    state='en';
                // }
            }
    }
    return state;
}

export default languageReducer;