import React from "react";
import './Login.css';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import axios from "axios";

class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:"",
            phno:"",
            pass:""
        }
    }

    inputSet=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    register=(e)=>{
        e.preventDefault();

        if(this.state.username!==""&&this.state.phno!==""&&this.state.pass!==""){
            var data={
                uname:this.state.username,
                phno:this.state.phno,
                pass:this.state.pass
            };
            axios.post("http://localhost/digital_miniloan_backend/user_reg.php",data).then(response=>{
                if(response.data=="success"){
                    alert("account created successfully");
                }else if(response.data=="user already exists"){
                    alert("user already exists");
                }
                else{
                    alert(response.data);
                }
            })
        }else{
            alert("Please fill in all fields before submitting the form")
        }
        
    }

    render(){
        return(
            <div>
            <div className="login-container">
                <h1>CREATE ACCOUNT</h1>
                <form>
                    <label>Username</label>
                    <input type="text" name="username" onChange={this.inputSet}/><br/>
                    <label>Phone Number</label>
                    <input type="number" name="phno" onChange={this.inputSet}/><br/>
                    <label>Password</label>
                    <input type="password" name="pass" onChange={this.inputSet}/><br/>
                    <button onClick={this.register}>SIGNUP</button>
                </form>
                <Link to="/login">
                    <label>Login</label>
                </Link>
                <a href="/" >Home</a>
            </div>
            

            <p>{this.state.username}</p>
            <p>{this.state.pass}</p>
            <p>{this.state.phno}</p>
            </div>
        )
    }
}

export default Signup;