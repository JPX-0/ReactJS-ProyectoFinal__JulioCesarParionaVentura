// Import required functions.
import Item from "./Item";
import { memo } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";

// ItemList -- se renderiza la lista de productos esperada.
// ItemList -- the expected product list is rendered.
const ItemList = (props) => {
  return (
    <>
      {
        // se comprueba si la data llega o no.
        // it is checked if the data arrived or not.
        props.content ?
          // se espera a que la data termine de cargar.
          // wait for the data to finish loading.
          props.content.length > 0 ?
          <section className="main__container">
            {
              // se mapea la lista recibida.
              // the received list is mapped.
              props.content.map(art => 
                <figure key={`figure${art.id}`} className="card">
                  <h2 className="card__title responsive-M--Block">{art.title}</h2>
                  <Item src={art.pictureURL} alt={art.title}/>
                  <section className="card__detail">
                    <h2 className="card__title responsive-D--Block">{art.title}</h2>
                    <Link to={`/producto/${art.id}`} className="btn btn__showDetail"><i><AiOutlineSearch/></i>Ver Detalles</Link>
                  </section>
                </figure>
              ) 
            }
          </section> :
          <p className="msg msg__cargando"></p> :
        <p className="msg__error"></p>
      }
    </>
  )}
export default memo(ItemList);