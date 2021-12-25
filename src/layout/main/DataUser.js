// Import required functions.
import Alert from "../../components/elements/Alert";
import Input from "../../components/elements/Input";
import { Link } from "react-router-dom";
import { UserContext } from "../../components/main/cart/UserContextProvider";
import { handleAside } from "../../utils/generalFuntions";
import { useContext, useState } from "react";

// DataUser -- renderiza el formulario.
// DataUser -- renderiza el formulario.
const DataUser = () => {
  const test = useContext(UserContext);
  const [btnVar, setBtnVar] = useState(false);
  const [btnVar2, setBtnVar2] = useState(false);
  const [btnVar3, setBtnVar3] = useState({val1: false, val2: false, val3: false});
  // handleSubmit -- registra el envío de datos.
  // handleSubmit -- register sending data.
  const handleSubmit = (e) => {
    e.stopPropagation()
    handleAside("add")
    test.setConfirmData(true)
    e.preventDefault()
  }
  // handleChange -- registra un cambio en el input.
  // handleChange -- records a change in input.
  const handleChange = (e) => {
    e.stopPropagation()
    let regexText = /^[a-zA-Z0-9_-]{0,10}$/;
    let regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-ZÀ-ÿ-]+([a-zA-Z0-9-.]?\w+)*(\.\w{2,3})+$/;
    if((e.target.name === "name" || e.target.name === "lastName") && e.target.value.length < 11) {
      if(regexText.test(e.target.value)) {
        setBtnVar3({
          ...btnVar3,
          val1: true
        })
        setBtnVar2(false)
      } else {
        setBtnVar3({
          ...btnVar3,
          val1: false
        })
        setBtnVar2(true)
      }
      test.setUserData({
        ...test.userData,
        [e.target.name]: e.target.value
      });
    } else if(e.target.name === "email") {
      if(regexEmail.test(e.target.value)) {
        setBtnVar3({
          ...btnVar3,
          val2: true
        })
        setBtnVar2(false)
      } else {
        setBtnVar3({
          ...btnVar3,
          val2: false
        })
        setBtnVar2(true)
      }
      test.setUserData({
        ...test.userData,
        [e.target.name]: e.target.value
      });
    } else if(e.target.name === "credit") {
      if(e.target.value.length < 12) {
        setBtnVar3({
          ...btnVar3,
          val3: false
        })
        e.target.classList.add("payment__container-input--err");
      } else if(e.target.value.length === 12) {
        setBtnVar3({
          ...btnVar3,
          val3: true
        })
        e.target.classList.remove("payment__container-input--err");
      }
      if(e.target.value.length < 13) {
        test.setUserData({
          ...test.userData,
          [e.target.name]: e.target.value
        });
      }
    }
    if(btnVar) {
      test.setUserData({
        ...test.userData,
        [e.target.name]: e.target.value
      });
    }
    if(e.target.name !== "credit") {
      if(btnVar2) {
        e.target.classList.add("payment__container-input--err");
      } else {
        e.target.classList.remove("payment__container-input--err");
      }
    } 
  }
  // handleChange -- registra cuando se presiona el teclado.
  // handleChange -- records when keyboard is pressed.
  const handleKey = (e) => {
    e.stopPropagation()
    if(e.keyCode === 8) {
      setTimeout(() => {
        setBtnVar(true);
        setBtnVar2(true);
      }, 50);
      setBtnVar(false);
      setBtnVar2(false);
    }  else {
      setBtnVar(false);
    }
    if(e.keyCode === 32) {
      e.preventDefault()
    }
  }
  return (
    <>
    {
      // se comprueba si el usuario envió sus datos o no.
      // it is checked whether the user sent their data or not.
      !test.confirmData ?
      <fieldset className="payment">
        <legend className="payment__title"><h1 className="main__title">Ingresar Datos</h1></legend>
        <form className="payment__form" onSubmit={handleSubmit}>
          <Input
            labelText="Nombre:"
            typeInput="text"
            idInput="name"
            valueInput={test.userData.name}
            handleChange={handleChange}
            handleKey={handleKey}
          />
          <Input
            labelText="Apellido:"
            typeInput="text"
            idInput="lastName"
            valueInput={test.userData.lastName}
            handleChange={handleChange}
            handleKey={handleKey}
          />
          <Input
            labelText="Correo electronico:"
            typeInput="email"
            idInput="email"
            valueInput={test.userData.email}
            handleChange={handleChange}
            handleKey={handleKey}
          />
          <Input
            labelText="Número de tarjeta:"
            typeInput="number"
            idInput="credit"
            valueInput={test.userData.credit}
            handleChange={handleChange}
            handleKey={handleKey}
          />
          {
            // se comprueba el correcto llenado de los datos.
            // the correct filling of the data is checked.
            btnVar3.val1 && btnVar3.val2 && btnVar3.val3 ?
            <button className="btn btn__addToCar payment__btn" type="submit">Enviar Datos</button> :
            <button className="btn btn__addToCar--inactive payment__btn" type="submit">Enviar Datos</button>
          }
        </form>
      </fieldset> :
      <p>Usted y su tarjeta ya estan registrados.</p>
    }
    <Alert>
      <p className="alert__text">Su tarjeta se ha registrado exitosamente.</p>
      <Link to="/carrito" className="btn btn__confirm">Aceptar</Link>
    </Alert>
    </>
  )
}
export default DataUser;