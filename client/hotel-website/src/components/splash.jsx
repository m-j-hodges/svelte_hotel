import React from 'react';
import Carousel, {CarouselItem} from './carousel'
import Header from './header'

const MainPage = () => {



  return (
    <div>
    <Header />
    <div style={{height:"50px"}}>
    </div> 
    <Carousel>
    <CarouselItem><img style={{width:"100%"}}alt="our pool" src="img/pool.jpeg"></img></CarouselItem>
    <CarouselItem><img style={{width:"100%"}} alt="hotel room" src="img/lobby.jpeg"></img> </CarouselItem>
    <CarouselItem>Item 3</CarouselItem>
    </Carousel>
    </div>
  )

}

export default MainPage