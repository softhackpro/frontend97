import React from 'react'

const Cards = ({cardType}) => {
    const src=cardType!=='1'?`/cards/${cardType.substring(0,cardType.length - 1)}.png`:`/cards/red_back.png`

    
  return (
    <div className='border border-white w-8 h-12'>

        <img src={src} alt={cardType} className='block w-full bg-cover' />
    </div>
  )
}

export default Cards