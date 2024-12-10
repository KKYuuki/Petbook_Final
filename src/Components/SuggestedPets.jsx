import './SuggestedPets.css'
import { useState } from 'react'


function SuggestedPets() {

  const [Petpeeve, setPetpeeve] = useState(
    [
      {id: 1, PetName:'Coby',like: 0, Caption:'Hello World',Photo:'nothingfornow',url:'https://th.bing.com/th/id/OIP.hngZqGVjacTN1z3VMqBkoAHaHi?rs=1&pid=ImgDetMain'},
      {id: 2, PetName:'Oslo',like: 0, Caption:'Hello World',url:'https://th.bing.com/th/id/R.910435f6c9f5114a6c2cc454aec8c616?rik=MVc79DB40fnuQA&riu=http%3a%2f%2fi.huffpost.com%2fgen%2f1358004%2fthumbs%2fo-PET-SELFIES-facebook.jpg&ehk=64n7TMGGqUU0NKbE1%2buYLJzx7fyyBgeS0jbiG3Z4DpM%3d&risl=&pid=ImgRaw&r=0'},
      {id: 3, PetName:'Tofu',like: 0, Caption:'Hello World',url:'https://i.pinimg.com/originals/34/2a/f5/342af52dd33dd2e366225ec55b93fe85.jpg'},
      {id: 4, PetName:'Tofu',like: 0, Caption:'Hello World',url:'https://i.pinimg.com/originals/34/2a/f5/342af52dd33dd2e366225ec55b93fe85.jpg'},
      {id: 5, PetName:'Tofu',like: 0, Caption:'Hello World',url:'https://i.pinimg.com/originals/34/2a/f5/342af52dd33dd2e366225ec55b93fe85.jpg'},
      {id: 6, PetName:'Tofu',like: 0, Caption:'Hello World',url:'https://i.pinimg.com/originals/34/2a/f5/342af52dd33dd2e366225ec55b93fe85.jpg'}
    ]
  );

  const randomPets = Petpeeve
  .sort(() => 0.5 - Math.random()) 
  .slice(0, 5); 


   return(
    <>
    <div className='Sticky1'>
       <h1 className='SuggName'>SUGGESTED PETS</h1>
       <div className='container2'>
       {
        randomPets.map((Petpeeve) =>(
          <div className='sugg' key={Petpeeve.id}>
            <img className='SuggPets' src={Petpeeve.url} alt='PetPhoto'/>
            <h5 className='SuggName'>I'm {Petpeeve.PetName}</h5>
          </div>
        )
      )
    }
       </div>
    </div>
   
    
    </>
   ) 

}
 

export default SuggestedPets