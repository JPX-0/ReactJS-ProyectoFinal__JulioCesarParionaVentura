// Import required functions.
import ItemOffer from "./offer/ItemOffer";
import ItemCategories from "./categories/ItemCategories";

// ItemAllContainer -- renderiza ofertas y categorías como primer plano.
// ItemAllContainer -- render offers and categories as foreground.
const ItemAllContainer = (props) => {
  const referenceCategory = [];
  const dataByCategory = [];
  // se espera a que la data termine de cargar.
  // wait for the data to finish loading.
  if(props.data.length > 0) {
    for(let i = 0; i < props.data.length; i++) {
      if(!referenceCategory.includes(props.data[i].categoryId)) {
        referenceCategory.push(props.data[i].categoryId);
        dataByCategory.push({id:[i], title:props.data[i].categoryId, img:props.data[i].pictureURL, slug:props.data[i].categoryId.toLowerCase().replace(/\s+/g, "-")});
      } 
    }
  }
  return (
    <>
      {
        // se espera a que la data termine de cargar.
        // wait for the data to finish loading.
        props.data.length > 0 ?
        <>
          <section className="main--home">
            <ItemOffer content={props.dataOnSale}/>
            <section className="main__categories">
              <ItemCategories content={dataByCategory}/>
            </section>
          </section>
        </> :
        <p className="msg msg__cargando"></p>
      }
    </>
  )
}
export default ItemAllContainer;