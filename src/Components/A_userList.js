import React from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import './Loan.css'


class A_userList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user_id:null,
            users:[],
            noResults:false,
            all_users:[]
        }
    }

    componentDidMount(){
        const uid=localStorage.getItem("user_id");
        this.setState({user_id:uid},()=>{
            this.fetchData();
        });
    }

    inputset=(e)=>{
        const search_name=e.target.value.toLowerCase();
        this.setState({sname:search_name},()=>{
            this.searchUsers();
        });
    }

    searchUsers=()=>{
        const{sname,all_users}=this.state;

        if(sname==""){
            this.setState({users:all_users});
            return;
        }

        const filteredUsers=all_users.filter((user)=>
            (user.username && user.username.toLowerCase().includes(sname))||
            (user.phone_number && user.phone_number.toString().includes(sname))
        );

        this.setState({users:filteredUsers});
    }

    fetchData=()=>{
        axios.post("http://localhost/digital_miniloan_backend/userdata.php").then(response=>{
            if(response.data!=="zero"){
                this.setState({users:response.data,all_users:response.data});
            }else{
                this.setState({noResults:true});
            }
        })
    }

    render(){
        const {users}=this.state;
        return(
            <div>
                <h1 className="admin-title">
                    Users List
                </h1><br/>

                <div className='search-bar'>
                    <label>Search Bar</label>
                    <input type='text' name='sname' onChange={this.inputset} placeholder='Enter Name or Phone Number'/>
                </div><br/>

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Username</th>
                            <th>Acct No</th>
                            <th>User Type</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user)=>(
                            <tr>
                                <td>{user.user_id}</td>
                                <td>{user.username}</td>
                                <td>{user.acct_no}</td>
                                <td>{user.user_type}</td>
                                <td>{user.phone_number}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default A_userList;