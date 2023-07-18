
import { NavLink } from 'react-router-dom'

function AllCategoriesLinkBtn({ to, children }) {
  return (
    <NavLink to={to} className='section2-btn'>
      {children}
    </NavLink>
  )
}

export default AllCategoriesLinkBtn