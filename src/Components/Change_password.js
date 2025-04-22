import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import './cpass.css';

class Change_password extends React.Component{
    constructor(props){
        super(props);
        this.state={
            opass:"",
            npass:"",
            current:"",
            user_id:null,
            confirmPass:"",
            passwordError:""
        }
    }

    componentDidMount(){
        const uid=localStorage.getItem("user_id");
        this.setState({user_id:uid},()=>{
            this.fetchDetails();
        })
    }

    inputSet=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }

    fetchDetails=()=>{
        var data={
            uid:this.state.user_id
        }
        axios.post("http://localhost/digital_miniloan_backend/fetch_user_details.php",data).then(response=>{
            if(response.data!=="zero"){
                this.setState({
                    current:response.data.password
                });
            }
        })
    }

    password_change=()=>{
        const{opass,npass,confirmPass}=this.state;
        if (!opass) {
            this.setState({ passwordError: 'Current password is required' });
            return;
        }

        if (!npass) {
            this.setState({ passwordError: 'New password is required' });
            return;
        }

        if (npass !== confirmPass) {
            this.setState({ passwordError: 'New passwords do not match' });
            return;
        }

        if(this.state.opass===this.state.current){
            var data={
                uid:this.state.user_id,
                npass:this.state.npass
            }
            axios.post("http://localhost/digital_miniloan_backend/change_pass.php",data).then(response=>{
                if(response.data==="success"){
                    toast.success("Password Changed Successfully");
                }else if(response.data==="failed"){
                    toast.error("Password Updation Failed");
                }else{
                    alert(response.data);
                }
            })
        }else{
            this.setState({passwordError:"Current Password is not matching with existing password"})
        }
    }

    render() {
        return (
            <div className="change-password-container">
                <h1 className="page-title">Change Password</h1>
                <div className="password-form-wrapper">
                    <form className="password-form">
                        <div className="form-group">
                            <label htmlFor="opass" className="form-label">Current Password</label>
                            <input 
                                type="password" 
                                id="opass"
                                name="opass" 
                                className="form-input"
                                onChange={this.inputSet}
                                placeholder="Enter current password"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="npass" className="form-label">New Password</label>
                            <input 
                                type="password" 
                                id="npass"
                                name="npass" 
                                className="form-input"
                                onChange={this.inputSet}
                                placeholder="Enter new password"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="confirmPass" className="form-label">Confirm New Password</label>
                            <input 
                                type="password" 
                                id="confirmPass"
                                name="confirmPass" 
                                className="form-input"
                                onChange={this.inputSet}
                                placeholder="Confirm new password"
                            />
                        </div>

                        {this.state.passwordError && (
                            <div className="error-message">
                                {this.state.passwordError}
                            </div>
                        )}
                        
                        <div className="form-actions">
                            <button 
                                type="button" 
                                onClick={this.password_change} 
                                className="change-password-button"
                            >
                                Change Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Change_password;