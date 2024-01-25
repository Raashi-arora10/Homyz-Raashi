import React from 'react'
import './style.css'
import CountUp from "react-countup";
import {motion} from 'framer-motion';

const Header = () => {
  return (
    <section className='hero-wrapper'>
        <div className="paddings innerWidth flexCenter hero-container">
            <div className="flexColStart hero-left">
                <div className="hero-title">
                    {/* <div className="blue-circle" /> */}
                    <motion.h1 
                    initial={{y: "3rem", opacity:0}}
                    animate={{y:0, opacity:1}}
                    transition={{
                        duration: 2,
                        type: "ease-in"
                    }}
                    >
                    Connecting<br/>People to<br/>Hospitality</motion.h1>
                </div>
                <div className="flexColStart hero-des">
                    <span className='secondaryText'>Discovering the world and then finding the perfect place to rest your head.</span>
                    <span className='secondaryText'> At Homyz, we understand the importance of a great stay. Let us guide you to </span>
                    <span className='secondaryText'>accommodations that match your wanderlust.</span>
                </div>

                 {/* <div className="flexCenter search-bar">
                    <HiLocationMarker color="var(--pink)" size={25} />
                    <input type="text" />
                    <button className='button'>Search</button>
                </div>  */}
                <div className="flexCenter stats">
                    <div className="flexColCenter stat">
                        <span>
                            <CountUp start={8800} end={9000} duration={4} />
                        <span>+</span>
                        </span>
                        <span className='secondaryText'>
                            Premium Rooms
                        </span>
                    </div>
                    <div className="flexColCenter stat">
                        <span>
                            <CountUp start={1940} end={2000} duration={5} />
                        <span>+</span>
                        </span>
                        <span className='secondaryText'>
                            Happy Visitors
                        </span>
                    </div>
                    <div className="flexColCenter stat">
                        <span>
                            <CountUp end={28} />
                        <span>+</span>
                        </span>
                        <span className='secondaryText'>
                            Award Wining
                        </span>
                    </div>
                </div>
            </div>

            <div className="flexCenter hero-right">
                <motion.div 
                initial={{x:"7rem", opacity:0}}
                animate={{x:0, opacity:1}}
                transition={{
                    duration:2,
                    type : "ease-in"
                }}
                className="image-container">
                    <img src="https://images.unsplash.com/photo-1617098900591-3f90928e8c54?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVkcm9vbXN8ZW58MHx8MHx8fDA%3D" alt="abc" />
                </motion.div>
            </div>
        </div>
    </section>
  )
}

export default Header
