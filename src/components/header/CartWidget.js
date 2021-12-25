// Import required functions.
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CartContext } from "../main/cart/CartContext";
import { Link } from "react-router-dom";
import { useContext } from "react";

// CartWidget -- renderiza el botón del carrito.
// CartWidget -- render the cart button.
const CartWidget = () => {
  const test = useContext(CartContext);
  return (
    <li className="header__list">
      <Link to="/carrito" className="btn btn__shop">
        <i className="btn__shop-icon"><AiOutlineShoppingCart/></i>
        {
          // se renderiza el número de productos seleccionados.
          // the number of selected products is rendered.
          test.counterProducts() !== 0 &&
          <span className="btn__shop-indicator">{test.counterProducts()}</span>
        }
      </Link> 
    </li>
  )};
export default CartWidget;