// Import required functions.
import Card from "../../../elements/Card";
import { Link } from "react-router-dom";

// ItemCategories -- se renderiza las categorías.
// ItemCategories -- categories are rendered.
const ItemCategories = (props) => {
  return (
    <>
      <Link to="/tienda" title={`Da click aquí para ver todos los productos`} className="main__categories--structure">
        <div className="card-category">
          <span className="card-category__title">Ver Todo</span>
          <span className="card-category__subtitle">Ver Todo</span>
        </div>
      </Link>
      {
        // se mapea la lista recibida.
        // the received list is mapped.
        props.content.map(category =>
          <Link to={`/categoria/${category.slug}`} key={`categories${category.id[0]}`} title={`Da click aquí para ver los productos que incluyan la categoría ${category.title}`} className="main__categories--structure">
            <Card figureClass="card-category" pictureClass="card-category__picture" imgClass="img card-category__img" imgAlt={`categoria: ${category.title}`} imgSrc={category.img}>
              <span className="card-category__title">{category.title}</span>
              <span className="card-category__subtitle">{category.title}</span>
            </Card>
          </Link>
        )
      }
    </>
  )
}
export default ItemCategories;