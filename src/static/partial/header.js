import React, { Component } from 'react';
import {withRouter,NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';


// import LogoutAction from './../../redux/actions/LogOutAction';

import LogedInMenuComponent from './menu/LoggedIn';
import GuestMenuComponent from './menu/Guest';





class HeaderComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            links:'',
            loaded:false,
            userInfo:false,
        }
        this.pushMenuAfterLoad=this.pushMenuAfterLoad.bind(this);
    }
    pushMenuAfterLoad(){
        const checklogin=this.props.loggedInRedurec;
        if(checklogin){
            this.setState({
                links:<LogedInMenuComponent/>,
                loaded:true,
            })
        }else{
            axios.get('/api/login?type=ax').then((results)=>{
                if(results.data){
                    if(results.data.code=='AUT_01'){
                      this.setState({
                          links:<LogedInMenuComponent/>,
                          loaded:true,
                      })
                    }else{                    
                        this.setState({
                            links:<GuestMenuComponent/>,
                            loaded:true,
                        })
                    }
                }else{
                    this.setState({
                        links:<GuestMenuComponent/>,
                        loaded:true,
                    })
                }
            })  
        }
    }
    componentWillMount(){
        this.pushMenuAfterLoad();
    }
    render() {
        return (
            <div>{this.state.links}</div>
        );
    }
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({
    // LogoutAction:LogoutAction,
},dispatch)
}

function mapStateToProps(state){
    return{
        loggedInRedurec:state.loggedInRedurec
    }
}

export default withRouter(connect(mapStateToProps,matchDispatchToProps)(HeaderComponent));