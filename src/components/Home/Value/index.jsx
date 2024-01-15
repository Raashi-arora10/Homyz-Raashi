import React from 'react'
import {
    Accordion, 
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import "react-accessible-accordion/dist/fancy-example.css"
import { MdOutlineArrowDropDown } from 'react-icons/md'
import './style.css'
import data from '../../../utils/accordion'

const Value = () => {
  return (
    <section className='v-wrapper'>
        <div className="paddings innerWidth flexCenter v-container">
            {/* left side */}
            <div className="v-left">
                <div className="image-container">
                    <img src="https://images.unsplash.com/photo-1555447405-05975a47927f?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhvdGVsJTIwd2VsY29taW5nfGVufDB8fDB8fHww" alt="" />
                </div>
            </div>

            {/* right side */}
            <div className="flexColStart v-right">
                <span className='pinkText'>Our Value</span>
                <span className='primaryText'>Value We Offer To You</span>
                <span className='secondaryText'>We believe that true hospitality is a blend of warmth, luxury, and nature's splendor.
                    <br />Your experience at our resort is a testament to that belief.
                </span>

                 <Accordion
                className="accordion"
                allowMultipleExpanded={false}
                preExpanded={[0]}
                >
                    {
                        data.map((item,i) => {
                            return(
                                <AccordionItem className="accordionItem" key={i} uuid={i}>
                                    <AccordionItemHeading>
                                        <AccordionItemButton className="flexCenter accordionButton">
                                            <div className="flexCenter icon">{item.icon}</div>
                                            <span className='primaryText'>
                                                {item.heading}
                                            </span>
                                            <div className="flexCenter icon"><MdOutlineArrowDropDown size={20} /></div>
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                            
                                    <AccordionItemPanel>
                                        <p className="secondaryText">{item.detail}</p>
                                    </AccordionItemPanel>
                                </AccordionItem>
                            );
                        })
                    }

                </Accordion> 
            </div>
        </div>
    </section>
  )
}

export default Value