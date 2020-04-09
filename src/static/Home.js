import React, { Component } from 'react';
import {withRouter,NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';



import ReduxCurrentRouteAction from 'config/redux/actions/currentRouteAction';

class HomeComponent extends Component {
    componentWillMount(){
    }
    componentDidMount(){
        
    }
    render() {
        return (
            <div>
                <h1>home</h1>
            </div>
        );
    }
}


function matchDispatchToProps(dispatch){
  return bindActionCreators({
        // LogoutAction:LogoutAction,
        ReduxCurrentRouteAction
    },dispatch)
}

function mapStateToProps(state){
    return{
        currentUserInfo:state.currentUserInfo,
        languageReducer:state.languageReducer,
    }
}

export default withRouter(connect(mapStateToProps,matchDispatchToProps)(HomeComponent));