import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

function Sidebar1() {
  return (
    
            <div className='col-auto min-vh-100 bg-dark'>
                <ul className='nav flex-column p-3'>
                    <li className='nav-item mb-2'>
                        <Link to='/index' className='nav-link px-2'>
                            <i className='bi-house'/>
                            <span className='ms-1 d-none d-sm-inline'>Home</span>
                        </Link>
                    </li>
                    <li className='nav-item mb-2'>
                        <a className='nav-link px-2'>
                            <i className='bi bi-credit-card'/>
                            <span className='ms-1 d-none d-sm-inline'>Loan Request</span>
                        </a>
                    </li>
                    <li className='nav-item mb-2'>
                        <a className='nav-link px-2'>
                            <i className='bi-table'/>
                            <span className='ms-1 d-none d-sm-inline'>Home</span>
                        </a>
                    </li>
                </ul>
            </div>
  )
}

export default Sidebar1;