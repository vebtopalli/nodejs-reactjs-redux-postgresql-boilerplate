import React, { Component } from 'react';
import {withRouter,BrowserRouter as Router,Switch,NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';


import ReduxLoggedInAction from 'config/redux/actions/logedinAction';
import ReduxCurrentRouteAction from 'config/redux/actions/currentRouteAction';
import ReduxLanguageAction from 'config/redux/actions/languageAction';


class LogedInMenuComponent extends Component {
    constructor(props){
        super(props);
        this.state={
        }
    }

    logoutMe(){
        axios.get('/logout')
        .then((results)=>{
            this.props.ReduxLoggedInAction(false);
            setTimeout(() => {
                window.location.href='/';
            }, 100);
        })
    }
    render() {
        return(
             <nav>
                <div class="nav-wrapper">
                    <a class="right" onClick={this.logoutMe.bind(this)}>Log out</a>
                    <ul id="nav-mobile" class="left hide-on-med-and-down">
                        <li><NavLink class="right" to="/profile/update">Profile</NavLink></li>
                        <li><NavLink to="/dashboard/">Dashboard</NavLink></li>
                    </ul>
                </div>
            </nav>
        )
    }
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({
    ReduxLoggedInAction,
    ReduxCurrentRouteAction,
    ReduxLanguageAction
  },dispatch)
}

function mapStateToProps(state){
    return{
      currentUserInfo:state.currentUserInfo,
      currentRouteReducer:state.currentRouteReducer,
      languageReducer:state.languageReducer,
    }
}

export default withRouter(connect(mapStateToProps,matchDispatchToProps)(LogedInMenuComponent));