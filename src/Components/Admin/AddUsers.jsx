import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddUsers = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !username || !role || !phone) {
      alert("Please fill in all fields.");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      username: username.trim(),
      role,
      phone: phone.trim(),
    };

    try {
      await axios.post("http://localhost:4000/users", newUser);
      alert("User added successfully!");

      setName("");
      setEmail("");
      setUsername("");
      setRole("");
      setPhone("");

      navigate("/adminportal");
    } catch (error) {
      console.error(error);
      alert("Unable to add user. Make sure json-server is running.");
    }
  };

  return (
    <div style={{ maxWidth: 560, margin: "40px auto", padding: 24, background: "#fff", borderRadius: 16, boxShadow: "0 12px 35px rgba(0,0,0,0.08)" }}>
      <h1 style={{ marginBottom: 24, color: "#1f2937" }}>Add User</h1>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
        <label>
          Name
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #cbd5e1" }} />
        </label>

        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #cbd5e1" }} />
        </label>

        <label>
          Username
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #cbd5e1" }} />
        </label>

        <label>
          Role
          <select value={role} onChange={(e) => setRole(e.target.value)} style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #cbd5e1" }}>
            <option value="">Select role</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="user">User</option>
          </select>
        </label>

        <label>
          Phone
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #cbd5e1" }} />
        </label>

        <button type="submit" style={{ padding: 12, borderRadius: 12, background: "#4f46e5", color: "white", border: "none", fontWeight: 600, cursor: "pointer" }}>
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUsers;
