import axios from "axios";
import React from "react";
import { useLocation, Link, Navigate } from 'react-router-dom';
import './linacc.css';

class Link_acct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: null,
            phno: "",
            is_user:true,
            acct_exist:false,
        };
    }

    componentDidMount() {
        const { state } = this.props.location;
        if (state && state.user_id) {
            this.setState({ user_id: state.user_id }, () => {
                console.log("User ID initialized:", this.state.user_id); // Debugging line
            });
        } else {
            this.setState({is_user:false})
        }
    }

    inputSet = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    verify = (e) => {
        e.preventDefault();
        console.log("User ID before request:", this.state.user_id); // Debugging line
        console.log("Phone Number:", this.state.phno); // Debugging line

        var data = {
            phno: this.state.phno,
            uid: this.state.user_id
        };

        axios.post("http://localhost/digital_miniloan_backend/pverify.php", data)
            .then(response => {
                if (response.data.status === "success") {
                    alert('Account Found');
                    const email=response.data.email;
                    this.setState(
                        {
                            acct_exist:true
                        }
                    );

                    localStorage.setItem(
                        'user_id',this.state.user_id
                    )

                    localStorage.setItem('email',email);

                } else if (response.data.status === "no records") {
                    alert("No matches Found");
                }else{
                    alert("error")
                }
            })
            .catch(error => {
                console.error("There was an error verifying the account!", error);
            });
    }

    render() {
        if(!this.state.is_user){
            return(
                <Navigate to='/login'></Navigate>
            )
        }
        else if(this.state.acct_exist){
            return(
                <Navigate to='/acct_verify'></Navigate>
            )
        }
        const { state } = this.props.location;
        return (
            <div className="container">
                <div className="form-container">
                <form>
                    <label>Phone Number</label><br />
                    <input type="number" name="phno" onChange={this.inputSet} /><br />
                    <button onClick={this.verify}>Verify</button>
                </form>
                <p style={{ fontSize: "10px" }}>
                    {this.state.phno} Enter the Phone Number Linked to Your Bank Account
                </p>
                <Link to="/bank">Create a Bank Account?</Link>
                </div>
            </div>
        );
    }
}

function withLocation(Component) {
    return (props) => {
        const location = useLocation();
        return <Component {...props} location={location} />;
    };
}

export default withLocation(Link_acct);
