import React from 'react'
import DrawerAppBar from '../components/navbar/Navbar.react'
import EventPages from '../wrappers/Events'

const events = () => {
  return (
   <>
     <DrawerAppBar />
    <EventPages />
   </>
  )
}

export default events
