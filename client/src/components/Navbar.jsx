import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext';

const Navbar = () => {
  
  const  {currentUser,logout}= useContext(AuthContext);

  return (
    <div className='navbar'>
        <div className='container'>
            <div className='logo'>
              <Link to="/"><img src="" alt="" /></Link>
            </div>
            <div className='links'>
              <Link className='link' to="/?category=happy"><h6>HAPPY</h6></Link>
              <Link className='link' to="/?category=memories"><h6>MEMORIES</h6></Link>
              <Link className='link' to="/?category=firstlove"><h6>FIRST LOVE</h6></Link>
              <Link className='link' to="/?category=heartbreak"><h6>HEARTBREAK</h6></Link>
              <Link className='link' to="/?category=friends"><h6>FRIENDS</h6></Link>
              <span>{currentUser?.username}</span>
              {currentUser ?<span onClick={logout}>Logout</span>:<Link className='link' to="/login">Login</Link>}
              <Link className='write' to="/write"><h6>Write</h6></Link>
              </div>
        </div>
    </div>
    
  )
}

export default Navbar