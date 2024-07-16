import React, {useState, useRef} from 'react';
import Header from './header'
import AuthService from '../utils/auth'
import {useMutation, useQuery} from '@apollo/client'
import {GET_ORDER} from '../utils/queries'
import { useEffect } from 'react';
import {DELETE_ORDER} from '../utils/mutations'
import { Navigate, renderMatches, useNavigate, Link } from 'react-router-dom';


export default function Checkout({orders, isLoading, allOrders}) {
  const navigate = useNavigate()
const [deleteOrder, {error, newData}] = useMutation(DELETE_ORDER)
const loggedUser = AuthService.getProfile().data.username 
const trackOrders = useRef('')
const loggedIn = AuthService.loggedIn() || true
const {loading, data } = useQuery(GET_ORDER, {
  variables: { username: loggedUser
  },
})
console.log(data)
const [myCart, setMyCart] = useState(allOrders)
const [dataLoading, setDataLoading] = useState(isLoading)
const [currentUserSess, setCurrentUserSess] = useState(AuthService.loggedIn())

const deleteItem = async (e) => {
  e.preventDefault();
  let {id} = e.target
  if(id == '') {
    id = e.target.parentElement.id
    console.log(id)
  }
  const {data} = await deleteOrder( {
    variables: { username: loggedUser, orderId:id }

  })
  setMyCart(data.removeOrder)
  window.location.reload()
}

function NavToComp() {
  navigate('/CheckOutPage', {state: {allOrders: allOrders}})
}




useEffect(()=> {
  // let storeCart = localStorage.setItem('myCart', JSON.stringify(myCart))
  if(!currentUserSess) { window.location.assign('/')}
}, [currentUserSess, data])


  return (
    <>
    {!loggedIn ? (<div> <Header/><div> please login to view your cart</div>
    <a className="card-title" href="/login">Login </a> </div> ) : (
      <>
    <Header orders={orders} />
      <h4> Your Cart </h4>
      <div className="row m-3">
      {!loading ? data.getOrder.length === 0 ? <div> No items in cart.</div>: '' : '' }
      {!loading ? data.getOrder.map((item) => 
        (<>
        
        <div className="card m-3 p-3 col-3 bg-light" style={{width: "18rem"}}>
        <div className="card-body">
          <div className="container-fluid d-flex">
            <h5 className="d-inline-flex card-title"></h5>
            {item.roomType || <h3>Title</h3>}
            <button id={item._id} onClick={(e) => deleteItem(e)} type="button" className="p-1 ml-3 d-inline-flex d-inline btn btn-secondary custom-button align-items-right"><img style={{width: '1rem'}} src="img/dustbin_icon_set_generated.png"></img>
            
            </button> 
          
          </div>
          <p className="card-text">Length of Stay: {item.lengthOfStay}</p>
          <p className="card-text">dates of Stay: {item.startDate.toLocaleString()} - {item.endDate.toLocaleString()}</p>
          <p className="card-text">Price per night: ${item.roomPrice}</p>
          <p className="card-text">Cost of Total Stay: ${item.total}</p>
          <a href="x" key={item.orderType + "link"} className="card-link">Card link</a>
          <a href="x" key={item.orderType + "link1"} className="card-link">Another link</a>
        </div>
      </div>
        </>
      )) : (<div className="spinner"></div>) }
      </div>
      <div className="row">
      <div className="col-4"></div>
      <button className="btn btn-secondary col-3" onClick={()=> NavToComp()} style={{height: '5rem'}} type="button">Checkout &#x2192;</button> 
      <div className="col-4"></div>
      </div>
      </>
    )}
  </>)}
