import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {createBrowserHistory} from "history";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import DashboardHeader from './partial_dashboard/dashboard_header';

import routes from './dashboard_routes';

class DashboardComponent extends Component {
    constructor(props){
        super(props);
        this.state={
        }
    }
    render() {
        return (
            <div className="container-fluid">
                <Router>
                    <DashboardHeader route_dash={routes}/>

                    <Switch>
                        {routes.map((prop, key) => {
                            return (
                                <Route
                                    path={prop.path}
                                    component={prop.component}
                                    key={key}
                                />
                            );
                        })}

                    </Switch>
                </Router>
            </div>
        );
    }
}
export default DashboardComponent;

