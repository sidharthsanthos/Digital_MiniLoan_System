import React from 'react';
import axios from 'axios';
import './bank.css';

class Bank extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name1:"",
            gender:"",
            phno:"",
            dob:"",
            nation:"",
            state1:"",
            district:"",
            address:"",
            uid:"",
            email:""
        }
    }

    inputSet=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    register=(e)=>{
        e.preventDefault();
        var data={
            name:this.state.name1,
            gender:this.state.gender,
            phno:this.state.phno,
            email:this.state.email,
            dob:this.state.dob,
            nation:this.state.nation,
            state:this.state.state1,
            district:this.state.district,
            address:this.state.address,
            uid:this.state.uid
        };
        axios.post("http://localhost/digital_miniloan_backend/bank_insert.php",data).then(response=>{
            if(response.data=="success"){
                alert("saved");
                this.setState({
                    name1:"",
                    gender:"",
                    phno:"",
                    email:"",
                    dob:"",
                    nation:"",
                    state1:"",
                    district:"",
                    address:"",
                    uid:""
                })
            }else{
                alert(response.data);
            }
        })
    }

    render(){
        return(
            <div className='bank-form'>
                <h1>CREATE A BANK ACCOUNT</h1>
                <form>
                    <label>Full Name</label>
                    <input type="text" name="name1" onChange={this.inputSet} value={this.state.name1} /><br/>

                    <label>Gender</label>
                    <input type="text" name="gender" onChange={this.inputSet} value={this.state.gender}/><br/>

                    <label>Phone Number</label>
                    <input type="text" name="phno" onChange={this.inputSet} value={this.state.phno}/><br/>

                    <label>Email</label>
                    <input type="email" name="email" onChange={this.inputSet} value={this.state.email}/><br/>

                    <label>Date of Birth</label>
                    <input type="date" name="dob" onChange={this.inputSet} value={this.state.dob}/><br/>
                    
                    <label>Nationality</label>
                    <input type="text" name="nation" onChange={this.inputSet} value={this.state.nation}/><br/>
                    
                    <label>State</label>
                    <input type="text" name="state1" onChange={this.inputSet} value={this.state.state1}/><br/>
                    
                    <label>District</label>
                    <input type="text" name="district" onChange={this.inputSet} value={this.state.district}/><br/>
                    
                    <label>Address</label>
                    <input type="text" name="address" onChange={this.inputSet} value={this.state.address}/><br/>

                    <label>Aadhar Number</label>
                    <input type="text" name="uid" onChange={this.inputSet} minLength="16" maxLength="16" value={this.state.uid}/><br/>

                    <button onClick={this.register}>Submit</button>

                    {/* <p>{this.state.name1}</p>
                    <p>{this.state.gender}</p>
                    <p>{this.state.phno}</p>
                    <p>{this.state.dob}</p>
                    <p>{this.state.nation}</p>
                    <p>{this.state.state1}</p>
                    <p>{this.state.district}</p>
                    <p>{this.state.address}</p>
                    <p>{this.state.uid}</p> */}
                </form>
                <br />
                <a href="/" className="back-link">HOME</a>
            </div>
        )
    }
}

export default Bank;