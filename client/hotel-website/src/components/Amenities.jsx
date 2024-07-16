import React from 'react';
import Header from './header'

export default function Amenities({orders}) {

return (
  <div>
  <Header orders={orders} />
  <div id="amenities">
  <div className="row">
  <div className="h3 text-center m-3">Amenities we offer...</div>
  <div className="card col-3 p-3 m-2">
  <div className="card-body">
    <h5 className="card-title">Swimming Pools</h5>
    <img className="card-img-top" src="img/Hotel_Swimming.jpeg" style={{width:"100%", height:"9rem"}}></img>
    <h6 className="card-subtitle mb-2 text-muted my-2">located on the first floor</h6>
    <p className="card-text">Come visit our swimming pool on the mezzanine level.</p>
    <a href="/premierPhotos" className="card-link">view photos</a>
  </div>
</div>
  <div className="card col-3 p-3 m-2">
  <div className="card-body">
    <h5 className="card-title">Theater</h5>
    <img className="card-img-top" src="img/lobby.jpeg"></img>
    <h6 className="card-subtitle my-2 text-muted">Come see the latest movies on the first floor!</h6>
    <p className="card-text">Our theater has 4 rooms and 250 seats. Come enjoy your favorite movie!</p>
    <a href="#" className="card-link">view photos</a>
  </div>
</div>
  <div className="card col-3 p-3 m-2" >
  <div className="card-body">
    <h5 className="card-title">Buffet Breakfast</h5>
    <img className="card-img-top" src="img/hotel_breakfast.jpeg" style={{height:"9rem"}}></img>
    <h6 className="card-subtitle my-2 text-muted">Breakfast is on us!</h6>
    <p className="card-text">An assortment of baked goods, eggs, or anything you would like our chefs to cook.</p>
    <a href="#" className="card-link">link to photos</a>
  </div>
</div>
</div>
  </div>
  </div>
)
}
