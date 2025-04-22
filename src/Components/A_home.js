import axios from "axios";
import React from "react";
import './A_home.css';

class A_home extends React.Component{

    constructor(props){
        super(props);
        this.state={
            pcount:null,
            acount:null,
            rcount:null,
            user_id:null,
            irate:null,
            cscore:null
        }
    }


    componentDidMount(){
        const uid=localStorage.getItem("user_id");
        this.setState({user_id:uid});
        this.fetch_status_count();
        this.fetch_current_setting();
    }

    fetch_current_setting=()=>{
      axios.post("http://localhost/digital_miniloan_backend/current_settings.php").then(response=>{
        const intrest=response.data.irate;
        const credit=response.data.credit;

        this.setState({
          irate:intrest,
          cscore:credit
        })
      })
    }

    fetch_status_count=()=>{
        axios.post("http://localhost/digital_miniloan_backend/a_ldetail.php").then(response=>{
            const pc=response.data.pending;
            const ac=response.data.approved;
            const rc=response.data.repaid;

            this.setState({
                pcount:pc,
                acount:ac,
                rcount:rc
            });
        });
    }

    CurrentSettings=({ setActiveComponent })=>{
      return (
          <div className="current-settings">
              <h3>Current System Settings</h3>
              <div>
                  <span>Interest Rate:</span><h3>{this.state.irate}</h3>
                  <span>Credit Score:</span><h3>{this.state.cscore}</h3>
                  <span>Interest Grace Period:</span><h3>10 days</h3>
                  <button onClick={() => setActiveComponent("Loan_settings")}>Change</button>
              </div>
          </div>
      );
  }
  

    render() {
        return (
          <div className="admin-dashboard">
            <h1 className="admin-title">
              ADMIN DASHBOARD
            </h1>
            
            <ul>
              <li>
              <div className="status-container">
              <div className="dashboard-description">
                <p>Here's an overview of your current loan status. 
                   This dashboard provides a quick snapshot of pending, 
                   approved, and repaid loan applications.</p>
              </div>
              
              <div className="status-boxes">
                <div className="status-box pending">
                  <h2>Pending</h2>
                  <p className="count">{this.state.pcount}</p>
                </div>
                
                <div className="status-box approved">
                  <h2>Approved</h2>
                  <p className="count">{this.state.acount}</p>
                </div>
                
                <div className="status-box repaid">
                  <h2>Repaid</h2>
                  <p className="count">{this.state.rcount}</p>
                </div>
              </div>
            </div>
              </li>

              <li>
              <div className="system-settings-container">
              <h3 className="system-settings-title">Current System Settings</h3>
              <div className="system-settings-content">
                <div className="system-settings-item">
                  <span>Interest Rate:</span>
                  <h3>{this.state.irate}%</h3>
                </div>
                <div className="system-settings-item">
                  <span>Credit Score:</span>
                  <h3>{this.state.cscore}</h3>
                </div>
                <div className="system-settings-item">
                  <span>Interest Grace Period:</span>
                  <h3>10 days</h3>
                </div>
              </div>
              <p className="system-settings-description">
                Go to Loan Settings to modify these parameters
              </p>
            </div>
              </li>
            </ul>
          </div>
        );
      }
}

export default A_home;