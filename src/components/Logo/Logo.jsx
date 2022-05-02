import React from 'react'
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'
import './Logo.css'

function Logo() {
  return (
    <div className='ma4 mt0'>
      <Tilt className='Tilt flex items-center justify-center' style={{ height: '100px', width: '100px' }}>
        <div className='pa3'>
          <img style={{ paddingTop: '8px' }} src={brain} alt='logo' />
        </div>
      </Tilt>
    </div>
  )
}

export default Logo