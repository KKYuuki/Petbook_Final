import '../Functions/Css/Notifc.css'
import Photo from '../assets/img/heart.svg'
import { useState } from 'react'

function Notif()
{
    const[Post,yourPost] = useState(
        [
            {id:1,Caption:'Hello world',url:'https://th.bing.com/th/id/R.910435f6c9f5114a6c2cc454aec8c616?rik=MVc79DB40fnuQA&riu=http%3a%2f%2fi.huffpost.com%2fgen%2f1358004%2fthumbs%2fo-PET-SELFIES-facebook.jpg&ehk=64n7TMGGqUU0NKbE1%2buYLJzx7fyyBgeS0jbiG3Z4DpM%3d&risl=&pid=ImgRaw&r=0',like:4},
            {id:2,Caption:'Hello world',url:'https://th.bing.com/th/id/R.910435f6c9f5114a6c2cc454aec8c616?rik=MVc79DB40fnuQA&riu=http%3a%2f%2fi.huffpost.com%2fgen%2f1358004%2fthumbs%2fo-PET-SELFIES-facebook.jpg&ehk=64n7TMGGqUU0NKbE1%2buYLJzx7fyyBgeS0jbiG3Z4DpM%3d&risl=&pid=ImgRaw&r=0',like:6},
            {id:3,Caption:'Hello world',url:'https://th.bing.com/th/id/R.910435f6c9f5114a6c2cc454aec8c616?rik=MVc79DB40fnuQA&riu=http%3a%2f%2fi.huffpost.com%2fgen%2f1358004%2fthumbs%2fo-PET-SELFIES-facebook.jpg&ehk=64n7TMGGqUU0NKbE1%2buYLJzx7fyyBgeS0jbiG3Z4DpM%3d&risl=&pid=ImgRaw&r=0',like:7},
        ]
    )

    return(
        <>
        <div className='Notif' key={Post.id}>
        {
        Post.map((Post) =>(
            <div className='Notifs'>
                <img className='NotifIm' src={Post.url}/>
                <img className='NotifIm2' src={Photo}/>
                <p className='NotifIm3'>{Post.Caption}</p>
                <p className='NotifIm1'>{Post.like}</p>
                <p className='Nf'>LIKES</p>
            </div>
        )
      )
    }
        </div>
    </>
    )
}

export default Notif