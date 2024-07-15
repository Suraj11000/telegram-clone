import React from 'react'
import Navbar from '../componenets/Navbar'
import Search from '../componenets/search'
import Info from '../componenets/info'

const Home = () => {
  return (
    <div className='flex'>
      <Navbar/>
      <Search/>
      <Info/>
    </div>
  )
}

export default Home
