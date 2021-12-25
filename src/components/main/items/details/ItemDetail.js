// Import required functions.
import Card from "../../../elements/Card";
import ItemCount from "../../buttons/ItemCount";
import { BsChevronLeft } from "react-icons/bs";
import { CartContext } from "../../cart/CartContext";
import { Link } from "react-router-dom";
import { MdLocalOffer } from "react-icons/md";
import { handleAside, percentageOperation } from "../../../../utils/generalFuntions";
import { useContext, useState } from "react";

// ItemDetail -- se renderiza todos los detalles del producto.
// ItemDetail -- all product details are rendered.
const ItemDetail = (props) => {
  const [varStt, setVarStt] = useState(false); // única funcion: cambiar estado booleano. -- VariableState
  const [qtyProducts, setQtyProducts] = useState(0);
  const test = useContext(CartContext);
  // onAdd -- se envía el producto seleccionado al carrito.
  // onAdd -- the selected product is sent to the cart.
  const onAdd = (qtyOfCurrentItems) => {
    handleAside("add");
    setTimeout(() => {
      handleAside("remove");
    }, 1500);
    test.addItem(props.content, qtyOfCurrentItems);
    setQtyProducts(qtyOfCurrentItems)
    setVarStt(true)
    if(localStorage.getItem(`inCart: ${props.content.id}`)) {
      localStorage.setItem(`inCart: ${props.content.id}`, JSON.parse(localStorage.getItem(`inCart: ${props.content.id}`)) + qtyOfCurrentItems);
    } else {
      localStorage.setItem(`inCart: ${props.content.id}`, qtyOfCurrentItems);
    }
  }
  return (
    <>
      {
        // se comprueba si la data llega o no.
        // it is checked if the data arrived or not.
        props.content ?
          // se espera a que la data termine de cargar.
          // wait for the data to finish loading.
          props.content.length !== 0 ?
          <>
            <Card figureClass="detail" pictureClass="card__picture" imgClass="card__img" imgAlt={props.content.title} imgSrc={props.content.pictureURL}>
              <Link to="/tienda" className="btn btn__back"><BsChevronLeft/></Link>
              {
                // se comprueba si existe un producto en oferta.
                // check if there is a product on sale.
                props.content.offer &&
                <span className="sale__icon"><i><MdLocalOffer/></i> SALE: -{props.content.sale}%</span>
              }
              <article>
                <h2 className="card__title">{props.content.title}</h2>
                {
                  // se comprueba si existe un producto en oferta.
                  // check if there is a product on sale.
                  props.content.offer ?
                  <p className="card__price">
                    <span className="card__price--sale">${props.content.price} </span>
                    ${percentageOperation(props.content.price, props.content.sale)} x U
                  </p> :
                  <p className="card__price">${props.content.price} x U</p>
                }
                <p className="card__description">{props.content.description}</p>
              </article>
              {
                // se espera a que el cliente haga su pedido para mostrarle el boton de ir al carrito.
                // the customer is expected to place his order to show him the button to go to the cart.
                varStt ?
                <>
                  <Link to="/carrito" className="btn btn__addToCar">Ir al carrito</Link>
                  <button className="btn btn__link btn__link--black" onClick={() => setVarStt(false)}>Seguir comprando</button>
                </> :
                <ItemCount id={props.content.id} stock={JSON.parse(localStorage.getItem(props.content.id))} onAdd={onAdd}/>
              }
            </Card> 
            <aside className="aside">
              <section className="alert">
                <p className="alert__text">Se agregó {qtyProducts} producto de {props.content.title} a la tienda.</p>
              </section>
            </aside>
          </> :
          <p className="msg msg__cargando"></p> :
        <p className="msg__error"></p>
      }
    </>
  )};
  export default ItemDetail;