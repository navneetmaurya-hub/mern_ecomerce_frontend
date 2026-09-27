import React from 'react';
import AppContext from '../context/AppContext.jsx';
import { useContext } from 'react';
import ProductDetail from './ProductDetail.jsx';
import { Link } from 'react-router-dom';



const ShowProduct = () => {
  const { products,filteredData,addToCart} = useContext(AppContext);
  return (
    <>
     <div className="container d-flex justify-content-center align-items-center">
        <div className="row bg-red d-flex justify-content-center align-items-center w-100">
          {filteredData?.map((product) => (
            <div
              key={product._id}
              className="d-flex justify-content-center align-items-center my-3 col-md-4"
            >
              <div className="card bg-dark text-light text-center" style={{ width: "18rem" }}>
                <Link to={`/product/${product._id}`} className="d-flex justify-content-center align-items-center p-3">
                  <img
                    src={product.imgSrc}
                    className="card-img-top"
                    alt={product.title}
                    style={{
                      height: "200px",
                      width: "200px",
                      borderRadius: "10px",
                      border: "2px solid yellow",
                      objectFit: "cover",
                    }}
                  />
                </Link>

                <div className="card-body ">
                  <h5 className="card-title">
                    {product.title}
                  </h5>
                  
                  
                  <div className="my-3">
                    <button className="btn btn-primary mx-3">
                      {product.price}{""} {"₹"}
                    </button>
                    <button className="btn btn-warning" onClick={() => addToCart(product._id, product.title, product.price, 1, product.imgSrc)}>
                      Add To Cart
                    </button>
                  </div>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  
    </>
  )
};

export default ShowProduct;