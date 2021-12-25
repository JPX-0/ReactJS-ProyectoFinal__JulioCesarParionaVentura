import { createContext, useState } from "react";
import { percentageOperation } from "../../../utils/generalFuntions";

export const CartContext = createContext();

let itemFound;
const isInCart = (arrProd, itemId) => {
  itemFound = arrProd.find(elem => elem.idItem === itemId.id);
}

const CartContextProvider = ({children}) => {
  const [cartList, setCartList] = useState([]);
  const addItem = (item, cantProd) => {
    isInCart(cartList, item)
    if(!itemFound) {
      setCartList([
        ...cartList,
        {
          idItem: item.id,
          imgItem: item.pictureURL,
          nameItem: item.title,
          priceItem: item.offer ? percentageOperation(item.price, item.sale) : item.price,
          qtyItem: cantProd,
          totalPricePerItem: item.offer ? percentageOperation(item.price, item.sale) * cantProd : item.price * cantProd
        }
      ])
    } else {
      itemFound.qtyItem += cantProd;
      itemFound.totalPricePerItem += item.price * cantProd;
      setCartList([...cartList])
    }
  }
  const removeItem = (itemId) => {
    let itemRemove = cartList.filter(elem => elem.idItem !== itemId);
    setCartList(itemRemove);
  }
  const clear = () => {
    setCartList([]);
  }
  const counterProducts = () => {
    let count = cartList.map(elem => elem.qtyItem);
    return count.reduce(((previousVal, currentVal) => previousVal + currentVal), 0)
  }
  const roundOut = (num) => {
    let sign = num >= 0 ? 1 : -1;
    return (Math.round((num * Math.pow(10, 2)) + (sign * 0.0001)) / Math.pow(10, 2)).toFixed(2);
  }
  const calcTotal = () => {
    let totalPerItem = cartList.map(item => item.totalPricePerItem);
    let finalPrice;
    if(totalPerItem.length > 0) {
      finalPrice = totalPerItem.reduce((previousVal, currentVal) => previousVal + currentVal);
    }
    return finalPrice;
  }
  const calcIva = () => {
    return Number(roundOut(calcTotal() / 19.2));
  }
  const calcTotalFinal = () => {
    return calcTotal() + calcIva();
  }
  return(
    <CartContext.Provider value={{cartList, addItem, removeItem, clear, counterProducts, calcTotal, calcIva, calcTotalFinal}}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;