import axios from "axios";
import React from "react";
import { Navigate } from "react-router-dom";

class Acct_verify extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user_id:null,
            email:null,
            otp:"",
            is_verified:false
        }
    }

    componentDidMount(){
        const uid=localStorage.getItem('user_id');
        const ema=localStorage.getItem('email');
        this.setState({user_id:uid,email:ema});
    }

    inputSet=(e)=>{
        this.setState({ [e.target.name]:e.target.value })
    }

    checkOTP=(e)=>{
        e.preventDefault();
        var data={
            user_id:this.state.user_id,
            email:this.state.email,
            otp:this.state.otp
        }
        axios.post("http://localhost/digital_miniloan_backend/otpverify.php",data).then(respone=>{
            if(respone.data.status==="success"){
                alert('otp matched and account linked');
                this.setState({is_verified:true});
            }
            else if(respone.data.status==="failed"){
                alert('otp didnt matched');
            }
            else{
                const mess=respone.data.status;
                alert(mess);
            }
        });
    }

    render(){
        if(this.state.is_verified){
            return(
                <Navigate to="/bank_interface" />
            )
        }
        return(
            <div>
                <label>Enter OTP</label>
                <input type="number" name="otp" onChange={this.inputSet}/>
                <button onClick={this.checkOTP}>Submit</button>
            </div>
        )
    }
}

export default Acct_verify;