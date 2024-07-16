import { split, useQuery } from '@apollo/client';
import React, {useState, useRef} from 'react';
import { useEffect } from 'react';
import Header from './header'
import MainPage from './splash'
import {useLocation} from 'react-router-dom';
import {NEW_ORDER} from '../utils/mutations'
import {useMutation} from '@apollo/client'
import AuthService from '../utils/auth'
import { GET_AMENITIES } from '../utils/queries';

export default function Premier({isLoading, item, orders}) {
  const location = useLocation();
  let imgSrc1 = "img/Hotel_Swimming.jpeg"
  let imgSrc2 = ""
  const [resDates, setresDates] = useState({startDate:'',endDate:'',roomType: '', roomPrice: '', total: 0, lengthOfStay: 0})
  const [formState, setFormState] = useState({username: AuthService.getProfile().data.username, startDate: '', endDate: '', roomType:'', total: 0, lengthOfStay: 0, roomPrice:0 })
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
  const [numOfOrders, setNumOfOrders] = useState(orders)
  nightRate.current = location.state.itemPrice
  const [addOrder, {error}] = useMutation(NEW_ORDER)
  const {loading, data} = useQuery(GET_AMENITIES, {
    variables: {roomType: location.state.itemType}
  })

function updateDates(e) {
e.preventDefault();
console.log(e)
 const {name, value} = e.target
const valueAsNumber =e.target.valueAsNumber /(1000*60*60*24)
setFormState({...formState,[name]:value, roomPrice: location.state.itemPrice, roomType: location.state.itemType,})
 const newName = name + 'Num'
setdatesasNum({...datesAsNum,[newName]:valueAsNumber,})
}

async function updateCart(event) {
  event.preventDefault()
  const getOrderType = document.querySelector('h3').innerHTML.split(' ')[0]
  let orderData = {}
  orderData = {roomType: getOrderType, startDate: resDates.startDate, endDate: resDates.endDate, roomPrice: nightRate.current, total: totalCost.current, lengthOfStay: stayLength}
  let existingCart
  // JSON.parse(localStorage.getItem('myCart')) === null ? existingCart = [] : existingCart = JSON.parse(localStorage.getItem('myCart'))
  // existingCart.push(orderData)
  localStorage.setItem("myCart", JSON.stringify(existingCart))
  console.log(formState)
  try{
    const { data } = await addOrder({
      variables: {username: formState.username, input: {roomType:formState.roomType, total: formState.total, lengthOfStay: formState.lengthOfStay, startDate: formState.startDate, endDate: formState.endDate, roomPrice: formState.roomPrice},}
    }
    );
    console.log(data)
    setNumOfOrders(data.saveOrder.orders.length)
  } catch (err) {
    console.log(err)
    console.log(error)
  }
  
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
  setFormState({...formState,total:parseInt(totalStayAmount),lengthOfStay:daysDiff})
  
}, [stayLength, datesAsNum, subTotal, taxesState, orders])


const amenityData = data?.getAmenities
console.log(data)
  return(
   <>
   <Header orders={numOfOrders} />
   <h3 className="jumbotron text-center m-3">{location.state.itemType} Order</h3>
   <div className="row">
  <div className="col-4"></div>
  <div className="col-4 custom-order rounded">
    <img className="img-fluid" src="img/premier_room.jpeg"></img>
    <h5 className="card-text text-center">Order Summary:</h5>
    <p>Room Type:{location.state.itemType} </p>
    <p className="card-text">Room Amenities:</p>
    <ul>
    {!loading ? amenityData.map((item)=> (
      <div>
      {item.hotTub ? <li>Hot Tub</li> : ''}
      {item.KingSizeBed ? <li>King Size Bed</li> : ''}
      {item.QueenSizeBed ? <li>Queen Size Bed</li> : ''}
      {item.TV ? <li>TV</li> : ''}
      {item.Refrigerator ? <li>Refrigerator</li> : ''}
      {item.wifi ? <li>wifi</li> : ''}
      </div>
    )): (<div> loading... </div>)}
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
    <input className="custom-date" default={new Intl.DateTimeFormat('en-US').format(Date.now())} onChange={(e)=> updateDates(e)} type="date" id="startDate" name="startDate" min={new Date(Date.now()).toLocaleDateString()} max={resDates.endDate}></input>
    <br></br>
    <label className="px-2 d-inline" for="endDate">End Date:</label> 
    <input onChange={(e)=> updateDates(e)} className="my-4 custom-date" type="date" id="endDate" name="endDate" min={resDates.startDate} max="2024-12-30"></input> 
    <button onClick={(event) => updateCart(event)}className="custom-btn m-auto">Add to Cart</button> 
  </div>
  <div className="col-4"></div>
  </div>
   </>
  )

}