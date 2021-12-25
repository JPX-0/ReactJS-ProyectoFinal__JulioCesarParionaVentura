// Import required functions.
import ItemDetail from "./ItemDetail";
import { firestoreFetchOne } from "../../../../utils/firestoreFetch";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { resetHamburger } from "../../../../utils/generalFuntions";

// ItemDetailContainer -- se renderiza el titulo de la pagina actual, y transfiere los datos a un componente hijo.
// ItemDetailContainer -- the title of the current page is rendered, and the data is transferred to a child component.
const ItemDetailContainer = () => {
  const [data, setData] = useState([]);
  const {idProduct} = useParams();
  useEffect(() => {
    resetHamburger();
    firestoreFetchOne(idProduct)
      .then((res) => setData(res))
      .catch(err => console.log(err))
  }, [idProduct]);
  if(data.id) { // esto arregla el exceso de pedidos en stock, tarde como una semana intentando hasta que me funcionó...😅
    // se limpia el localStorage luego de recargar la página.
    // the localStorage is cleaned up after reloading the page.
    if(!localStorage.getItem(data.id)) {
      // se crea un dato en el localStorage.
      // a data is created in the localStorage.
      localStorage.setItem(data.id, data.stock);
    } else {
      // se actualiza el localStorage.
      // the localStorage is updated.
      localStorage.setItem(data.id, data.stock - JSON.parse(localStorage.getItem(`inCart: ${data.id}`)));
    }
    if(data.stock !== JSON.parse(localStorage.getItem(data.id)) && !localStorage.getItem(`inCart: ${data.id}`)) {
      // se limpia el localStorage si no hay datos en el carrito.
      // the localStorage is cleaned if there is no data in the cart.
      localStorage.removeItem(data.id);
    }
  }
  return (
    <>
      <h1 className="main__title">Detalle del producto:</h1>
      <ItemDetail content={data}/>
    </>
  )};
  export default ItemDetailContainer;