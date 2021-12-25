// Home -- Renderiza el Inicio de la página.
const Input = (props) => {
  return (
    <section className="payment__container">
      <label htmlFor={props.idInput} className="payment__container-label">{props.labelText}</label>
      <input type={props.typeInput} className={`payment__container-input`} id={props.idInput} name={props.idInput} value={props.valueInput} autoComplete="off" onChange={(e) => props.handleChange(e)} onKeyDown={(e) => props.handleKey(e)}/>
    </section>
  )
}
export default Input;