import "./Footer.css";
// import FooterList from "./FooterList";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
export default function Footer() {
  return (

    <>
    <footer className="footerContainer">
        
      {/* <div>
                <h3  className="footerH3">Categorias</h3>
                <FooterList />
            </div> */}
      <div className="footerContainer__div">
        <h3 className="footerH3">Sobre Nós</h3>
        <p className="footer__p">Informações sobre a empresa.</p>
      </div>
      <div className="footerContainer__div">
        <h3 className="footerH3">Contato</h3>
        <p className="footer__p">Email: contato@exemplo.com</p>
        <p className="footer__p">Telefone: (00) 1234-5678</p>
        <p className="footer__p">CNPJ: 56.171.368/0001-77 </p>
      
      </div>
      <div className="footerContainer__div">
        <ul className="footer__ul">
          <h3 className="footerH3">Saiba mais nas nossas redes</h3>
          
          <div className="footer__li">
            <li >
              <a href="https://www.facebook.com/profile.php?id=100078800343826&locale=pt_BR">
                <FacebookOutlinedIcon style={{ width: '35px', height: '35px' }}/>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/filipealvesr2019/">
                <InstagramIcon style={{ width: '35px', height: '35px' }}/>
              </a>
              
            </li>
            <p className="footer__Copyright">            Copyright © 2024  - 2024 
            </p>
            {/* <li><a href="https://instagram.com">Instagram</a></li> */}
          </div>
        </ul>
       
      </div>
    
    </footer>
    
    </>
    
    
    
  );
}
