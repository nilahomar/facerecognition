import React from 'react'
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'
import './Logo.css'

function Logo() {
  return (
    <div className='ma4 mt0'>
      <Tilt className='Tilt' style={{ height: '150px', width: '150px' }}>
        <div className='pa3'>
          <img style={{ paddingTop: '8px' }} src={brain} alt='logo' />
        </div>
      </Tilt>
    </div>
  )
}

export default Logo