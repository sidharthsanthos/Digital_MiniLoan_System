import React from "react";
import './Login.css';
import { Link, Navigate  } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import axios from "axios";
import { Spinner,Modal } from "react-bootstrap";

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:"",
            pass:"",
            redirectToIndex: false,
            user_id:"",
            loading:false,
            user_type:""
        }
    }

    inputSet=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    login=(e)=>{
        e.preventDefault();
        this.setState({loading:true});
        var data={
            uname:this.state.username,
            pass:this.state.pass
        }
        axios.post("http://localhost/digital_miniloan_backend/ulogin.php",data).then(response=>{
            if(response.data.status=="success"){
                alert("Success");
                this.setState({
                     redirectToIndex: true,
                     user_id:response.data.user_id,
                     user_type:response.data.user_type
                });
                const fuid=response.data.user_id;
                localStorage.setItem('user_id',fuid);
            }
            else{
                alert('Please ensure the Username and Password entered are correct and try again');
            }
        }).catch(error=>{
            if(error.message==="Network Error"){
                alert("Network Error");
            }else{
                alert("Error");
            }
        }).finally(()=>{
            this.setState({loading:false});
        })
    }

    render(){
        const {loading}=this.state;
        if(this.state.user_type=="user"){
            if(this.state.redirectToIndex){
                return <Navigate to="/index" state={{user_id:this.state.user_id}}/>;
            }    
        }else if(this.state.user_type=="admin"){
            if(this.state.redirectToIndex){
                return <Navigate to="/aindex" state={{user_id:this.state.user_id}}/>;
            }
        }
        
        return(
            <div className='main-container'>
                {
                    loading&&(
                        <div className="loading-overlay">
                            <h1>Signing In.....</h1><br/>
                            <div className="spiner">
                            <Spinner animation="border" role="status" variant="success">
                                <span className="sr-only"></span>
                            </Spinner>
                            </div>
                        </div>
                    )
                }
            <div className="login-container">
                <h1 style={{fontFamily:"Times New Roman,Times,serif"}}>LOGIN</h1>
                <form>
                    <label>Username</label>
                    <input type="text" name="username" onChange={this.inputSet}/><br/>
                    <label>Password</label>
                    <input type="password" name="pass" onChange={this.inputSet}/><br/>
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