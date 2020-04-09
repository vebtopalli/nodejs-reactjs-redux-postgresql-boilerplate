import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


import ReduxCurrentRouteAction from 'config/redux/actions/currentRouteAction';

class NotFoundComponent extends Component {
    componentWillMount(){
        this.props.ReduxCurrentRouteAction('static');
    }
    render() {
        var getTranslateJSON=require('config/languages/'+this.props.language+'.js').obj;
        return (
            <div>
                <div id="app">
                    <div className="space_nav"></div>
                    <div>
                        <div className="container text-center">
                            <h1>{getTranslateJSON["Not Found"]}</h1>
                        </div>
                    </div>
                </div>  
            </div>
        );
    }
}


function matchDispatchToProps(dispatch){
    return bindActionCreators({
        ReduxCurrentRouteAction
    },dispatch)
}

function mapStateToProps(state){
    return{
      language:state.languageReducer
    }
}

export default withRouter(connect(mapStateToProps,matchDispatchToProps)(NotFoundComponent));
      
      