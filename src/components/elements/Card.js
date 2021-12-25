// Card -- se renderiza una figura/tarjeta.
// Card -- a figure/card is rendered.
const Card = (
  {
    figureClass,
    pictureClass,
    pictureTitle,
    imgClass,
    imgAlt,
    imgSrc,
    children
  }) => {
  return (
    <>
    <figure className={figureClass}>
      <picture className={pictureClass} title={pictureTitle}>
        <img src={imgSrc} alt={imgAlt} className={imgClass}/>
      </picture>
      {children}
    </figure>
    </>
  )};
export default Card;