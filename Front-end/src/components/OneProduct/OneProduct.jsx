import React, { useEffect, useState } from "react";
import {useParams } from "react-router-dom";
import MapPage from "../Map/MapPage";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../Actions/addtoCartAction";
function OneProduct() {
  const { id } = useParams();
  const [oneProduct, setOneProduct] = useState([]);
  const [buttonText, setButtonText]= useState("Add to cart")
  const dispatch = useDispatch();
  useEffect(() => {
    async function getProductsFromCategories() {
      try {
        const response = await axios.get(
          `http://localhost:3333/products/${id}`
        );
        setOneProduct(response.data);
      } catch (error) {
        console.error(error.message);
      }
    }
    getProductsFromCategories();
  }, [id]);
  const calculateDiscount = (price, discontPrice) => {
    const discount = price - discontPrice;
    const discountNew = (discount / price) * 100;
    return discountNew.toFixed(0);
  };
  function handelAddProduct(elem) {
    dispatch(addProduct(elem));
    setButtonText(`In cart  ✓`);
  }
  return (
    <div className="one-product-container">
      {oneProduct.map((elem) => {
        return (
          <div className="one-product-content" key={elem.id}>
            <h1>{elem.title}</h1>
            <div className="product">
              <img src={`http://localhost:3333/${elem.image}`} alt="product" />
              <div className="info-product">
                <div className="price">
                  {elem.discont_price ? (
                    <>
                      <h2 id="product-new-price">{elem.discont_price}$</h2>
                      <h2 id="product-first-price" className="discounted">
                        {elem.price}$
                      </h2>
                      <h2 id="product-discount">
                        {calculateDiscount(elem.price, elem.discont_price)}%
                      </h2>
                    </>
                  ) : (
                    <h2
                      id="product-normal-price"
                      style={{ textAlign: "center" }}
                    >
                      {elem.price}$
                    </h2>
                  )}
                </div>
                <button
                  className="btn-to-cart"
                  onClick={() => handelAddProduct(elem)}>
                  {buttonText}</button>
                <h4>Description</h4>
                <p>{elem.description}</p>
              </div>
            </div>
          </div>
        );
      })}
      <MapPage></MapPage>
    </div>
  );
}

export default OneProduct;
