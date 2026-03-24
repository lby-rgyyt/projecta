import { Link } from 'react-router-dom'

const Header = () => {
    return (
      <header>
        <nav>
        <Link to="/">Management</Link>
        <Link to="/signin">Sign In</Link>
        <Link to="/cart">Cart</Link>
      </nav>
      </header>
    )
  }
  export default Header