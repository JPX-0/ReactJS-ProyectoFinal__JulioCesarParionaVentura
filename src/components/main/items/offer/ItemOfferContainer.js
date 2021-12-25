// Import required functions.
import ItemList from "../lists/ItemList";
import { firestoreFetchSale } from "../../../../utils/firestoreFetch";
import { useEffect, useState } from "react";
import { resetHamburger } from "../../../../utils/generalFuntions";

// ItemOfferContainer -- se renderiza el titulo de la pagina actual, y transfiere los datos a un componente hijo.
// ItemOfferContainer -- the title of the current page is rendered, and the data is transferred to a child component.
const ItemOfferContainer = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    resetHamburger();
    firestoreFetchSale()
      .then((res) => setData(res))
      .catch(err => console.log(err))
  },[])
  return (
    <>
      <h1 className="main__title">Mi Ecommerce</h1>
      <ItemList content={data}/>
    </>
  )};
export default ItemOfferContainer;