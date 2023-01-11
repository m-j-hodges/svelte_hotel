import React from 'react';
import Carousel, {CarouselItem} from './carousel'
import Header from './header'

const MainPage = ({imgSrc1, imgSrc2, imgSrc3, orders}) => {



  return (
    <div>
    <Header orders={orders}/>
    <div style={{height:"50px"}}>
    </div> 
    <Carousel>
    <CarouselItem height="50%"><img style={{height: "400px",width:"100%"}}alt="our pool" src={imgSrc1}></img></CarouselItem>
    <CarouselItem height="50%"><img style={{height: "400px",width:"100%"}} alt="image2" src={imgSrc2}></img> </CarouselItem>
    <CarouselItem height="50%"><img style={{height: "400px",width:"100%"}} alt="image3" src={imgSrc3}></img></CarouselItem>
    </Carousel>
    </div>
  )

}

export default MainPage