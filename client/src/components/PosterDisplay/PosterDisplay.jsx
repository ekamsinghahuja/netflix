import React from 'react'
import './p.css'
import card_data from '../../assets/cards/Cards_data1'

const PosterDisplay = () => {
  return (
    <div>
        <div className='p-title-cards'>
            <h2>{"Popular on Netflix"}</h2>
            <div className="p-card-list">
                {card_data.map((card,index)=>{
                return <div className='p-card'>
                    <img src={card.image} alt="" />
                    <p>{card.name}</p>
                </div>
                })}
            </div>
            </div>
      
    </div>
  )
}

export default PosterDisplay
