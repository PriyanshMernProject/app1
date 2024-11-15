import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    console.log(data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "http://3.110.153.253:3001/api/v1/user/register",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await res.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
    //navigate("/login");
  };
  return (
    <>
      <div class="main">
        <h2>Registration Form</h2>
        <form onSubmit={handleSubmit}>
          <label for="first">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            value={data.firstName}
            onChange={handleChange}
          />

          <label for="last">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            value={data.lastName}
            onChange={handleChange}
          />

          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={data.email}
            onChange={handleChange}
          />

          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            pattern="^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])\S{8,}$"
            title="Password must contain at least one number, 
                           one alphabet, one symbol, and be at 
                           least 8 characters long"
            value={data.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Submit</button>
        </form>
        <p>
          Login?
          <a href="/login">Login</a>
        </p>
      </div>
    </>
  );
};

export default Register;
