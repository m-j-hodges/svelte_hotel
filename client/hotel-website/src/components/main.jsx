import React, {Component, useState} from 'react';
import Header from './header'

export default function Main({props}) {

const [premierPrice, setPremierPrice] = useState(299)

let rooms = [
  {roomName: 'Premier', roomCost: 300.00, roomImg: '/img/premier_room.jpeg' },
  {roomName: 'Deluxe', roomCost: 200.00, roomImg: '/img/deluxe_room.jpeg' },
  {roomName: 'Basic', roomCost: 100.00, roomImg: '/img/Basic_room.jpeg' }
]

  return(
    <>
    <Header />
    <div id="row1" className="row">
    <div className="p-4"><h3> Room Options</h3> </div>
    
    {rooms && rooms.map((item) => (
      <>
      <div className="col-4"></div>
      <div className="col-md-3">
      <div className="card p-4">
      <div className="card-title">{item.roomName}</div>
      <img className="card-img-top" src={item.roomImg}></img>
      <p className="card-text"> Nightly rate: {item.roomCost}</p>
      <button className="btn btn-custom"id={item.roomName + ' order'}>Book Room</button>
      </div>
      </div>
      <div className="col-4"></div>
      
      </>
    ))}
    
    </div>
    </>
  )

}