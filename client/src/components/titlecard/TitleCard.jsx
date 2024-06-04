import React from 'react'
import "./H.css"
import card_data from '../../assets/cards/Cards_data1'

const TitleCard = ({title,category}) => {
  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list">
        {card_data.map((card,index)=>{
          return <div className='card'>
            <img src={card.image} alt="" />
            <p>{card.name}</p>
          </div>
        })}
      </div>

      
    </div>
  )
}

export default TitleCard
