import React from 'react'
import backArrow from './img/arrow_back.svg'
import './title.css'

export default function Title(props){
  return (
    <div className="project-title">
      <h1>{props.title}</h1>
      <div onClick={() => {
        window.location.pathname = '/'
      }} className="go-back">
        <img src={'/' + backArrow}/>
        <div className='text'>Go back</div>
      </div>
    </div>
  )
}
