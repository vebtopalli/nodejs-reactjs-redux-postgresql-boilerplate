import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import { Field, formInputData, formValidation } from 'reactjs-input-validator';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import axios from 'axios';

import ReduxCurrentRouteAction from 'config/redux/actions/currentRouteAction';

class UpdateUserComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            info:'',
            email:'',
            data:{},
            disabled:true,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount(){
        axios.get('/api/user')
        .then((results)=>{
            if(results){
                const user=results.data.results;
                const data={
                    full_name:{
                        isRequired: true,
                        validation: true,
                        value: user.name
                    },
                    phone:{
                        isRequired: true,
                        validation: true,
                        value:user.phone
                    },
                    address_1:{
                        isRequired: true,
                        validation: true,
                        value:user.address_1
                    },
                    address_2:{
                        isRequired: true,
                        validation: true,
                        value:user.address_2
                    },
                    city:{
                        isRequired: true,
                        validation: true,
                        value:user.city
                    },
                    phone:{
                        isRequired: true,
                        validation: true,
                        value:user.phone
                    },
                    postal_code:{
                        isRequired: true,
                        validation: true,
                        value:user.postal_code
                    },
                    country:{
                        isRequired: true,
                        validation: true,
                        value:user.country
                    }
                }
                console.log(user.email);
                this.setState({
                    data,
                    email:user.email,
                    disabled:false,
                })
            }
        })
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
          
            axios.put('/api/user',data).then((res)=>{
                if(res.data){
                    window.location.href='/?information=Profile Updated Succesfully';
                }
            }).catch((err)=>{
                console.log(err);
                this.setState({
                    info:(err.response.data.message)
                })
            })

        } else {
          this.setState({ callAPI: true, shouldValidateInputs: !isFormValid });
        }
      }

    render() {
        const {email,data,disabled}=this.state;
        console.log(email);
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
                                            <input type="text" value={email} disabled/>
                                            <Field
                                                validator="contains" 
                                                required
                                                name="full_name" 
                                                placeholder={"Full Name"}
                                                minLength={3}
                                                onChange={this.handleChange}
                                                value={data.full_name}
                                                shouldValidateInputs={this.state.shouldValidateInputs}
                                                disabled={this.state.disabled}
                                            />
                                            <Field
                                                validator="contains" 
                                                required
                                                name="address_1" 
                                                minLength={3}
                                                placeholder={"Address 1"}
                                                onChange={this.handleChange}
                                                value={data.address_1}
                                                shouldValidateInputs={this.state.shouldValidateInputs}
                                                disabled={disabled}
                                            />
                                            <Field
                                                validator="contains" 
                                                name="address_2" 
                                                placeholder={"Address 2"}
                                                onChange={this.handleChange}
                                                value={data.address_2}
                                                shouldValidateInputs={this.state.shouldValidateInputs}
                                                disabled={disabled}
                                            />
                                            <Field
                                                required
                                                placeholder={"City"}
                                                minLength={3}
                                                name="city"
                                                onChange={this.handleChange}
                                                value={data.city}
                                                shouldValidateInputs={this.state.shouldValidateInputs}
                                                disabled={disabled}
                                            />
                                            <Field
                                                required
                                                placeholder={"Country"}
                                                minLength={3}
                                                name="country"
                                                onChange={this.handleChange}
                                                value={data.country}
                                                shouldValidateInputs={this.state.shouldValidateInputs}
                                                disabled={disabled}
                                            />
                                            <Field
                                                validator="isPostalCode" 
                                                locale="US" 
                                                required
                                                minLength={3}
                                                name="postal_code" 
                                                placeholder={"ZIP"}
                                                onChange={this.handleChange}
                                                value={data.postal_code}
                                                shouldValidateInputs={this.state.shouldValidateInputs}
                                                disabled={disabled}
                                            />
                                            <Field
                                                validator="contains" 
                                                required
                                                name="phone" 
                                                minLength={3}
                                                placeholder={"Phone"}
                                                onChange={this.handleChange}
                                                value={data.phone}
                                                shouldValidateInputs={this.state.shouldValidateInputs}
                                                disabled={disabled}
                                            />
                                            <Field
                                                 validator="isAlphanumeric" 
                                                 name="old_password" 
                                                 type="password" 
                                                 placeholder={"Old Password"}
                                                 onChange={this.handleChange}
                                                 value={data.old_password}
                                                 disabled={disabled}
                                            />
                                            <Field
                                                 validator="isAlphanumeric" 
                                                 name="password" 
                                                 type="password" 
                                                 placeholder={"New Password"}
                                                 onChange={this.handleChange}
                                                 value={data.password}
                                                 disabled={disabled}
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

export default withRouter(connect(mapStateToProps,matchDispatchToProps)(UpdateUserComponent));