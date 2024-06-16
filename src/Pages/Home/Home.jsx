import React from 'react'
import { Link } from 'react-router-dom';
import "./Home.css"

function Home() {
  return (
    <div className='home'>
        <h1 className='welcome'>Veterinary Management System!</h1>
        <br></br>
        <br></br>
        <br></br>
        <Link to="/customer" className="welcome-btn">Welcome!</Link>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <p>Created with <span style={{color:'red'}}>love</span> by Arda Canbakış</p>

    </div>
  )
}
export default Home