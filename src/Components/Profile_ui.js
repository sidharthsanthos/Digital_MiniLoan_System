import axios from "axios";
import React from "react";
import './Profile.css';

class Profile_ui extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user_id:null,
            details:null
        }
    }

    componentDidMount(){
        const uid=localStorage.getItem('user_id');
        this.setState({user_id:uid},()=>{
            this.fetchDetails();
        });
    }

    fetchDetails=()=>{
        var data={
            uid:this.state.user_id
        }
        axios.post("http://localhost/digital_miniloan_backend/fetch_user_details.php",data).then(response=>{
            if(response.data!=="zero"){
                this.setState({details:response.data});
            }else{
                alert("Not retrieved");
            }
        })
    }

    render() {
        const { details } = this.state;

        return (
            <>
                <h1 className="admin-title">User Profile</h1>
                
                {details ? (
                    <>
                        <div className="detail-section">
                            <h2 className="section-title">Account Information</h2>
                            <div className="detail-grid">
                                <div className="detail-row">
                                    <span className="detail-label">User ID</span>
                                    <span className="detail-value">{details.user_id}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Username</span>
                                    <span className="detail-value">{details.username}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Account Number</span>
                                    <span className="detail-value">{details.acct_no}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">User Type</span>
                                    <span className="detail-value">{details.user_type}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Phone Number</span>
                                    <span className="detail-value">{details.phone_number}</span>
                                </div>
                            </div>
                        </div>

                        <div className="detail-section">
                            <h2 className="section-title">Personal Details</h2>
                            <div className="detail-grid">
                                <div className="detail-row">
                                    <span className="detail-label">Full Name</span>
                                    <span className="detail-value">{details.name?details.name:"Link Bank Account to fill these details"}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Date of Birth</span>
                                    <span className="detail-value">{details.date_of_birth?details.date_of_birth:"Link Bank Account to fill these details"}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Gender</span>
                                    <span className="detail-value">{details.gender?details.gender:"Link Bank Account to fill these details"}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Email</span>
                                    <span className="detail-value">{details.email?details.email:"Link Bank Account to fill these details"}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Nationality</span>
                                    <span className="detail-value">{details.nationality?details.nationality:"Link Bank Account to fill these details"}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">State</span>
                                    <span className="detail-value">{details.state?details.state:"Link Bank Account to fill these details"}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">District</span>
                                    <span className="detail-value">{details.district?details.district:"Link Bank Account to fill these details"}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Address</span>
                                    <span className="detail-value">{details.address?details.address:"Link Bank Account to fill these details"}</span>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="loading-container">
                        <p>Loading details...</p>
                    </div>
                )}
            </>
        );
    }
}

export default Profile_ui;