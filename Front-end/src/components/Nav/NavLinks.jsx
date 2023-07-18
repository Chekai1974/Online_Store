import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import BasketLink from "./BasketLink";
import CatalogBtn from "./CatalogBtn";
import logo from "../../images/logoNav.png";
import burger from "../../images/burger.png";
function NavLinks() {
  const [active, setActive] = useState("nav");
  const [btnClicked, setBtnClicked] = useState(false);
  const location = useLocation();
  function updateActive() {
    if (!btnClicked) {
      setActive("nav active");
      setBtnClicked(!btnClicked);
    } else {
      setActive("nav");
      setBtnClicked(!btnClicked);
    }
  }
  return (
    <div className={active}>
      <div className="nav-container">
        <img src={logo} alt="" />
        <CatalogBtn to="/catalog">Catalog</CatalogBtn>
        <div className="burger-menu" onClick={updateActive}>
          <img src={burger} alt="" />
        </div>
        <div className="links">
          <NavLink
            to="/"
            onClick={updateActive}
            activeClassName={location.pathname === "/" ? "active" : ""}
          >
            Main Page
          </NavLink>
          <NavLink
            to="/allproducts"
            onClick={updateActive}
            activeClassName={
              location.pathname === "/allproducts" ? "active" : ""
            }
          >
            All products
          </NavLink>
          <NavLink
            to="/allsales"
            onClick={updateActive}
            activeClassName={location.pathname === "/allsales" ? "active" : ""}
          >
            All sales
          </NavLink>
          <div
            onClick={updateActive}
            activeClassName={location.pathname === "/catalog" ? "active" : ""}
          >
            <CatalogBtn to="/catalog">Catalog</CatalogBtn>
          </div>
        </div>
        <BasketLink to="/basket"></BasketLink>
      </div>
    </div>
  );
}

export default NavLinks;
