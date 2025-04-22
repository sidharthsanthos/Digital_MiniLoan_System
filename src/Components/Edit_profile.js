import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import './eprofile.css';

class Edit_profile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user_id:null,
            username:"",
            phone_number:"",
            acct_no:"",
            details:null,
            dup_uname:"",
            dup_phno:""
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
                    details:response.data,
                    username:response.data.username,
                    phone_number:response.data.phone_number,
                    dup_uname:response.data.username,
                    dup_phno:response.data.phone_number
                });
                if(response.data.acct_no===null){
                    return;
                }else{
                    this.setState({acct_no:response.data.acct_no});
                }
            }else{
                alert("Not retrieved");
            }
        })
    }

    update_account=()=>{
        const {username,dup_uname,phone_number,dup_phno}=this.state;

        if(username!==dup_uname&&phone_number!==dup_phno){
            var data={
                username:this.state.username,
                phone_number:this.state.phone_number,
                uid:this.state.user_id
            }
            axios.post("http://localhost/digital_miniloan_backend/update_user.php",data).then(response=>{
                if(response.data==="success"){
                    toast.success("Updated Successfully");
                    this.fetchDetails();
                }else if(response.data==="failed"){
                    toast.error("Failed");
                }else if(response.data==="already exists"){
                    toast.warning("User Already Exists");
                }else{
                    alert(response.data);
                }
            })
        }else if(username===dup_uname&&phone_number!==dup_phno){
            var data={
                username:"",
                phone_number:this.state.phone_number,
                uid:this.state.user_id
            }
            axios.post("http://localhost/digital_miniloan_backend/update_user.php",data).then(response=>{
                if(response.data==="success"){
                    toast.success("Updated Successfully");
                    this.fetchDetails();
                }else if(response.data==="failed"){
                    toast.error("Failed");
                }else if(response.data==="already exists"){
                    toast.warning("User Already Exists");
                }else{
                    alert(response.data);
                }
            })
        }else if(username!==dup_uname&&phone_number===dup_phno){
            var data={
                username:username,
                phone_number:"",
                uid:this.state.user_id
            }
            axios.post("http://localhost/digital_miniloan_backend/update_user.php",data).then(response=>{
                if(response.data==="success"){
                    toast.success("Updated Successfully");
                    this.fetchDetails();
                }else if(response.data==="failed"){
                    toast.error("Failed");
                }else if(response.data==="already exists"){
                    toast.warning("User Already Exists");
                }else{
                    alert(response.data);
                }});
        }
        
    }

    render() {
        return (
            <div className="profile-edit-container">
                <h1 className="admin-title">Edit Profile</h1>
                <div className="edit-form-wrapper">
                    <form className="edit-form">
                        <div className="form-group">
                            <label htmlFor="user_id" className="form-label">User ID</label>
                            <input 
                                type="text" 
                                id="user_id"
                                name="user_id" 
                                value={this.state.user_id} 
                                readOnly 
                                className="form-input readonly-input"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input 
                                type="text" 
                                id="username"
                                name="username" 
                                value={this.state.username} 
                                onChange={this.inputSet}
                                className="form-input"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="phone_number" className="form-label">Phone Number</label>
                            <input 
                                type="text" 
                                id="phone_number"
                                name="phone_number" 
                                value={this.state.phone_number} 
                                onChange={this.inputSet}
                                className="form-input"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="acct_no" className="form-label">Bank Account Number</label>
                            <input 
                                type="text" 
                                id="acct_no"
                                name="acct_no" 
                                value={this.state.acct_no || 'Link Bank Account to show acct no'} 
                                readOnly 
                                className="form-input readonly-input"
                            />
                        </div>
                        
                        <div className="form-actions">
                            <button 
                                type="button" 
                                onClick={this.update_account} 
                                className="update-button"
                            >
                                Update Account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Edit_profile;