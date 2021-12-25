// Import required functions.
import { Link } from "react-router-dom";

// NavWidget -- renderiza los links navegables necesarios para la página.
// NavWidget -- render the navigable links necessary for the page.
const NavWidget = (props) => {
  // slug -- reemplaza los espacios en blanco con guiones, perfectos para usarlos como enlaces navegables.
  // slug -- replace whitespace with hyphens, perfect to use as navigable links.
  let slug = props.title.toLowerCase().replace(/\s+/g, "-");
  return (
    <>
      {
        // se renderiza el LOGO.
        // LOGO is rendered.
        props.type === "Logo" ?
        <Link to="/" className="header__logo">
          <img src="https://firebasestorage.googleapis.com/v0/b/ecommerce-julioparionav.appspot.com/o/logo.jpg?alt=media&token=9c1958f2-bf68-40b0-ba75-a035e1296283" alt={props.title} className="header__logo-img"></img>
          <span className="header__logo-text">{props.title}</span>
        </Link> : 
        // se renderiza la lista de enlaces navegables.
        // the list of browsable links is rendered.
        <li className="header__list">
          {
            props.title === "Inicio" ?
            <Link to="/" className="header__title">{props.title}</Link> :
            props.type === "category" ?
            <Link to={`/categoria/${slug}`} className="header__title">{props.title}</Link> :
            <Link to={slug} className="header__title">{props.title}</Link>
          }
        </li>
      }
    </>
  )};
export default NavWidget;