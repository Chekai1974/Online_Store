import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Section4() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    try {
      async function getProductsAll() {
        const response = await axios.get("http://localhost:3333/products/all");
        setProducts(response.data);
        console.log(products);
      }
      getProductsAll();
    } catch (error) {
      console.error(error.message);
    }
  }, []);
  const calculateDiscount = (price, discontPrice) => {
    const discount = price - discontPrice;
    const discountNew = (discount / price) * 100;
    return discountNew.toFixed(0);
  };
  const discontProducts = products
    .filter((elem) => elem.discont_price)
    .slice(0, 3);
  const navigation = useNavigate();
  function goToAllSales() {
    navigation("/allsales");
  }
  function goToProduct(id) {
    navigation(`/products/${id}`);
  }
  return (
    <section className="section4">
      <div className="container-section4">
        <div className="content-section4">
          <div className="sale-top-bar-section4">
            <h1>Sale</h1>
            <button className="section4-btn" onClick={goToAllSales}>
              All sales
            </button>
          </div>
          <div className="section4-blocks">
            {discontProducts.map((elem) => {
              if (elem.discont_price) {
                const discountNew = calculateDiscount(
                  elem.price,
                  elem.discont_price
                );
                return (
                  <div className="section4-one-block" key={elem.id}>
                    <img
                      src={`http://localhost:3333/${elem.image}`}
                      alt=""
                      onClick={() => goToProduct(elem.id)}
                    />
                    <div className="section4-prices">
                      <h2 id="section4-new-price">{elem.discont_price}$</h2>
                      <h2 id="section4-first-price">{elem.price}$</h2>
                      <h2 id="section4-discount">{discountNew}%</h2>
                    </div>
                    <p>{elem.title}</p>
                  </div>
                );
              } else {
                return null;
              }
            })}
            <div onClick={goToAllSales} className="more">
              <h1>More</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Section4;
