import React, { useState } from "react";
import gnom from "../../../../images/gnom.png";
import steps from "../../../../images/steps.png";
import axios from "axios";
function Section3() {
  const [tel, setTel] = useState({});
  async function getCoupon(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3333/sale/send", tel);
    } catch (error) {
      console.error(error.message);
    }
    e.target.reset();
  }
  function handleChange(e) {
    const tels = {
      id: Date.now(),
      tel: e.target.value,
    };
    setTel(tels);
  }
  return (
    <section className="section3">
      <div className="container-section3">
        <div className="content-section3">
          <div className="first-part-section3">
            <div className="first-part-img">
              <img src={gnom} alt="gnom" className="gnom" />
              <img src={steps} alt="gnom" className="steps" />
            </div>
          </div>
          <div className="second-part-section3">
            <div className="title-second-part-section3">
              <h1>5% off</h1>
              <h3>on the first order</h3>
            </div>
            <form className="form-section3" onSubmit={getCoupon}>
              <input
                type="tel"
                name="telephone"
                className="input-section3"
                placeholder="+49"
                onChange={handleChange}
              />
              <button className="btn-section3">Get a discount</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Section3;
