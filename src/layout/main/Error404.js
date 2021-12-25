// Import required functions.
import { useEffect } from "react";
import { resetHamburger } from "../../utils/generalFuntions";

// Error404 -- se renderiza la página de error.
// Error404 -- the error page is rendered .
const Error404 = () => {
  useEffect(() => {
    resetHamburger();
  },[])
  return (
    <section className="error__figure">
      <p className="main__title">¡Ups! Página no encontrada</p>
      <img src="https://firebasestorage.googleapis.com/v0/b/ecommerce-julioparionav.appspot.com/o/error404.webp?alt=media&token=9f8aa41d-2b03-4df2-9258-4cab5c688760" alt="Error, página no encontrada" className="error__img" />
    </section>
  )
}
export default Error404;