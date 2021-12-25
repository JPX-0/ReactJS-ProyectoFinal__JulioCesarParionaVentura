// aquí se crean funciones generales para distribuir en todo el sitio web.
// General functions are created here for distribution throughout the website.

const handleAside = (optionClass) => {
  const asideAlert = document.querySelector(".aside");
  if(optionClass === "add") {
    asideAlert.classList.add("aside--active");
  } 
  if(optionClass === "remove"){
    asideAlert.classList.remove("aside--active");
  }
}

const resetHamburger = () => {
  const btnHamburger = document.querySelector(`.btn__hamburger`);
  const menuMobile = document.querySelector(`.header__menu`);
  btnHamburger.classList.remove(`btn__hamburger--active`);
  menuMobile.classList.remove(`header__menu--active`);
}

const percentageOperation = (price, sale) => {
  return price - (price * sale / 100)
}

export {handleAside, resetHamburger, percentageOperation}