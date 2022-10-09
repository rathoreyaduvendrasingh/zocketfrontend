import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Stepper from "../Stepper/Stepper";

const API = 'https://zocketbackend.herokuapp.com'
const Step2 = () => {
  const [active, setActive] = useState(-1);
  const [products, setProducts] = useState("");
  const [product, setProduct] = useState("");

  const getProducts = async () => {
    try {
      let res = await axios.get(`${API}/api/products`);
      if (res.data.length) {
        setProducts([...res.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
    let req_product = localStorage.getItem("product_z")
      ? localStorage.getItem("product_z")
      : "";
    let req_active = localStorage.getItem("step_2_active")
      ? localStorage.getItem("step_2_active")
      : -1;
    setProduct(req_product);
    setActive(Number(req_active));
  }, []);

  const submitHandler = () => {
    JSON.stringify(localStorage.setItem("product_z", product));
    JSON.stringify(localStorage.setItem("step_2_active", active));
  };

  let navigate = useNavigate();
  return (
    <div className="step1_root">
      <div className="row">
        <div className="col-10">
          <h1>Your Ad Campaign</h1>
          <h6>Launch your ad in 4 easy steps</h6>
        </div>
        <button className="col-1 btn" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
      <div className="row stepper_block">
        <div className="col-12">
          <Stepper />
        </div>
      </div>

      <div className="step_1_main">
        <div className="row">
          <div className="col-12 d-flex">
            <h2>Choose the Product? </h2>
            <h5>(Step 2 of 4)</h5>
          </div>
          <hr />
        </div>
        <div className="row d-flex justify-content-center align-items-center">
          {products.length > 0 && (
            <>
              {products.map((product, i) => (
                <div
                  className={`col-3 step_1_card ${
                    active === i && "conslusion_active"
                  }`}
                  key={i}
                  onClick={() => {
                    setActive(i);
                    setProduct(product.name);
                  }}
                >
                  <div className="row">
                    <div className="col-3 d-flex justify-content-center align-items-center">
                      <img src="./images/sample_product1.png" alt="" />
                    </div>
                    <div className="col-9">
                      <h3>{product.name}</h3>
                      <h4>Rs. {product.amount}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="row">
          <div className="col-10"></div>
          <div className="col-2">
            <Link to="/selection3">
              <button
                className="btn btn-block button-1"
                disabled={product === ""}
                onClick={() => submitHandler()}
              >
                Continue
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;
