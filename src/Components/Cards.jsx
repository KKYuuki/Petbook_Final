import { useState } from 'react'
import Pawheart from '../assets/img/Heart.svg'
import PawheartUnliked from '../assets/img/Unliked.svg'
import './Cards.css'


function Cards() {

  const [PetUsers, setUser] = useState(
    [
      {id: 1, PetName:'Coby',like: false, Caption:'Hello World',Photo:'nothingfornow',url:'https://th.bing.com/th/id/OIP.hngZqGVjacTN1z3VMqBkoAHaHi?rs=1&pid=ImgDetMain',Comments:"nice!"},
      {id: 2, PetName:'Oslo',like: false, Caption:'Hello World',url:'https://th.bing.com/th/id/R.910435f6c9f5114a6c2cc454aec8c616?rik=MVc79DB40fnuQA&riu=http%3a%2f%2fi.huffpost.com%2fgen%2f1358004%2fthumbs%2fo-PET-SELFIES-facebook.jpg&ehk=64n7TMGGqUU0NKbE1%2buYLJzx7fyyBgeS0jbiG3Z4DpM%3d&risl=&pid=ImgRaw&r=0',Comments:"Hello"},
      {id: 3, PetName:'Wangwang',like: false, Caption:'Hello World',url:'https://i.pinimg.com/originals/34/2a/f5/342af52dd33dd2e366225ec55b93fe85.jpg',Comments:"nice!"},
      {id: 4, PetName:'Tantoy',like: false, Caption:'Hello World',url:'https://th.bing.com/th/id/OIP.UVTlzKjSagzHXEiW_AYXYwHaE7?w=626&h=417&rs=1&pid=ImgDetMain',Comments:"nice!"},
      {id: 5, PetName:'Adi Baby',like: false, Caption:'Hello World',url:'https://img.freepik.com/premium-photo/two-funny-dogs-sitting-front-camera-taking-selfie_124507-86534.jpg',Comments:"nice!"},
      {id: 6, PetName:'Tofu',like: false, Caption:'Hello World',url:'https://cdn.shopify.com/s/files/1/0935/7636/files/Bend-Pet-Resort-Custom-Pet-Care-Golden-Retreiver-with-iPhone-Dog-Selfie_large.jpg?10138622307543607676',Comments:"nice!"}
    ]
  );

  const toggleLike = (id) => {
    setUser(
      PetUsers.map((PetUsers) =>
        PetUsers.id === id ? { ...PetUsers, like: !PetUsers.like } : PetUsers
      )
    );
  };


  return (
    <>
    <div className='Card'>
       {
        PetUsers.map((PetUsers) =>(
          <div className='PostCaption' key={PetUsers.id}>
            <h1 className='Petname'>{PetUsers.PetName}</h1>
            <p className='PostCaption1'>{PetUsers.Caption}</p>
           <img className='Petfeed' src={PetUsers.url} alt='PetPhoto'/>
            <br/>  
            <img onClick={() => toggleLike(PetUsers.id)} className='PawHeart' src={PetUsers.like ? Pawheart : PawheartUnliked}/>
            <span className='Status'>{PetUsers.like ? "Liked" : "Like"}</span>
            <div className='CommentSection'>
            <input className='Comment' placeholder='Say Something nice!'/>
            <button className='CommentButt'>Comment</button>
            <p className='Comments'><a ><img className='CommentSectionPhoto' src={PetUsers.url}/></a>{PetUsers.Comments}</p>
            </div>
          </div>
        )
      )
    }
    </div>
    </>
  );
}

export default Cards;