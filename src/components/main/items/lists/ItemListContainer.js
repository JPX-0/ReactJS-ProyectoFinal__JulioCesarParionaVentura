// Import required functions.
import ItemList from "./ItemList";
import { firestoreFetchAll } from "../../../../utils/firestoreFetch";
import { resetHamburger } from "../../../../utils/generalFuntions";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

// ItemListContainer -- se renderiza el titulo de la pagina actual, y transfiere los datos a un componente hijo.
// ItemListContainer -- the title of the current page is rendered, and the data is transferred to a child component.
const ItemListContainer = () => {
  const [data, setData] = useState([])
  const {idCategory} = useParams();
  useEffect(() => {
    resetHamburger();
    firestoreFetchAll(idCategory)
      .then((res) => setData(res))
      .catch(err => console.log(err))
  },[idCategory])
  return (
    <>
      <h1 className="main__title">Mi Pasteleria</h1>
      <ItemList content={data}/>
    </>
  )};
export default ItemListContainer;