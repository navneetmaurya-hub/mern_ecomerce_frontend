import React, { useContext, useState } from 'react'
import { Link, useNavigate,useLocation } from 'react-router-dom';
import Register from './user/Register';
import AppContext from './context/AppContext.jsx';
export const Navbar = () => {
  const[searchTerm,setsearchTerm]=useState("");
  const navigate=useNavigate();
  const {setfilteredData,products,logout,isAuthenticated,cart}=useContext(AppContext);
  console.log(cart);
  const location=useLocation();
  const filterbyCategory = (cat) => {
    const result = products.filter(
      (data) => data.category?.toLowerCase() === cat?.toLowerCase()
    );
    setfilteredData(result);
  };

  const filterbyprice = (price) => {
    const result = products.filter(
      (data) => data.price>=price
    );
    console.log(result);
    setfilteredData(result);
  };

  
  const submithandler=(e)=>{
    e.preventDefault();
    navigate(`/product/search/${searchTerm}`)
    setsearchTerm("");
  }
  return (
    <>
       <div className="sticky-top">
        <nav
          className="navbar navbar-expand-lg sticky-top"
          style={{ backgroundColor: "#4b1685" }}
        >
          <div className="container-fluid px-5">

            {/* Website Name */}
            <Link to="/" className="navbar-brand text-white fw-bold">
              MERN E - Commerce
            </Link>

            {/* Search + Search Button */}
            <form className="position-absolute start-50 translate-middle-x d-flex gap-2" onSubmit={submithandler}>
              <input
                value={searchTerm}
                type="text"
                className="form-control"
                placeholder='Search Products'
                style={{
                  width: "200px",
                  height: "30px"
                }}
                onChange={(e) => setsearchTerm(e.target.value)}
              />

              <button className="btn btn-warning btn-sm" type="Submit">
                Search
              </button>
            </form>

            {/* Right Buttons */}
            <div className="d-flex align-items-center gap-3 ms-auto">
              {isAuthenticated && (
                <>
                  <Link to="/cart" type="button" className="btn btn-primary position-relative mx-3">
                    <span className="material-symbols-outlined">
                      cart
                    </span>
                    {cart?.items?.length>0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cart?.items?.length}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                    )}
                    
                  </Link> 
                
                  <Link to="/profile" className="btn btn-primary btn-sm">
                    profile
                  </Link>
                  <button className="btn btn-danger btn-sm" onClick={() => {
                    logout();
                    navigate('/')
                  }}>
                    logout
                  </button>
                </>
              )}

              {!isAuthenticated && (
                <>
                  <Link to="/login" className="btn btn-warning btn-sm">
                    login
                  </Link>

                  <Link to="/register" className="btn btn-warning btn-sm">
                    register
                  </Link>
                </>
              )}
            </div>

          </div>
        </nav>

        {location.pathname == "/" && (
          <div className="sub-bar">
            <div className="items" onClick={() => setfilteredData(products)}>No Filter</div>
            <div className="items" onClick={() => filterbyCategory("Mobile")}>Mobiles</div>
            <div className="items" onClick={() => filterbyCategory("Laptop")}>Laptop</div>
            <div className="items" onClick={() => filterbyCategory("Camera")}>Camera's</div>
            <div className="items" onClick={() => filterbyCategory("Headphone")}>Headphone</div>
            <div className="items" onClick={() => filterbyprice(10000)}>10000</div>
            <div className="items" onClick={() => filterbyprice(30000)}>30000</div>
            <div className="items" onClick={() => filterbyprice(60000)}>60000</div>
            <div className="items" onClick={() => filterbyprice(90000)}>90000</div>
            <div className="items" onClick={() => filterbyprice(100000)}>100000</div>
          </div>
        )}
      </div>
    </>
  )
};

export default Navbar;
