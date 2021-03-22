import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/profile.css'
import axios from "axios";
import {volunteerPostApiUrl} from "../../config"


class profile extends Component {
    state = { 
        name:'',
        email:'',
        phone:'',
     }

    fetchProducts = async() =>{
        try{
            const res = await axios.get(`${volunteerPostApiUrl}/1`)
            console.log(res);
            this.setState({
                name:res.data.Item.name,
                email:res.data.Item.email,
                phone:res.data.Item.phone
            });
        } catch(e){
            console.log("error occur :", e);
        }

    }

    componentDidMount = () => {
        this.fetchProducts();
    }
    render() { 
        return(
            <section className="auth-wrapper">

            <section className="auth-inner">

                <section className="container">
                    <h3 className="userinfo">User Profile :)</h3>
                    <p className="userinfo">Name :  {this.state.name}</p>
                    <p className="userinfo">Email : {this.state.email}</p>
                    <p className="userinfo">Phone : {this.state.phone}</p>
                    
                    <Link to={{pathname:"/"}}>Back </Link>
                </section>

            </section>

        </section>
        );
      
    }
}
 
export default profile;