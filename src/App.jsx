import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './Components/LandingPage/LandingPage'
import AdminPortal from './Components/Admin/AdminPortal'
import UserPortal from './Components/Users/UserPortal'
import "./assets/styles/auramart.css"

const App = () => {

  return (
   <>

   <div className="auramart">
     <Routes>

      <Route element={<LandingPage />} path='/'/>
      <Route element={<AdminPortal/>} path='/adminportal/*'/>
      <Route element={<UserPortal/>} path='/userportal/*'/>

     </Routes>


   </div>
   
   
   
   
   
   
   </>
  )
}

export default App
