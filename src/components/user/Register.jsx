import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext.jsx';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const {register}=useContext(AppContext);
  const navigate=useNavigate();
  const[formData,setformData]=useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:""
  });
  const onChangeHandler=((e)=>{
    console.log("navneet");
    const {name,value}=e.target;
    setformData({...formData,[name]:value})
  });
  const {name,email,password,confirmPassword}=formData;
  const submitHandler=async (e)=>{
    e.preventDefault();
   const result= await register(name,email,password,confirmPassword);
   if(result.success){
    navigate('/login');
   }
    console.log(formData);
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
            Create Account
          </h2>

          <p className="text-muted">
            Register to continue shopping
          </p>
        </div>

        <form onSubmit={submitHandler}>

          {/* Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChangeHandler}
              className="form-control form-control-lg"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
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
              value={formData.password}
              onChange={onChangeHandler}
              className="form-control form-control-lg"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="form-label fw-semibold">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={onChangeHandler}
              className="form-control form-control-lg"
              placeholder="Confirm your password"
              required
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="btn btn-warning btn-lg w-100 fw-semibold"
          >
            Create Account
          </button>

        </form>

        {/* Login */}
        <div className="text-center mt-4">
          <span className="text-muted">
            Already have an account?{" "}
          </span>

          <Link
            to="/login"
            className="text-decoration-none fw-semibold"
          >
            Login
          </Link>
        </div>

      </div>

    </div>

    </div>
  )
};

export default Register;