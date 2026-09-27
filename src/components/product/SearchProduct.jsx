import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext.jsx';
import { Link ,useParams} from 'react-router-dom';

const SearchProduct = ({ category }) => {
    const { products } = useContext(AppContext);
    const [searchproduct, setsearchproduct] = useState([]);
    const {term}=useParams();
    useEffect(() => {
        setsearchproduct(products.filter((data) => data?.title?.toLowerCase().includes(term.toLowerCase())));
    }, [products, term]);
    return (
        <div className='container text-center'>
            <div className="container d-flex justify-content-center align-items-center">
                <div className="row bg-red d-flex justify-content-center align-items-center w-100">
                    {searchproduct?.map((product) => (
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
                                        <button className="btn btn-warning">
                                            Add To Cart
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default SearchProduct;