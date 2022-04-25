import React from 'react'
import Tilt from 'react-parallax-tilt';
import './Logo.css'

function Logo() {
  return (
    <div className='ma4 mt0'>
      <Tilt className='Tilt' style={{ height: '150px', width: '150px'}}>
        <div >
          <h1> 👀</h1>
        </div>
      </Tilt>
    </div>
  )
}

export default Logo