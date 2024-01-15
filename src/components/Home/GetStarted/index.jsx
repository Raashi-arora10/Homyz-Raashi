import React from 'react'
import { Link } from 'react-router-dom';
import './style.css'

const GetStarted = () => {
  return (
    <section className="g-wrapper">
        <div className="paddings innerWidth g-container">
            <div className="flexColCenter inner-container">
                <span className='primaryText'>Get Started with Homyz</span>
                <span className='secondaryText'>Subscribe and book your dreamy stay with good deals.</span>
                <button className='button'>
                    <a href="mailto:raashiarora1006@gmail.com">Get Started</a>
                </button>
            </div>
        </div>
        <Footer />
    </section>
  
  )
}
export default GetStarted;



const Footer = () => {
  return (
    <section className='f-wrapper'>
        <div className="paddings innerWidth flexCenter f-container">

            {/* left side */}
            <div className="flexColStart f-left">
                <img src="./logo2.png" alt="" width={120}/>

                <span className='secondaryText'>
                    Our vision is to provide everyone <br/>
                    the best experience and hospitality.
                </span>
            </div>

            <div className="flexColStart f-right">
                <span className='primaryText'>Information</span>
                <span className='secondaryText'>Ambala City, Haryana</span>
                <span className='secondaryText'>raashiarora1006@gmail.com</span>

                <div className="flexCenter f-menu">
                <Link to="/residencies">Residencies</Link>
                <Link to="/value">Value</Link>
                <Link to="/contact">Contact Us</Link>
                <Link to="/getstarted">Get Started</Link>
                </div>
            </div>
        </div>
        <div class="copyrigth">
            <p>Copyright © Raashi Arora (Homyz).</p>
        </div>
    </section>
  )
}
