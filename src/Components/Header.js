import React from 'react'
import favicon from '../Images/favicon.png'

export default function Header() {
  return (
    <div>
      <span className='headerSpan'><img className='appLogo' src={favicon} alt='App Logo' /><h1 className='appName'>SkyCast</h1></span>
    </div>
  )
}
