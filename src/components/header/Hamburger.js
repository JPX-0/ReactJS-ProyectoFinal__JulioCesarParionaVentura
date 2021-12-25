// Import required functions.
import { useEffect } from "react";
import { resetHamburger } from "../../utils/generalFuntions";

// Hamburger -- se renderiza el boton responsivo.
// Hamburger -- responsive button is rendered.
const Hamburger = () => {
  useEffect(() => {
    window.addEventListener(`resize`, () => {
      if(window.innerWidth > 767) {
        resetHamburger();
      }
    })
  },[])
  const handleHamgurger = () => {
    const btnHamburguer = document.querySelector(`.btn__hamburger`);
    const menuMobile = document.querySelector(`.header__menu`);
    btnHamburguer.classList.toggle(`btn__hamburguer--active`);
    menuMobile.classList.toggle(`header__menu--active`);
  }
  return (
    <>
      <button className="btn btn__hamburger" onClick={handleHamgurger} title="hamburger"><span></span></button>
    </>
  )};
export default Hamburger;