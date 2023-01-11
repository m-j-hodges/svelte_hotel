import { split } from '@apollo/client';
import React, {useState, useRef} from 'react';
import { useEffect } from 'react';
import Header from './header'
import MainPage from './splash'
import {useLocation} from 'react-router-dom';


export default function Premier({item}) {
  const location = useLocation();
  let imgSrc1 = "img/Hotel_Swimming.jpeg"
  let imgSrc2 = ""
  const [resDates, setresDates] = useState({startDate:0,endDate:0})
  const [urlName, setUrlName] = useState('Premier')
  const [datesAsNum, setdatesasNum] = useState({startDateNum:0,endDateNum:0})
  const [stayLength, setStayLength] = useState(0)
  const nightRate = useRef(599)
  const subTotal = useRef(0)
  const taxes = useRef(0)
  const totalCost = useRef(0)
  const [taxesState, setTaxesState] = useState(0)
  const [totalCostState, setTotalCostState] = useState(0)
  const [subTotalState, setsubTotalState] = useState(0)
  const [todayDate, setTodayDate] = useState(new Date(Date.now()).toLocaleDateString())
  let newCart = JSON.parse(localStorage.getItem('myCart')) ? JSON.parse(localStorage.getItem('myCart')).length : 0
  const [myCart, setmyCart] = useState(newCart || 0)
  nightRate.current = location.state.itemPrice

function updateDates(e) {
console.log(e)
 const {name, value} = e.target
const valueAsNumber =e.target.valueAsNumber /(1000*60*60*24)
 setresDates({...resDates,[name]:value,})
 const newName = name + 'Num'
 console.log(`newName :${newName}`)
setdatesasNum({...datesAsNum,[newName]:valueAsNumber,})

}

function updateCart() {
  const getOrderType = document.querySelector('h3').innerHTML.split(' ')[0]
  let cart = {}
  cart = {orderType: getOrderType, startingDate: resDates.startDate, endingDate: resDates.endDate, nightlyRate: nightRate.current, total: totalCost.current, lengthOfStay: stayLength}
  let existingCart
  JSON.parse(localStorage.getItem('myCart')) === null ? existingCart = [] : existingCart = JSON.parse(localStorage.getItem('myCart'))
  existingCart.push(cart)
  console.log(existingCart)
  // setmyCart({...existingCart,[existingCart != null ? existingCart.length : 0] : cart,})
  localStorage.setItem("myCart", JSON.stringify(existingCart))
  setmyCart(existingCart.length)
}

function returnUrlName() {
  const url = window.location.href
  const splitUrl = url.split('/')[3]
  console.log(splitUrl)
  return {splitUrl}
}

useEffect(()=> {
  const {endDateNum, startDateNum} = datesAsNum
  const daysDiff = endDateNum - startDateNum
  setStayLength(daysDiff)
  const calcSubTotal = daysDiff * nightRate.current
  console.log(nightRate.current)
  subTotal.current = calcSubTotal
  const calcTaxes = subTotal.current * .09
  taxes.current = calcTaxes
  const totalStayAmount = subTotal.current + taxes.current
  totalCost.current = totalStayAmount
}, [stayLength, datesAsNum, subTotal, taxesState, myCart])



  return(
   <>
   <Header orders={myCart} />
   <h3 className="jumbotron text-center m-3">{location.state.itemType} Order</h3>
   <div className="row">
  <div className="col-4"></div>
  <div className="col-4 custom-order rounded">
    <img className="img-fluid" src="img/premier_room.jpeg"></img>
    <h5 className="card-text text-center">Order Summary:</h5>
    <p>Room Type:{location.state.itemType} </p>
    <p className="card-text">Room Amenities:</p>
    <ul>
      <li>full-size refrigerator</li>
      <li>full bathroom</li>
      <li>Two Queen size beds</li>
      <li>television</li>
      <li>wi-fi internet</li>
      <li>Mini-kitchen</li>
    </ul>
    <p className="d-inline">Room Price (nightly rate):</p><input id="nightlyRate" ref={nightRate} value={`$${nightRate.current}`} type="text" disabled></input>
    <p>Number of Nights: {stayLength ? stayLength : 0}</p>
    <label htmlFor="subTotal" className="px-2 d-inline">sub-total: </label> 
    <input id="subTotal" ref={subTotal} value={subTotal.current === 0 ? 0 : `$${subTotal.current}`} name="sub-total" type="text" className="form-control w-50 d-inline" disabled></input>
    <br></br>
    <label className="d-inline px-2" htmlFor="taxes">Taxes:</label>
    <input id="taxes" name="taxes" value={`$${taxes.current}`} type="text" className="form-control w-50 d-inline" disabled></input>
    <br></br>
    <label className="d-inline px-2" htmlFor="totalCost"> Total: </label>
    <input id="totalCost" name="total" value={`$${totalCost.current}`} type="text" className="form-control w-50 d-inline" disabled></input>
    <p>Reservation dates:</p>
    <label className="px-2 d-inline"for="startDate">Start Date:</label>
    <input className="custom-date" onChange={(e)=> updateDates(e)} type="date" id="startDate" name="startDate" min={new Date(Date.now()).toLocaleDateString()} max={resDates.endDate}></input>
    <br></br>
    <label className="px-2 d-inline" for="endDate">End Date:</label> 
    <input onChange={(e)=> updateDates(e)} className="my-4 custom-date" value={resDates.endDate} type="date" id="endDate" name="endDate" min={resDates.startDate} max="2024-12-30"></input> 
    <button onClick={() => updateCart()}className="custom-btn m-auto">Add to Cart</button> 
  </div>
  <div className="col-4"></div>
  </div>
   </>
  )

}