import React from 'react'
import './style.css'
import { MdCall } from 'react-icons/md'
import {BsFillChatDotsFill} from 'react-icons/bs'
import {HiChatBubbleBottomCenter} from 'react-icons/hi2'

const Contact = () => {
  return (
      <section className='c-wrapper'>
          <div className="paddings innerWidth flexCenter c-container">
              {/* left */}
              <div className="flexColStart c-left">
                    <span className='pinkText'>Oue Contacts</span>
                    <span className='primaryText'>Easy to Contact Us</span>
                    <span className='secondaryText'>We are always ready to help by providing the best services and 
                        beleive in giving you a lifetime experience</span>

                    <div className="flexColStart contactModes">
                        {/* first row */}
                        <div className="flexStart row">
                            {/* first */}
                            <div className="flexColCenter mode">
                                    
                                <div className="flexStart">
                                    <div className="flexCenter icon">
                                        <MdCall size={25} />
                                    </div>
                                    <div className="flexColStart detail">
                                        <span className='primaryText'>Call</span>
                                        <span className='secondaryText'>+918708317415</span>
                                    </div>
                                </div>

                                <div className="flexCenter button">Call Now</div>
                            </div>
                            {/* second */}
                            <div className="flexColCenter mode">
                                <div className="flexStart">
                                    <div className="flexCenter icon">
                                        <BsFillChatDotsFill size={25} />
                                    </div>
                                    <div className="flexColStart detail">
                                        <span className='primaryText'>Chat</span>
                                        <span className='secondaryText'>+918708317415</span>
                                    </div>
                                </div>

                                <div className="flexCenter button">Dm Now</div>
                            </div>
                        </div>

                        {/* second row */}
                        <div className="flexStart row">
                            {/* first */}
                            <div className="flexColCenter mode">
                                    
                                <div className="flexStart">
                                    <div className="flexCenter icon">
                                        <BsFillChatDotsFill size={25} />
                                    </div>
                                    <div className="flexColStart detail">
                                        <span className='primaryText'>Video Call</span>
                                        <span className='secondaryText'>+918708317415</span>
                                    </div>
                                </div>

                                <div className="flexCenter button">Video Call Now</div>
                            </div>
                            {/* second */}
                            <div className="flexColCenter mode">
                                <div className="flexStart">
                                    <div className="flexCenter icon">
                                        <HiChatBubbleBottomCenter size={25} />
                                    </div>
                                    <div className="flexColStart detail">
                                        <span className='primaryText'>Message</span>
                                        <span className='secondaryText'>+918708317415</span>
                                    </div>
                                </div>

                                <div className="flexCenter button">Message Now</div>
                            </div>
                        </div>
                    </div>
              </div>
              <div className="c-right">
                  <div className="image-container">
                      <img src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmVzb3J0c3xlbnwwfHwwfHx8MA%3D%3D" alt="" />
                  </div>
              </div>
          </div>
      </section>    
  )
}

export default Contact