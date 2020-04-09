import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {createBrowserHistory} from "history";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import axios from 'axios';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

// import 'assets/scss/style.scss';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';


// components
import NotFoundComponent from "static/404";
import routes from 'routes';

import HeaderComponent from 'static/partial/header';
import FooterComponent from 'static/partial/footer';

import ReduxLoggedInAction from 'config/redux/actions/logedinAction';
import ReduxCurrUserInfoAction from 'config/redux/actions/currUserInfoAction';


import LoginComponent from 'static/User/Login';


const hist = createBrowserHistory();


class IndexWrapperComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_logged_in:false,
        }
        this.changeDefProps = this.changeDefProps.bind(this);
    }
    componentWillMount() {

        axios.get('/api/login?type=ax').then((results) => { // check if user is logged in()
            if (results.data) {
                if (results.data.code === 'AUT_01') {
                    this.props.ReduxLoggedInAction(true);
                    this.setState({
                        user_logged_in:true,
                    })
                } else {
                    this.props.ReduxLoggedInAction(false);
                }
            } else {
                this.props.ReduxLoggedInAction(false);
            }
        })

        axios.get('/api/user/data').then((results) => { // get data of user and store to redux 
            if (results.data) {
                this.props.ReduxCurrUserInfoAction(results.data.results);
            } else {
                this.props.ReduxCurrUserInfoAction(false);
            }
        }).catch((err) => {
            this.props.ReduxCurrUserInfoAction(false);
        })

    }

    changeDefProps(type) {
        this.setState({
            static_page: type,
        })
    }

    render() {
        console.log(this.props.currentUserInfo);
        return (
            <div className='App'>
                <div className="nomarg">
                    <Router history={hist}>
                        <div className="fullheight">
                            <header>
                                <HeaderComponent/>
                            </header>

                            <div className="container-page clear">
                                <Switch>

                                    {routes['routes_static'].map((prop, key) => {
                                        if(!prop.public){
                                            if(this.state.user_logged_in){
                                                return (
                                                    <Route
                                                        path={prop.path}
                                                        component={prop.component}
                                                        key={key}
                                                    />
                                                );
                                            }
                                        }else{
                                            return (
                                                <Route
                                                    path={prop.path}
                                                    component={prop.component}
                                                    key={key}
                                                />
                                            );
                                        }
                                        
                                    })}

                                    <Route render={() => <NotFoundComponent/>}/>

                                </Switch>
                            </div>
                            <div className="col s12 nopadd" id="footer">
                                <FooterComponent/>
                            </div>

                        </div>
                    </Router>
                </div>
            </div>
        );
    }
}


function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        ReduxLoggedInAction: ReduxLoggedInAction,
        ReduxCurrUserInfoAction
    }, dispatch)
}

function mapStateToProps(state) {
    return {
        currentUserInfo: state.currentUserInfo,
        currentRouteReducer: state.currentRouteReducer,
    }
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(IndexWrapperComponent));
