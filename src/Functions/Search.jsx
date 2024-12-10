import '../Functions/Css/Search.css'
import { useState } from 'react'

function Search()
{

    
    return(
        <>
        <div className='SearchT'>
            <input className='SearchBar' placeholder='Pet Search' id='SearchPet' />
            <button className='SearchButt'>SEARCH</button>
        </div>    
        </>
    )

}

export default Search