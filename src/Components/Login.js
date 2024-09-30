import React from "react";
import './Login.css';
import { Link, Navigate  } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import axios from "axios";

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:"",
            pass:"",
            redirectToIndex: false,
            user_id:""
        }
    }

    inputSet=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    login=(e)=>{
        e.preventDefault();
        var data={
            uname:this.state.username,
            pass:this.state.pass
        }
        axios.post("http://localhost/digital_miniloan_backend/ulogin.php",data).then(response=>{
            if(response.data.status=="success"){
                alert('success');
                this.setState({
                     redirectToIndex: true,
                     user_id:response.data.user_id
                });
            }
            else{
                alert('failed');
            }
        })
    }

    render(){
        if(this.state.redirectToIndex){
            return <Navigate to="/index" state={{user_id:this.state.user_id}}/>;
        }
        return(
            <div>
            <div className="login-container">
                <h1>LOGIN PAGE</h1>
                <form>
                    <label>Username</label>
                    <input type="text" name="username" onChange={this.inputSet}/><br/>
                    <label>Password</label>
                    <input type="text" name="pass" onChange={this.inputSet}/><br/>
                    <button onClick={this.login}>Login</button> 
                </form>
                <Link to="/Signup">
                    <label>Signup</label>
                </Link>
                <a href="/" >Home</a>
            </div>

            <p>{this.state.username}</p>
            <p>{this.state.pass}</p>

            </div>
        )
    }
}

export default Login;