import React, { Component } from 'react';
import {withRouter,BrowserRouter as Router,Switch,NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';



import ReduxLanguageAction from 'config/redux/actions/languageAction';

class GuestMenuComponent extends Component {
    constructor(props){
        super(props);
    }
    changeLanguage(e){
        document.cookie="language="+e.target.value;
        this.props.ReduxLanguageAction(e.target.value);
    }
    render() {
        return (
            <nav>
               <div class="nav-wrapper">
                   <NavLink  class="right" to="/login">Login</NavLink>
                   <ul id="nav-mobile" class="left hide-on-med-and-down">
                       <li><NavLink to="/">Home</NavLink></li>
                   </ul>
               </div>
           </nav>
        );
    }
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({
    ReduxLanguageAction
  },dispatch)
}

function mapStateToProps(state){
    return{
        languageReducer:state.languageReducer,
        loggedInRedurec:state.loggedInRedurec
    };
}

export default withRouter(connect(mapStateToProps,matchDispatchToProps)(GuestMenuComponent));