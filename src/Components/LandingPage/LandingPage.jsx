import React, { useState } from 'react'
import AdminLogin from '../Admin/AdminLogin'
import UsersLogin from '../Users/UsersLogin'

const LandingPage = () => {
  const [isAdmin, setIsAdmin] = useState(false)

  return (
    <>
    {/* <video src='/src/assets/background.mp4' autoPlay loop muted /> */}
      <div className="landing-page">
        <img src="/src/assets/hero.png" alt="Landing Background" className="background-image" />
        <h1>Welcome to <span>AuraMart</span></h1>

        <div className="container">
          <div className="btnbox">
            <div className={`thumb ${isAdmin ? 'admin' : ''}`} />
            <button onClick={() => setIsAdmin(false)} className={!isAdmin ? 'active' : ''}>User Login</button>
            <button onClick={() => setIsAdmin(true)} className={isAdmin ? 'active' : ''}>Admin Login</button>
          </div>



          <div className="formbox">
           <AdminLogin/>
           <UsersLogin/>
          </div>




        </div>



      </div>
    </>
  )
}

export default LandingPage