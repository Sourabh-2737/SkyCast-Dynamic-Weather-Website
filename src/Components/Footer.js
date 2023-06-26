import React from 'react'
import linkedin from '../Images/icons/linkedin.png'
import github from '../Images/icons/github.png'
import instagram from '../Images/icons/instagram.png'

export default function Footer() {
  return (
    <div className='footer container row'>
      <span className='col-sm-12'>
        Developed By - Sourabh Singh
      </span>
      <span className='col-sm-12'>
        <img  src={linkedin} alt='linkedin'/> <img src={github} alt='github'/> <img src={instagram} alt='instagram'/>
      </span>
      
    </div>
  )
}
