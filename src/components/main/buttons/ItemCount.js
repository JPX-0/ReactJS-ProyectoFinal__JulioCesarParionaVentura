// Import required functions.
import { useState } from "react";

// ItemCount -- se renderiza los botones para aumentar o disminuir el numero de productos a seleccionar.
// ItemCount -- the buttons are rendered to increase or decrease the number of products to select.
const ItemCount = (props) => {
  const [products, setProducts] = useState(0);
  // increment -- aumenta la cantidad de productos seleccionados.
  // increment -- increase the number of selected products.
  const increment = () => {
    if(products < props.stock) {
      setProducts(products + 1);
      localStorage.setItem(props.id, props.stock - products - 1);
    }
  }
  // decrement -- disminuye la cantidad de productos seleccionados.
  // decrement -- decrease the number of selected products.
  const decrement = () => {
    if(products > 1) {
      setProducts(products - 1);
      localStorage.setItem(props.id, props.stock - products + 1);
    }
  }
  return (
    <>
      <div className="card__buttons">
        <button onClick={decrement} className="btn btn__count">-</button>
        <p className="card__products">Productos: {products} / {props.stock}</p>
        <button onClick={increment} className="btn btn__count">+</button>
      </div>
      {
        // se verifica si el producto hay en stock.
        // it is verified if the product is in stock.
        props.stock ?
          // se habilita/deshabilita el boton para agregar el producto seleccionado al carrito.
          // the button to add the selected product to the cart is enabled/disabled.
          products ?
          <button className="btn btn__addToCar" onClick={() => props.onAdd(products)}>Agregar al carrito</button> :
          <button className="btn btn__addToCar btn__addToCar--inactive">Agregar al carrito</button> :
        <button className="btn btn__addToCar--inactive">No hay mas en Stock</button>
      }
    </>
  )};
export default ItemCount;