// Import required functions.
import ItemAllContainer from "..//../components/main/items/ItemAllContainer";
import { firestoreFetchAll, firestoreFetchSale } from "../../utils/firestoreFetch";
import { resetHamburger } from "../../utils/generalFuntions";
import { useEffect, useState } from "react";

// Home -- se renderiza el titulo de la pagina actual, y transfiere los datos a un componente hijo.
// Home -- the title of the current page is rendered, and the data is transferred to a child component.
const Home = () => {
  const [data, setData] = useState([]);
  const [dataOnSale, setDataOnSale] = useState([]);
  useEffect(() => {
    resetHamburger();
    firestoreFetchAll()
      .then((res) => setData(res))
      .catch(err => console.log(err))
  },[])
  useEffect(() => {
    firestoreFetchSale()
      .then((res) => setDataOnSale(res))
      .catch(err => console.log(err))
  },[])
  return (
    <>
      <h1 className="main__title">Mi Pasteleria</h1>
      <ItemAllContainer data={data} dataOnSale={dataOnSale}/>
    </>
  )
}
export default Home;