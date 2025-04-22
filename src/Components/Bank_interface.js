import axios from "axios";
import React from "react";
import { useLocation, Link } from "react-router-dom";
import './Navbar.css';

class Bank_interface extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: null,
            username: ""
        };
    }

    componentDidMount() {
        const { state } = this.props.location;
        if (state && state.user_id) {
            this.setState({ user_id: state.user_id }, () => {
                this.fetchUser(state.user_id);
            });
        }
    }

    Navbar = () => {
        return (
            <nav className="navbar">
                <div className="title">
                    <Link to='/bank_interface'>BANKING INTERFACE</Link>
                </div>
                <ul className="nav-items">
                    <li className="nav-item"><Link to="/index" state={{ user_id: this.state.user_id }}>HOME</Link></li>
                    <li className="nav-item"><Link to="/link_bank" state={{ user_id: this.state.user_id }}>Link Bank Account</Link></li>
                </ul>
            </nav>
        );
    };

    Sidebar = () => {
        return (
            <div className="sidebar">
                <ul>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/transactions">Transactions</Link></li>
                    <li><Link to="/settings">Settings</Link></li>
                    <li><Link to="/support">Support</Link></li>
                </ul>
            </div>
        );
    };

    fetchUser = (user_id) => {
        var data = {
            uid: user_id
        };
        axios.post("http://localhost/digital_miniloan_backend/uname.php", data).then(response => {
            if (response.data.status === "success") {
                this.setState({ username: response.data.uname });
            } else {
                this.setState({ username: "Name not Found" });
            }
        });
    };

    render() {
        return (
            <div className="bank-interface">
                {this.Navbar()}
                <div className="content">
                    {this.Sidebar()}
                    <div className="main-content">
                        {/* Your main content goes here */}
                        <h2>Welcome, {this.state.username}</h2>
                        <p>This is the banking interface.</p>
                    </div>
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

export default withLocation(Bank_interface);
