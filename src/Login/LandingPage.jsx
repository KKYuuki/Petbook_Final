import './LandingPage.css'
import photo1 from '../assets/img/Pet5.jpg'
import photo2 from '../assets/img/Pet1.jpg'
import photo3 from '../assets/img/Pet2.jpg'
import photo4 from '../assets/img/Pet3.jpg'
import photo5 from '../assets/img/Pet4.jpg'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js' 

function CarouselLogin(){

    return(
        <>
        <div className='TheCarouselLogin'>
           <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                <div class="carousel-item active">
                <img className='CarouselPhoto' src={photo1} alt="..."/>
                </div>
                <div class="carousel-item">
                <img className='CarouselPhoto' src={photo2} alt="..."/>
                </div>
                <div class="carousel-item">
                <img className='CarouselPhoto' src={photo3} alt="..."/>
                </div>
                <div class="carousel-item">
                <img className='CarouselPhoto' src={photo4} alt="..."/>
                </div>
                <div class="carousel-item">
                <img className='CarouselPhoto' src={photo5} alt="..."/>
                </div>
                </div>
</div>
</div>
 
        </>
    )
}




export default CarouselLogin