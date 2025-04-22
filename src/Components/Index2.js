import axios from "axios";
import React from "react";
import { useLocation } from 'react-router-dom';
import { Link, Navigate } from 'react-router-dom';
import ExpenseTracker from "./Expense";
import { toast } from "react-toastify";
import { Bell, X } from "react-bootstrap-icons";
import { Badge } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import './Navbar.css';

class Index2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: null,
            user_name: "",
            uid: null,
            showNotifications: false,
            Notifications: [],
            unreadCount: 0
        };
        this.toastShown = false;
    }

    componentDidMount() {
        const { state } = this.props.location;
        const uid = localStorage.getItem('user_id');
        this.setState({ uid: uid }, () => {
            this.fetchUsername(this.state.uid);
            this.fetchNotifications();
        });
        if (state && state.user_id) {
            this.setState({ user_id: state.user_id });
        }
    }

    fetchUsername = (user_id) => {
        var data = {
            uid: user_id
        };
        axios.post("http://localhost/digital_miniloan_backend/uname.php", data)
            .then(response => {
                if (response.data.status === "success") {
                    if (!this.toastShown) {
                        this.setState({ user_name: response.data.uname }, () => {
                            toast.success("Welcome " + response.data.uname);
                        });
                        this.toastShown = true;
                    } else {
                        this.setState({ user_name: response.data.uname });
                    }
                } else {
                    console.log('Failed to retrieve user name');
                }
            })
            .catch(error => {
                console.error("There was an error fetching the user's name!", error);
            });
    }

    fetchNotifications = () => {
        var data = {
            uid: this.state.uid
        };
        axios.post("http://localhost/digital_miniloan_backend/notifications.php", data).then(response => {
            if (response.data.status !== "failed") {
                this.setState({
                    Notifications: response.data,
                    unreadCount: response.data.filter(notif => !notif.read).length
                }, () => {
                    console.log(this.state.Notifications);
                });
            } else {
                this.setState({ Notifications: [], unreadCount: 0 });
            }
        });
    }

    toggleNotifications = () => {
        this.setState(prevState => ({ showNotifications: !prevState.showNotifications }));
    }

    markAsRead = (notificationId) => {
        this.setState(prevState => ({
            Notifications: prevState.Notifications.map(notif =>
                notif.id === notificationId ? { ...notif, read: true } : notif
            ),
            unreadCount: prevState.unreadCount - 1
        }));
        // Uncomment and implement the API call when backend is ready
        // axios.post("http://localhost/digital_miniloan_backend/mark_notification_read.php", { id: notificationId })
        //     .then(() => {
        //         this.fetchNotifications();
        //     });
    }

    Navbar2 = () => {
        return (
            <nav className="navbar">
                <div className="title">
                    <Link to="/">DIGITAL MINILOAN</Link>
                </div>
                <ul className="nav-items">
                    <li className="nav-item"><a href='#'>Home</a></li>
                    <li className="nav-item"><Link to="/loan_request" state={{ user_id: this.state.user_id }}>Loan Request</Link></li>
                    <li className="nav-item"><Link to="/bank_interface" state={{ user_id: this.state.user_id }}>Bank</Link></li>
                    <li className="nav-item" style={{ textTransform: "uppercase", cursor: "pointer" }}>
                        <Link to="/profile_interface">
                        {this.state.user_name}
                        </Link>
                    </li>
                    <li className="nav-item notifications-container" onClick={this.toggleNotifications} style={{ cursor: "pointer", position: "relative" }}>
                        <Bell size={24} color="yellow" />
                        {this.state.unreadCount > 0 && (
                            <Badge bg="danger" style={{ position: "absolute", top: "-8px", right: "-8px" }}>
                                +
                            </Badge>
                        )}
                        {this.render_notifications()}
                    </li>
                    <div className="login-button">
                        <Link to="/logout">
                            <button className="btn-login" onClick={() => localStorage.removeItem('user_id')}>Logout</button>
                        </Link>
                    </div>
                </ul>
            </nav>
        );
    };

    render_notifications = () => {
        if (!this.state.showNotifications) return null;
    
        return (
            <div className="notifications-container">
                <div className="notifications-popup">
                    <div className="notifications-header">
                        <h4>Notifications</h4>
                        <button onClick={this.toggleNotifications} className="close-btn">
                            <X size={16} />
                        </button>
                    </div>
                    <div className="notifications-content">
                        {this.state.Notifications.length === 0 ? (
                            <p className="no-notifications">No notifications</p>
                        ) : (
                            <ul className="notification-list">
                                {this.state.Notifications.map((notification) => (
                                    <li key={notification.id} className={`notification-item ${notification.read ? 'read' : 'unread'}`}>
                                        <p className="notification-message">{notification.message}</p>
                                        <small className="notification-timestamp">{new Date(notification.timestamp).toLocaleString()}</small>
                                        {/* {!notification.read && (
                                            <button
                                                onClick={() => this.markAsRead(notification.id)}
                                                className="mark-read-btn"
                                            >
                                                Mark as read
                                            </button>
                                        )} */}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    render() {
        const { state } = this.props.location;
        return (
            <div>
                {this.Navbar2()}
                {this.render_notifications()}
                <h1 className="admin-title">welcome {this.state.user_name}</h1>
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