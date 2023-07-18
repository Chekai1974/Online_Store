import { NavLink } from "react-router-dom";
function CatalogBtn({ to, children }) {
  return (
    <NavLink to={to} className="catalog" >
      {children}
    </NavLink>
  );
}

export default CatalogBtn;