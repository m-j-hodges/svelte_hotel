import React from 'react';
import Carousel, {CarouselItem} from './carousel'
import Header from './header'

const PremierPhotos = ({orders}) => {




  return(
    <>
    <Header order={orders}/>
    <div className="innerDiv">
      <Carousel>
        <CarouselItem height="400px" width="400px"><img src="img/premier_room.jpeg" className="rounded-4 cust-img"></img></CarouselItem>
        <CarouselItem height="400px" width="400px"><img src="img/pool.jpeg" className="rounded-4 cust-img"></img></CarouselItem>
        <CarouselItem height="400px" width="400px"><img src="img/lux_hotel_bath.jpeg" className="rounded-4 cust-img"></img></CarouselItem>
        <CarouselItem height="400px" width="400px"><img src="img/lux_hotel_spa.jpeg" className="rounded-4 cust-img"></img></CarouselItem>
        <CarouselItem height="400px" width="400px"><img src="img/mini_fridge.jpeg" className="rounded-4 cust-img"></img></CarouselItem>
      </Carousel>
    </div>
    </>
  )

}

export default PremierPhotos