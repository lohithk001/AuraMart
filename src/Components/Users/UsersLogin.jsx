import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserLogin = () => {

  let [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  let [err, setErr] = useState("");

  let navigate = useNavigate();

  // Hardcoded User Credentials
  let user_credentials = {
    email: "user@aura.com",
    password: "user123"
  };

  let { email: user_email, password: user_pswd } = user_credentials;

  let handleInput = (e) => {

    let key = e.target.name;
    let value = e.target.value;

    setFormData({
      ...formData,
      [key]: value
    });
  };

  let [email, password] = [formData.email, formData.password];

  let handleSubmit = (e) => {

    e.preventDefault();

    let errDesign = {
      color: "red",
      fontSize: "15px",
      fontWeight: "bold"
    };

    // Check Credentials
    if (email === user_email) {

      if (password === user_pswd) {

        setErr("");
        toast.success("Login successful");

        navigate("/userportal");

      } else {

        setErr(
          <h4 style={errDesign}>Password is incorrect</h4>
        );

        toast.error("Login failed");
      }

    } else {

      setErr(
        <h4 style={errDesign}>Email is incorrect</h4>
      );

      toast.error("Login failed");
    }
  };

  return (
    <>
      <div className="user-login">

        <h1>User Login</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Email"
            onChange={handleInput}
            name="email"
            value={formData.email}
            required
          />

          <input
            type="password"
            placeholder="Password"
            onChange={handleInput}
            name="password"
            value={formData.password}
            required
          />

          <div>
            {err}
          </div>

          <button id="user-login-btn">
            User Login
          </button>

        </form>
      </div>
    </>
  );
};

export default UserLogin;