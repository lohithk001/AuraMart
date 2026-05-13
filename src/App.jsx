import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './Components/LandingPage/LandingPage'
import AdminPortal from './Components/Admin/AdminPortal'
import "./assets/styles/auramart.css"

const App = () => {

  return (
   <>

   <div className="auramart">
     <Routes>

      <Route element={<LandingPage />} path='/'/>
      <Route element={<AdminPortal/>} path='/admin'/>

     </Routes>


   </div>
   
   
   
   
   
   
   </>
  )
}

export default App
