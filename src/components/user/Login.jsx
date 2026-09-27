import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext.jsx';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const {userLogin}=useContext(AppContext);
  const navigate=useNavigate();
  const[loginData,setloginData]=useState({
    email:"",
    password:""
  });
  const onChangeHandler=((e)=>{
    console.log("navneet");
    const {name,value}=e.target;
    setloginData({...loginData,[name]:value})
  });
  const {email,password}=loginData;
  const submitHandler=async (e)=>{
    e.preventDefault();
    const result =await userLogin(email,password);
    if(result.success){
      navigate('/');
    }
    console.log(result);
  }
  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">

      <div className="container-fluid min-vh-100 bg-light d-flex justify-content-center align-items-center">

      <div
        className="card shadow-lg border-0 p-4"
        style={{ width: "450px" }}
      >

        {/* Heading */}
        <div className="text-center mb-4">
          <h2 className="fw-bold">
            Login Account
          </h2>

          <p className="text-muted">
            Login to continue shopping
          </p>
        </div>

        <form onSubmit={submitHandler}>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={onChangeHandler}
              className="form-control form-control-lg"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={onChangeHandler}
              className="form-control form-control-lg"
              placeholder="Enter your password"
              required
            />
          </div>


          {/* Login Button */}
          <button
            type="submit"
            className="btn btn-warning btn-lg w-100 fw-semibold"
          >
            Login
          </button>

        </form>

      </div>

    </div>

    </div>
  )
};

export default Login;