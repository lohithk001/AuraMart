import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const AdminLogin = () => {

  let [formData, setFormData] = useState({email:"", password:""})
  let [err, setErr] = useState("")
  let handleInput = (e) => {

    let key = e.target.name
    let value = e.target.value

   setFormData({...formData, [key]: value})


    
  }



   let [email, password] = [formData.email, formData.password]

  let admin_credentials = {
    email: "admin@aura.com",
    password: "aura123"
  }

 let { email: admin_email, password: admin_pswd } = admin_credentials






 // hook to navigate to different routes programmatically present in react-router-dom v6

 let navigate = useNavigate()

  let handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)

    let errDesign = {
        color: "red",
        fontSize: "15px",
        fontWeight: "bold"
    }



    //todo: check credentials are matching or not 
    if (email === admin_email){
        if(password === admin_pswd){
          setErr("")
          toast.success("Login successful")
          navigate('/admin')
           
        }else{
            setErr(<h4 style={errDesign}>Password is incorrect</h4>)
            toast.error("Login failed")
             }
    }else{
    setErr(<h4 style={errDesign}>Email is incorrect</h4>)
    toast.error("Login failed")
         }


     
  }

 


 
  
  return (
   <>
   <div className="admin-login">

    <h1>Admin Login</h1>

     <form onSubmit={handleSubmit}>
       <input type="email" 
       placeholder="Email"
       onChange={handleInput}
       name='email'
       value={formData.email}
       required
       />


      <input type="password" 
      placeholder="Password"
      onChange={handleInput}
      name='password'
      value={formData.password}
      required
       />

       <div>
       {err}
       </div>



       <button id='admin-login-btn'>Admin Login</button>



    </form>
   </div>
    
   </>
  )
}

export default AdminLogin
