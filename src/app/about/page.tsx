import React from 'react'
import AboutHero from './components/AboutHero'
import Boxes from './components/Boxes'
import Managers from './components/Managers'
import Services from './components/Services'

const page = () => {
  return (
    <div>
        <AboutHero/>
        <Boxes/>
        <Managers/>
        <Services/>
    </div>
  )
}

export default page