import React from 'react'
import './ImageLinkForm.css'

function ImageLinkForm({onInputChange,onButtonSubmit}) {
  return (
    <div className='pa3'>
      <p className='f3'>
        {'This Magic Brain will detect faces in your pictures. Give it a try'}
      </p>
      <div className='center'>
        <div className='center form pa4 br2 shadow-5'>
          <input className='f4 pa2 w-70' type="text" onChange={onInputChange}/>
          <button className='w-32 grow f4 link ph3 pv2 dib white bg-black' onClick = {onButtonSubmit}>Detect</button>
        </div>
      </div>
    </div>
  )
}

export default ImageLinkForm