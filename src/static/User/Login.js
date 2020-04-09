import React, { Component } from 'react';
import { Link,NavLink ,withRouter} from 'react-router-dom';
import { Field, formInputData, formValidation } from 'reactjs-input-validator';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import axios from 'axios';

import ReduxCurrentRouteAction from 'config/redux/actions/currentRouteAction';

class LoginComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            info:'',
            data:{}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event, inputValue, inputName, validationState, isRequired) {
      const value = (event && event.target.value) || inputValue;
      const { data } = this.state;
      data[inputName] = { value, validation: validationState, isRequired };
      this.setState({
        data,
      });
      // if you want access to your form data
      const formData = formInputData(this.state.data); // eslint-disable-line no-unused-vars
      // tells you if the entire form validation is true or false
      const isFormValid = formValidation(this.state.data); // eslint-disable-line no-unused-vars
    }

    handleSubmit(event) {
        event.preventDefault();
        const isFormValid = formValidation(this.state.data);
      
        if (isFormValid) {
          this.setState({ callAPI: true });
          const {data}=this.state;

          
            axios.post('/api/user/login',{
                username:data.email.value,
                password:data.password.value,
            }).then((res)=>{
                if(res.data){
                    window.location.href='/?information=Logged In Succesfully';
                }
            }).catch((err)=>{
                this.setState({
                    info:(err.response.data.message)
                })
            })

        } else {
          this.setState({ callAPI: true, shouldValidateInputs: !isFormValid });
        }
      }

    render() {
        return (
            <div>
                <section>
                    <div className="container">
                        <div>
                            <div className="col-md-12">
                                <div>
                                    <div className="content">
                                        <form onSubmit={this.handleSubmit.bind(this)}  className="col-sm-12">
                                            {this.state.info}
                                            <p>Sign In</p>
                                            <Field
                                                validator="isEmail" 
                                                required
                                                name="email" 
                                                placeholder={"Email"}
                                                onChange={this.handleChange}
                                                value={this.state.data.email}
                                                shouldValidateInputs={this.state.shouldValidateInputs}
                                            />
                                            <Field
                                                 validator="isAlphanumeric" 
                                                 required 
                                                 name="password" 
                                                 type="password" 
                                                 placeholder={"Password"}
                                                 onChange={this.handleChange}
                                                 value={this.state.data.password}
                                                 shouldValidateInputs={this.state.shouldValidateInputs}
                                             />
                                           <div className="col s12 center-align">
                                                <input type="submit" className="btn btn-default" value="submit" />
                                           </div>
                                        </form>
                                    </div>  
                                </div>  
                            </div>  
                        </div>
                    </div>
                </section>
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

export default withRouter(connect(mapStateToProps,matchDispatchToProps)(LoginComponent));