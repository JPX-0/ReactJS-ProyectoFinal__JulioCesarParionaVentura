// Import required functions.
import { AiOutlineMail, AiOutlineWhatsApp } from "react-icons/ai";

// Footer -- se renderiza el pie de página.
// Footer -- footer is rendered.
const Footer = () => {
  return (
    <footer className="footer">
      <ol className="footer__container">
        <li><i className="flag-peru"></i>Ica, Peru</li>
        <li><i><AiOutlineWhatsApp/></i>Whatsapp: +51 9xx xxx xxx</li>
        <li><i><AiOutlineMail/></i>mipasteleria@hotmail.com</li>
      </ol>
    </footer>
  )};
export default Footer;