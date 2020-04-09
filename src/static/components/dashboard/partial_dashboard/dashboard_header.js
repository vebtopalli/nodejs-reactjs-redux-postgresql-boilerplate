import React, { PureComponent } from 'react'
import {NavLink} from 'react-router-dom';

import M from 'materialize-css';

class DashboardHeader extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            
        }
        this.navSlide=this.navSlide.bind(this);
    }

    componentDidMount(){
        this.navSlide();
    }
    navSlide(){
        var elems = document.querySelectorAll('.sidenav');
        const options={
          draggable:true,
        }
        var instances = M.Sidenav.init(elems, options);
    }
    render() {
        var rows_menu=[];
        this.props.route_dash.map((value,index)=>{
            if(value.route_name){
                rows_menu.push(
                    <li key={index.toString()}><NavLink onClick={()=>{
                        this.navSlide('close');
                    }} to={value.path}>{value.route_name}</NavLink></li>
                ) 
            }   
        })
        return (
            <div>
                <ul id="slide-out" className="sidenav">
                    <li>
                        <div className="user-view">
                            <a href="#name"><span className="white-text name">John Doe</span></a>
                            <a href="#email"><span className="white-text email">jdandturk@gmail.com</span></a>
                        </div>
                    </li>
                    {rows_menu}
                </ul>
                <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
            </div>
        )
    }
}

export default DashboardHeader;