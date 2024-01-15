import React, { useState } from 'react'
import './style.css'
import {BiMenuAltRight} from 'react-icons/bi'
import OutsideClickHandler from 'react-outside-click-handler'
import { Link } from 'react-router-dom';

const Header2 = () => {
  const [menuOpened, setMenuOpened] = useState(false)    //to check if the menu is opened or false

  const getMenuStyles = (menuOpened) => {
    if (document.documentElement.clientWidth <= 800)      //menu dikhna chaiye ya nhi
    {
      return {right : !menuOpened && "-100%"}
    }
  }
  return (
    <section className='h-wrapper'>
        <div className="flexCenter paddings innerWidth h-container">
            <img src="/logo.png" alt="Homyz" width={100}/>
            
            <OutsideClickHandler
            onOutsideClick={() => {
              setMenuOpened(false)
            }}
            >
            <div className="flexCenter h-menu" style={getMenuStyles(menuOpened)}>
              <Link to="/residencies" className='hh'>Resorts</Link>
              <Link to="/all" className='hh'>Details</Link>
              <Link to="/value" className='hh'>Value</Link>
              <Link to="/contact" className='hh'>Contact Us</Link>
              <Link to="/getstarted" className='hh'>Get Started</Link>
              <Link to = "/Login">
              <button className='button'>
               Log Out
              </button></Link>
              
            </div>
            </OutsideClickHandler>

            <div className="menu-icon" onClick={() => setMenuOpened((prev) => !prev)}>
          <BiMenuAltRight size={30}/>
        </div>
        </div>
    </section>
  )
}

export default Header2