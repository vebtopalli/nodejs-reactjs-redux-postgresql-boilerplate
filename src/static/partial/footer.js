import React, { Component } from 'react';

import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


class FooterComponent extends Component {
    componentDidMount(){
    }
    render() {
        return (
            <footer className="position-relative">
          
            </footer>
        );
    }
}


function matchDispatchToProps(dispatch){
  return bindActionCreators({
    },dispatch)
}

function mapStateToProps(state){
    return{
        currentUserInfo:state.currentUserInfo,
        languageReducer:state.languageReducer,
    }
}

export default withRouter(connect(mapStateToProps,matchDispatchToProps)(FooterComponent));