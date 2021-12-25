// Import required functions.
import './styles/css/App.css';
import Cart from './components/main/cart/Cart';
import CartContextProvider from './components/main/cart/CartContext';
import DataUser from './layout/main/DataUser';
import Error404 from './layout/main/Error404';
import Home from './layout/main/Home';
import ItemDetailContainer from "./components/main/items/details/ItemDetailContainer"
import ItemListContainer from './components/main/items/lists/ItemListContainer';
import ItemOfferContainer from './components/main/items/offer/ItemOfferContainer';
import NavBar from './layout/header/Navbar';
import UserContextProvider from './components/main/cart/UserContextProvider';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Footer from './layout/footer/Footer';

// App -- Renderiza la aplicación ReactJS.
// App -- Render the ReactJS application.
const App = () => {
  window.addEventListener("unload", () => {
    localStorage.clear()
  });
  return (
    <UserContextProvider>
    <CartContextProvider>
      <BrowserRouter>
        {/* <header> -- muestra el NavBar */}
        {/* <header> -- show the NavBar  */}
        <header className="header">
          <NavBar/>
        </header>
        {/* <main> -- muestra el ItemListContainer, ItemOfferContainer, ItemDetailContainer, Cart, DataUser y Error404 */}
        {/* <main> -- show the ItemListContainer, ItemOfferContainer, ItemDetailContainer, Cart, DataUser and Error404 */}
        <main className="main">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/tienda" element={<ItemListContainer/>}/>
            <Route path="/ofertas" element={<ItemOfferContainer/>}/>
            <Route path="/categoria/:idCategory" element={<ItemListContainer/>}/>
            <Route path="/producto/:idProduct" element={<ItemDetailContainer/>}/>
            <Route path="/carrito" element={<Cart/>}/>
            <Route path="/data-user" element={<DataUser/>}/> 
            <Route path="/*" element={<Error404/>}/>
          </Routes>
        </main>
        {/* <footer> -- muestra el Pie de Página */}
        {/* <footer> -- show the Footer */}
        <Footer/>
      </BrowserRouter>
    </CartContextProvider>
    </UserContextProvider>
  )};
export default App;
