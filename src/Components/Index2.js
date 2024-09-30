import axios from "axios";
import React from "react";
import { useLocation } from 'react-router-dom';
import { Link,Navigate } from 'react-router-dom';
import ExpenseTracker from "./Expense";
import './Navbar.css';

class Index2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user_id: null,
            user_name: ""
        };
    }

    componentDidMount() {
        const { state } = this.props.location;
        if (state && state.user_id) {
            this.setState({ user_id: state.user_id }, () => {
                this.fetchUsername(state.user_id);
            });
        }
    }

    

    fetchUsername = (user_id) => {
        var data = {
            uid: user_id
        };
        axios.post("http://localhost/digital_miniloan_backend/uname.php", data)
            .then(response => {
                if (response.data.status === "success") {
                    this.setState({ user_name: response.data.uname });
                } else {
                    console.log('Failed to retrieve user name');
                }
            })
            .catch(error => {
                console.error("There was an error fetching the user's name!", error);
            });
    }

    Navbar2 = () => {
        return (
          <nav className="navbar">
            <div className="title">
              <Link to="/">DIGITAL MINILOAN</Link>
            </div>
            <ul className="nav-items">
              <li className="nav-item"><a href='#'>Home</a></li>
              <li className="nav-item"><Link to="/loan_request" state={{user_id:this.state.user_id}}>Loan Request</Link></li>
              <li className="nav-item"><Link to="/bank_interface" state={{user_id:this.state.user_id}}>Bank</Link></li>
              <li className="nav-item" style={{textTransform:"uppercase",cursor:"pointer"}}><a>{this.state.user_name}</a></li>
              <div className="login-button">
              <Link to="/logout">
                <button className="btn-login">Logout</button>
              </Link>
            </div>
            </ul>
          </nav>
        );
      };

    render() {
        const { state } = this.props.location;
        return (
            <div>
                {this.Navbar2()}
                <p>Welcome User ID: {state && state.user_id ? state.user_id : "Not Available"}<br />
                Name: {this.state.user_name ? this.state.user_name : "Loading..."}</p>
                <ExpenseTracker/>
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

export default withLocation(Index2);
