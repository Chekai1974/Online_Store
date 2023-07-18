import { NavLink } from "react-router-dom";
function SaleBtnLink({ to, children }) {
  return (
    <NavLink to={to} className='sale-btn'>
      {children}
    </NavLink>
  );
}

export default SaleBtnLink;