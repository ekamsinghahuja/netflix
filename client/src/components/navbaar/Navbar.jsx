import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile_img from '../../assets/profile_img.png'
import caret_icons from '../../assets/caret_icon.svg'

const Navbar = () => {
  return (
    <div className='Navbar'>
        <div className='navbar-left'>
            <img src={logo} alt="" />
            <ul>
                <li>Home</li>
                <li>Series</li>
                <li>Movie</li>
                <li>New and Popular</li>
                <li>My lists</li>
                <li>Browse by Language</li>
            </ul>
        </div>
        <div className='navbar-right'>
            <img src={search_icon} alt="" className='icons'/>
            <p>children</p>
            <img src={bell_icon} alt="" className="icons" />
            <div className="navbar-profile">
                <img src={profile_img} className="profile" />
                <img src={caret_icons} alt="" />
                <div className="drop-down">
                    <p>sign out</p>

                </div>
            </div>
        </div>

      
    </div>
  )
}

export default Navbar
