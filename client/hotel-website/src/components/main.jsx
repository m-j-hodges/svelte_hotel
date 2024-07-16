import React, {Component, useState, useEffect} from 'react';
import Header from './header'
import { useQuery, gql } from '@apollo/client'
import {QUERY_ROOMS} from "../utils/queries"
import AuthService from '../utils/auth'
import Premier from '../components/Premier'
import { Navigate, renderMatches, useNavigate, Link } from 'react-router-dom';
import PremierPhotos from "./premierPhotos"




export default function Main({orders}) {

const [notifyMsg, setNotifyMsg] = useState('')
const [notifyMsgBool, setNotifyMsgBool] = useState(false)
const [loggedIn, setloggedIn] = useState(false)
const [intervalCount, setIntervalCount] = useState(0)
const navigate = useNavigate();

const {loading, error, data} = useQuery(QUERY_ROOMS)
const rooms = data?.Rooms || []
if (error) {console.log(error)}

const NavToComponent = ({item}) => {
  navigate(`/premier`, {state: {itemType: item.roomType, itemPrice: item.roomPrice}})

}

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
    <Header orders={orders}/>
    <div id="row1" className="row">
    <div className="p-4"><h3> Room Options</h3> </div>
       
    { !loading ? rooms.map((item) => (
      <>
      <div className={'col-md-' + 4}>
      <div className="card p-2 m-2">
      <div className="card-title text-center h3">{item.roomType}</div>
      <img className="card-img-top" style={{height: "14rem"}} src={item.imgURL}></img>
      <p className="card-text"> Nightly rate: ${item.roomPrice}</p>
      <button className="btn btn-custom" onClick={() => NavToComponent({item})} id={item.roomType + ' order'}>Book Room</button>
      <p style={{fontSize: "18px"}}className={notifyMsgBool ? 'd-block' : 'd-none'}>{notifyMsgBool ? notifyMsg : ''}</p>
      </div>
      </div>
      
      </>
    )) : (<div className="spinner w-20"> </div>)}
    
    </div>
    </>
  )

}