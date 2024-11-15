import React, { useState } from "react";
import "./style.css";

const Login = () => {
  const [data, setData] = useState({
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
      const res = await fetch("http://3.110.153.253:3001/api/v1/user/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div class="main">
        <h1>GeeksforGeeks</h1>
        <h3>Enter your login credentials</h3>
        <form onSubmit={handleSubmit}>
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your Email"
            required
            value={data.email}
            onChange={handleChange}
          />

          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your Password"
            required
            value={data.password}
            onChange={handleChange}
          />

          <div class="wrap">
            <button type="submit" onclick="solve()">
              Submit
            </button>
          </div>
        </form>
        <p>
          Not registered?
          <a href="/">Create an account</a>
        </p>
      </div>
    </>
  );
};

export default Login;
