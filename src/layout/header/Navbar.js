// Import required functions.
import CartWidget from "../../components/header/CartWidget"
import Hamburger from "../../components/header/Hamburger";
import NavWidget from "../../components/header/NavWidget";

// NavBar -- renderiza el logo, navs, el botón del carrito y el boton hamburguesa.
// NavBar -- render logo, navs, cart button and hamburger button.
const NavBar = () => {
  return (
    <nav className="header__container">
      <NavWidget title="Mi Pastelería" type="Logo"/>
      <ul className="header__menu">
        <NavWidget title="Inicio"/>
        <NavWidget title="Tienda"/>
        <NavWidget title="Ofertas"/>
        <li className="header__list header__list--dropdown">
          <p className="header__title">Categorias</p>
          <ol className="header__category">
            <NavWidget title="Buttercream" type="category"/>
            <NavWidget title="Chocolate" type="category"/>
            <NavWidget title="Tres Leches" type="category"/>
            <NavWidget title="Frutas" type="category"/>
          </ol>
        </li>
        <CartWidget/>
      </ul>
      <Hamburger/>
    </nav>
  )};
export default NavBar;