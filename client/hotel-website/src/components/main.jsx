import React, {Component, useState} from 'react';
import { useEffect } from 'react';
import Header from './header'

export default function Main({props}) {

const [notifyMsg, setNotifyMsg] = useState('')
const [notifyMsgBool, setNotifyMsgBool] = useState(false)
const [loggedIn, setloggedIn] = useState(false)
const [intervalCount, setIntervalCount] = useState(0)

let rooms = [
  {roomName: 'Premier', roomCost: 300.00, roomImg: '/img/premier_room.jpeg' },
  {roomName: 'Deluxe', roomCost: 200.00, roomImg: '/img/deluxe_room.jpeg' },
  {roomName: 'Basic', roomCost: 100.00, roomImg: '/img/Basic_room.jpeg' }
]

const notifyUser = () => {
  if(!loggedIn) {
    setNotifyMsg('Must be logged in to book a room. ')
    setNotifyMsgBool(true)
  }

}

const clearNotifyMsg = () => {
  setNotifyMsgBool(false)
}
useEffect(() => {
  setInterval(() => 
  {setNotifyMsgBool(false)}, 4000
  )
}, [])
  return(
    <>
    <Header />
    <div id="row1" className="row">
    <div className="p-4"><h3> Room Options</h3> </div>
       
    {rooms && rooms.map((item) => (
      <>
      <div className="col-md-4">
      <div className="card p-2 m-2">
      <div className="card-title text-center">{item.roomName}</div>
      <img className="card-img-top" src={item.roomImg}></img>
      <p className="card-text"> Nightly rate: ${item.roomCost}</p>
      <button className="btn btn-custom" onClick={() => notifyUser()} id={item.roomName + ' order'}>Book Room</button>
      <p style={{fontSize: "18px"}}className={notifyMsgBool ? 'd-block' : 'd-none'}>{notifyMsgBool ? notifyMsg : ''}</p>
      </div>
      </div>
      
      </>
    ))}
    
    </div>
    </>
  )

}