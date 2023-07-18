import React from 'react'
import grass from "../../../../images/grass.png"
import SaleBtnLink from "./SaleBtnLink"
function Section1() {

    return (
    <section className='section1'>
        <div className='container-section1'>
            <div className='section1-first-part'>
                <h1>Sale</h1>
                <h2>New season</h2>
                <SaleBtnLink to="/allsales" className='sale-btn'>Sale</SaleBtnLink>
            </div>
                
            <div className='section1-second-part'>
                <img src={grass} alt='grass'></img>
            </div>
        </div>
    </section>
  )
}

export default Section1