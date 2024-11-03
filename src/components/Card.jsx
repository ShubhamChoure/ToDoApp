import React from 'react'

function Card(Props) {
  return (
    <div className={Props.com?' line-through ml-2 grid':' no-underline ml-2 grid'}>
      <span className=' text-center self-center'>{Props.task}</span>
    </div>
  )
}

export default Card
