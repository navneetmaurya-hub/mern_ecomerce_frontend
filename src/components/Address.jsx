import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import  AppContext  from './context/AppContext';
import { useNavigate } from 'react-router-dom';

const Address = () => {
  const {shippingAddress,userAddress}=useContext(AppContext);
  const navigate=useNavigate();
  const[formData,setformData]=useState({
    fullName:"",
    address:"",
    city:"",
    state:"",
    country:"",
    pincode:"",
    phoneNumber:""
  });
  const onChangeHandler=((e)=>{
    const {name,value}=e.target;
    setformData({...formData,[name]:value})
  });
  const {fullName,address,city,state,country,pincode,phoneNumber}=formData;
  const submitHandler=async (e)=>{
    e.preventDefault();
   const result= await shippingAddress(fullName,address,city,state,country,pincode,phoneNumber);
   
   if(result.success){
    console.log(result);
    console.log("successs ");
    navigate("/Checkout");
   }
  
    setformData({
      fullName: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      phoneNumber: ""
    })
  }
  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-black">

      <div
        className="container-fluid p-4"
        style={{
          maxWidth: "900px",
          border: "2px solid #7d8c24",
          borderRadius: "8px",
          backgroundColor: "#000",
        }}
      >

        {/* Heading */}
        <div className="text-center mb-3">
          <h2 className="fw-bold text-white">
            Shipping Address
          </h2>
        </div>

        <form onSubmit={submitHandler}>

          {/* Row 1 */}
          <div className="row">

            {/* Full Name */}
            <div className="col-md-4 mb-3">
              <label className="form-label fw-semibold text-white">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={onChangeHandler}
                className="form-control"
                required
              />
            </div>

            {/* Country */}
            <div className="col-md-4 mb-3">
              <label className="form-label fw-semibold text-white">
                Country
              </label>

              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={onChangeHandler}
                className="form-control"
                required
              />
            </div>

            {/* State */}
            <div className="col-md-4 mb-3">
              <label className="form-label fw-semibold text-white">
                State
              </label>

              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={onChangeHandler}
                className="form-control"
                required
              />
            </div>

          </div>


          {/* Row 2 */}
          <div className="row">

            {/* City */}
            <div className="col-md-4 mb-3">
              <label className="form-label fw-semibold text-white">
                City
              </label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={onChangeHandler}
                className="form-control"
                required
              />
            </div>

            {/* Pincode */}
            <div className="col-md-4 mb-3">
              <label className="form-label fw-semibold text-white">
                Pincode
              </label>

              <input
                type="number"
                name="pincode"
                value={formData.pincode}
                onChange={onChangeHandler}
                className="form-control"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="col-md-4 mb-3">
              <label className="form-label fw-semibold text-white">
                Phone Number
              </label>

              <input
                type="number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={onChangeHandler}
                className="form-control"
                required
              />
            </div>

          </div>


          {/* Address */}
          <div className="mb-3">

            <label className="form-label fw-semibold text-white">
              AddressLine/Nearby
            </label>

            <textarea
              name="address"
              value={formData.address}
              onChange={onChangeHandler}
              className="form-control"
              rows="2"
              required
            />

          </div>


          {/* Submit Button */}
          <div className="d-flex justify-content-center mt-4">

            <button
              type="submit"
              className="btn btn-primary fw-semibold"
              style={{
                width: "48%",
              }}
            
            >
              Submit
            </button> 
          </div>
        </form>
        {/* Old Address Button */}
            {userAddress && (
              <div className="d-flex justify-content-center mt-3">

                <button
                  type="button"
                  className="btn btn-warning fw-semibold"
                  style={{
                    width: "48%",
                  }}
                  onClick ={() => {
                    navigate("/checkout");
                  }}
                >
                  Use Old Address
                </button>

              </div>
            )}
          

      </div>

    </div>
  )
};

export default Address;
