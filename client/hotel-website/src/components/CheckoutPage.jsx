import React, {useState, useRef} from 'react';
import Header from './header'
import {useLocation} from 'react-router-dom';
import { useEffect } from 'react';
import AuthService from '../utils/auth'
import {MDBInput, MDBValidationItem, MDBBtn, MDBValidation, MDBCheckbox} from 'mdb-react-ui-kit'


export default function CheckOutPage({isLoading, allOrders, orders}) {
  const [newTotal, setNewTotal] = useState(0)
const tom = useRef('')

const [form, setFormState] = useState({fname:'', lname:'', phone:0, companyName:'',email:'',address:'',shippingAddressSame:false, saveMyInfo:false, ccNumber:0, CCV:0, expiration:0, nameOnCard:'', paymentType:''})


const location = useLocation();
const addUpSubTotal = () => {
  let subTotal = 0
  location.state.allOrders.forEach((order) => {
    subTotal += order.total

  })
  setNewTotal(subTotal)
}

useEffect(()=> {
  addUpSubTotal()

}, [])

function formChanges(e) {
  const {name, value} = e.target
  let phoneRegEx = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
  let testVal = phoneRegEx.test(value)
  if(name == "phone" && !testVal) return
  setFormState({...form,[name]:value,})
}

function savePaymentData(e) {
  console.log(e.target)
  const checkedBtn =  document.querySelectorAll('.form-check-input')
  checkedBtn.forEach((item) => {item.checked = false})
  e.target.checked = true
  const {name, value } = e.target
  setFormState({...form,[name]: value,})
}

function saveCheckBox(e) {
  console.log(e.target.checked)
  const {name} = e.target
  setFormState({...form,[name]: e.target.checked,})
}

function saveCCData(e) {
  const [name, value] = e.target
  setFormState({...form,[name]: value,})

}




  return(
  <div>
    <Header orders={orders} />
  <div className="h3">Your Order Summary</div> 
  <form className="form-control mt-5">
  <label className="d-inline m-3" htmlFor="sub-total">Sub-Total:</label>
  <input className="d-inline form-control w-25 m-3" value={`$${newTotal}`} id="sub-total"type="text" disabled />
  <br></br>
  <label className="d-inline m-3" htmlFor="username">Username:</label>
  <input id="username" className="d-inline form-control w-25 m-3" value={AuthService.getProfile()?.data.username} disabled></input>
  </form>
<section>
  <div className="row">
    <div className="col-md-1"></div>
    <div className="col-md-7 mb-4">
      <div className="card mb-4">
        <div className="card-header py-3">
          <h5 className="mb-0">Billing details</h5>
        </div>
        <div className="card-body">
          <form>
      <div className="row">
      <MDBValidation>
      <MDBValidationItem className='col-md-4'>
        <MDBInput
          name='fname'
          id='validationCustom01'
          required
          label='First name'
          onChange={(e) => formChanges(e)}
        />
      </MDBValidationItem>
      <MDBValidationItem className='col-md-4'>
        <MDBInput
          name='lname'
          id='validationCustom02'
          required
          label='Last name'
          onChange={(e) => formChanges(e)}
          />
      </MDBValidationItem>
          </MDBValidation>
        </div>
      <MDBValidation>
            <MDBValidationItem className="form-outline my-4">
              <MDBInput className="form-control" onChange={(e)=> formChanges(e)} name="companyName" label="Company Name" type="text" id="companyName" />
              </MDBValidationItem>
            <MDBValidationItem className="form-outline my-4">
              <MDBInput onChange={(e)=> formChanges(e)}className="form-control" name="address" label="Address" type="text" id="address" required />
              </MDBValidationItem>
            <MDBValidationItem className="form-outline my-4">
              <MDBInput onChange={(e)=> formChanges(e)} className="form-control" name="email" label="Email" type="text" id="email" required />
              </MDBValidationItem>
            <MDBValidationItem className="form-outline my-4">
              <MDBInput onChange={(e)=> formChanges(e)} className="form-control" placeholder="(XXX)-XXX-XXXX"type="tel" name="phone" label="Phone" id="phone" required></MDBInput>
              </MDBValidationItem>
              </MDBValidation>
            <hr className="my-4" />

            <div className="form-check">
              <input className="form-check-input" name="shippingAddressSame" onChange={(e) =>saveCheckBox(e)} type="checkbox" id="checkoutForm1" />
              <label className="form-check-label" for="checkoutForm1">
                Shipping address is the same as my billing address
              </label>
            </div>

            <div className="form-check mb-4">
              <input className="form-check-input" name="saveMyInfo" type="checkbox" onChange={(e)=> saveCheckBox(e) }id="checkoutForm2" />
              <label className="form-check-label" for="checkoutForm2">
                Save this information for next time
              </label>
            </div>

            <hr className="my-4" />

            <h5 className="mb-4">Payment</h5>

            <div className="form-check">
              <input className="form-check-input" onChange={(e)=> savePaymentData(e)} type="radio" name="paymentType" id="checkoutForm3" value="creditCard"
               />
              <label className="form-check-label" for="checkoutForm3">
                Credit card
              </label>
            </div>

            <div className="form-check">
              <input className="form-check-input" onChange={(e)=> savePaymentData(e)} value="debitCard" type="radio" name="paymentType" id="checkoutForm4" />
              <label className="form-check-label" for="checkoutForm4">
                Debit card
              </label>
            </div>

            <div className="form-check mb-4">
              <input className="form-check-input" onChange={(e)=> savePaymentData(e)} value="paypal" type="radio" name="paymentType" id="checkoutForm5" />
              <label className="form-check-label" for="checkoutForm5">
                Paypal
              </label>
            </div>

            <div className="row mb-4">
              <div className="col">
                <div className="form-outline">
                  <input type="text" id="formNameOnCard" name="nameOnCard" onChange={(e) => formChanges(e)} className="form-control" />
                  <label className="form-label" for="formNameOnCard">Name on card</label>
                </div>
              </div>
              <div className="col">
                <div className="form-outline">
                  <input type="text" id="formCardNumber" className="form-control" />
                  <label className="form-label" for="formCardNumber">Credit card number</label>
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-3">
                <div className="form-outline">
                  <input name="ccNumber" type="tel" id="formExpiration" onChange={(e)=> saveCCData(e)} className="form-control" />
                  <label className="form-label" for="formExpiration">Expiration</label>
                </div>
              </div>
              <div className="col-3">
                <div className="form-outline">
                  <input name="CVV" onChange={(e)=> formChanges(e)} type="text" id="formCVV" className="form-control" />
                  <label className="form-label" for="formCVV">CVV</label>
                </div>
              </div>
            </div>

            <MDBBtn  >
              Complete Payment
            </MDBBtn>
          </form>
        </div>
      </div>
    </div>

    <div className="col-md-3 mb-4">
      <div className="card mb-4">
        <div className="card-header py-3">
          <h5 className="mb-0">Summary</h5>
        </div>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
              Total Cost of Stay (including taxes)
              <span>{`$${newTotal}`}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
              <div>
                <strong>Total amount</strong>
                <strong>
                  <p className="mb-0">(including VAT)</p>
                </strong>
              </div>
              <span><strong>{`$${newTotal}`}</strong></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>



</div>
  )
}