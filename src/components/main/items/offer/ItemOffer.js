// Import required functions.
import Card from "../../../elements/Card";
import { Link } from "react-router-dom";
import { MdLocalOffer } from "react-icons/md";

// ItemOffer -- se renderizan las ofertas.
// ItemOffer -- offers are rendered.
const ItemOffer = (props) => {
  return (
    <>
      {
        // se espera a que la data termine de cargar.
        // wait for the data to finish loading.
        props.content.length > 0 &&
        // se comprueba si hay stock.
        // check if there is stock.
        props.content.map(item => item.stock) > 0 ?
        <>
          <p className="main__subtitle">¡Enhorabuena! solo por hoy tenemos en oferta:</p>
          {
            // se mapea la lista recibida.
            // the received list is mapped.
            props.content.map(item =>
              <Link to={`/producto/${item.title.toLowerCase().replace(/\s+/g, "-")}`} key={`sale${item.id}`} title={`En oferta: ${item.title} - ${item.sale}%`}>
                <Card figureClass="sale" pictureClass="sale__picture" imgClass="img sale__img" imgAlt={item.title} imgSrc={item.pictureURL}>
                  <span className="sale__icon"><i><MdLocalOffer/></i> SALE: -{item.sale}%</span>
                </Card>
              </Link>
            ) 
          }
        </> :
        <p className="main__subtitle">Lo sentimos, hoy no disponemos de ofertas.</p>
      }
    </>
  )
}
export default ItemOffer;