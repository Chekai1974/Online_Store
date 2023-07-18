import { NavLink } from "react-router-dom";
import basket from "../../images/basket.png"
function BasketLink({ to, children }) {

  return (
    <NavLink to={to} className='basketLink'> 
      {children}
      <img src={basket} alt="" />
    </NavLink>
  );
}

export default BasketLink;