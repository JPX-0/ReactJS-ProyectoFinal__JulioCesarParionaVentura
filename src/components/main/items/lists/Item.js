// Item -- se renderiza los detalles principales del producto.
// Item -- the main details of the product are rendered.
const Item = (props) => {
  return (
    <>
      <picture className="card__picture">
        <img src={props.src} alt={props.alt} className="card__img"/>
      </picture>
    </>
  )};
  export default Item;