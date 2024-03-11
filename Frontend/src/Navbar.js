import React from 'react'
import { FaUserCircle} from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header class="sm-nav text-light fw-bold d-flex border px-3 justify-content-between align-items-center shadow" style={{'height':'56px'}}>
        <h5 className='fw-bold'>
            <Link to={'/'}>Smart Soil Analysis System</Link>
        </h5>
        <div>
            <ul class="d-flex align-items-center mt-2" style={{'listStyle':'none'}}>
                <li class="px-2">
                    <Link to={'/settings'} >settings</Link>
                </li>
                <li className='d-flex align-items-center'>
                    <span>
                        <FaUserCircle size={18}/>
                    </span>
                    <span>Nyasha</span>
                </li>
                <li class="px-2">
                    <button class="btn btn-light">Logout</button>
                </li>
            </ul>
        </div>
    </header>
  )
}
