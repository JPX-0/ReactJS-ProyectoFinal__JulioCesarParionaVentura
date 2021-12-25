// Import required functions.
import Alert from "../../elements/Alert";
import db from "../../../utils/firebaseConfig";
import { AiFillDelete } from "react-icons/ai";
import { CartContext } from "./CartContext";
import { Link } from "react-router-dom";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { SiShopify } from "react-icons/si";
import { UserContext } from "./UserContextProvider";
import { collection, doc, increment, setDoc, updateDoc } from "firebase/firestore";
import { handleAside, resetHamburger } from "../../../utils/generalFuntions";
import { useContext, useEffect, useState } from "react";

// Cart -- se renderiza el carrito con los productos seleccionados por el cliente.
// Cart -- the cart is rendered with the products selected by the customer.
const Cart = () => {
  const testCart = useContext(CartContext);
  const testUser = useContext(UserContext);
  const [product, setProduct] = useState([]);
  const [varStt, setVarStt] = useState(false); // única funcion: cambiar estado booleano. -- VariableState
  const [purchaseId, setPurchaseId] = useState("");
  const [asideActive, setAsideActive] = useState(false);
  useEffect(() => {
    resetHamburger();
  },[])
  // deleteItem -- abre el modal de confirmación para eliminar algún producto.
  // deleteItem -- open the confirmation modal to delete a product.
  const deleteItem = (itemId) => {
    let productFound = testCart.cartList.find(item => item.idItem === itemId);
    handleAside("add");
    setVarStt(true);
    setProduct(productFound);
  }
  // deleteItems -- abre el modal de confirmación para eliminar todos los productos.
  // deleteItems -- open the confirmation modal to delete all products.
  const deleteItems = () => {
    setVarStt(false);
    handleAside("add");
  }
  // btnCancel -- se rechaza eliminar los productos seleccionados.
  // btnCancel -- it is refused to delete the selected products.
  const btnCancel = () => {
    handleAside("remove");
  }
  // btnConfirm -- se acepta eliminar los productos seleccionados.
  // btnConfirm -- it is accepted to delete the selected products.
  const btnConfirm = () => {
    handleAside("remove");
    if(varStt === true) {
      testCart.removeItem(product.idItem); // elimina el producto seleccionado del carrito.
      localStorage.removeItem(product.idItem)
      localStorage.removeItem(`inCart: ${product.idItem}`)
    } else if(varStt === false){
      testCart.clear(); // elimina todos los productos del carrito.
      localStorage.clear()
    }
  }
  // closeAlert -- se cierra el mensaje de alerta.
  // closeAlert -- the alert message closes.
  const closeAlert = () => {
    setAsideActive(false)
  }
  // createOrder -- se crea una nueva orden con los productos comprados.
  // createOrder -- a new order is created with the purchased products.
  const createOrder = () => {
    handleAside("add");
    let order = {
      // se registra los datos necesarios del usuario.
      // the necessary user data is recorded.
      buyer: {
        name: `${testUser.userData.name} ${testUser.userData.lastName}`,
        email: testUser.userData.email,
        creditCard: testUser.userData.credit
      },
      // se muestra la lista de productos comprados.
      // the list of purchased products is displayed.
      items: testCart.cartList.map(item => ({
        id: item.idItem,
        title: item.nameItem,
        price: item.priceItem,
        quantity: item.qtyItem
      })),
      // se muestra el monto total de pago.
      // the total amount of the payment is displayed.
      total: testCart.calcTotalFinal()
    };
    // se crea una nueva colección en Firebase.
    // a new collection is created in Firebase.
    const createOrderInFirebase = async() => {
      const newOrderRef = doc(collection(db, "orders"));
      await setDoc(newOrderRef, order);
      return newOrderRef
    }
    // se llama a la nueva coleccion de Firebase para mostrar el ID de compra.
    // the new Firebase collection is called to show the purchase ID.
    createOrderInFirebase()
      .then(res => setPurchaseId(res.id))
      .catch(err => console.log(err))
    testCart.cartList.forEach( async(item) => {
      const itemRef = doc(db, "data", item.idItem);
      await updateDoc(itemRef, {
        stock: increment(-item.qtyItem) // se disminuye el número de stock con el número de prodcutos seleccionados por el usuario.
      })
    });
    testCart.clear() // elimina todos los productos del carrito.
    localStorage.clear() // limpia el LocalStorage.
    setAsideActive(true) // activa el mensaje de alerta.
  }
  return (
    <>
      <h1 className="main__title">Este es el carrito</h1>
      {
        // se comprueba que la data tenga algún producto seleccionado.
        // it is verified that the data has a selected product.
        testCart.cartList.length > 0 ?
        <>
          <section className="cart">
            <section className="cart--first">
              <section className="cart--top">
                <p className="cart__table center">Imagen</p>
                <p className="cart__table cart--division center">Nombre</p>
                <p className="cart__table cart--division center">Precio x U</p>
              </section>
              <section className="cart--middle">
                {
                  // se mapea la lista recibida.
                  // the received list is mapped.
                  testCart.cartList.map(elem => 
                    <figure key={`figureCart${elem.idItem}`} className="cart__figure">
                      <Link to={`/producto/${elem.idItem}`} title="da 'click' para ir al producto">
                        <picture className="cart__picture cart__table">
                          <img src={elem.imgItem} alt={elem.nameItem} className="card__img"/>
                        </picture>
                      </Link>
                      <h2 className="cart__table cart--division center" title={elem.nameItem}><span>{elem.nameItem}</span></h2>
                      <div className="cart__table cart--division center">
                        <p>${elem.priceItem} x {elem.qtyItem}</p>
                        <p>${elem.priceItem * elem.qtyItem}</p>
                      </div>
                      <div className="cart__table cart--division center">
                        <button className="btn" title="Eliminar este producto." onClick={() => deleteItem(elem.idItem)}><AiFillDelete/></button>
                      </div>
                    </figure>
                  )
                }
              </section>
              <section className="cart--bottom">
                <button className="btn btn__addToCar" onClick={deleteItems}>Borrar Carrito <MdOutlineDeleteSweep/></button>
              </section>
            </section>
            <section className="cart--second">
              <section className="cart__container">
                <p className="cart__table">Detalles de la compra</p>
                <p className="cart__table">Precio toal:</p>
                <p className="cart__table">${testCart.calcTotal()}</p>
                <p className="cart__table">IVA (19.2%):</p>
                <p className="cart__table">${testCart.calcIva()}</p>
                <p className="cart__table">Precio Final:</p>
                <p className="cart__table cart--division">$.{testCart.calcTotalFinal()}</p>
                <div className="cart--bottom">
                  {
                    // se comprueba si el usuario envió sus datos o no.
                    // it is checked whether the user sent their data or not.
                    testUser.confirmData ?
                    <button className="btn btn__addToCar" onClick={createOrder}>Comprar <SiShopify/></button> :
                    <Link to="/data-user" className="btn btn__addToCar">Ingrese sus datos</Link>
                  }
                </div>
              </section>
            </section>
            <Alert>
              {
                // se comprueba si se pide eliminar un producto o todos los productos.
                // it is checked whether it is requested to delete a product or all products.
                varStt ?
                <p className="alert__text">¿Está seguro/a que desea eliminar <span>{product.nameItem}</span>?</p> :
                <p className="alert__text">¿Está seguro/a que desea limpiar su carrito?</p>
              }
              <button className="btn btn__cancel" onClick={btnCancel}>Cancelar</button>
              <button className="btn btn__confirm" onClick={btnConfirm}>Confirmar</button>
            </Alert>
          </section>
        </> :
        <>
          {
            // se espera a que se emita la señal de activar la alerta.
            // wait for the signal to activate the alert.
            asideActive &&
            <Alert classAside="aside--active">
              <section className="alert__text">
                <p className="alert__text">¡Gracias por su compra estimado(a)<span> {`${testUser.userData.name} ${testUser.userData.lastName}`}</span>!</p>
                <p className="alert__text">Porfavor guarde su Id de compra</p>
                <p className="alert__text p-1">ID: {purchaseId}</p>
              </section>
              {
                // se espera a que cargue el ID de compra.
                // wait for the purchase ID to load.
                purchaseId &&
                <button className="btn btn__confirm" onClick={closeAlert}>Aceptar</button>
              }
            </Alert>
          }
          <p>El carrito está vacio, regrese a la página de <Link to="/" className="btn__link btn__link--blue">Inicio</Link> y ralize sus pedidos.</p>
        </>
      }
    </>
  )
}
export default Cart;