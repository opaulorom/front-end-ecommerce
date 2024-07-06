import "./Footer.css"
export default function Footer() {
    return (
        <footer className="footerContainer">
            <div>
                <h3  className="footerH3">Sobre Nós</h3>
                <p>Informações sobre a empresa.</p>
            </div>
            <div>
                <h3 className="footerH3">Contato</h3>
                <p>Email: contato@exemplo.com</p>
                <p>Telefone: (00) 1234-5678</p>
            </div>
            <div>
                <h3 className="footerH3">Redes Sociais</h3>
                <ul className="footer__ul">
                    <li><a href="https://www.facebook.com/profile.php?id=100078800343826&locale=pt_BR" ><img src="https://i.imgur.com/xH6qf2B.png" title="source: imgur.com"  className="imgFooter"/></a></li>
                    <li><a href="https://www.instagram.com/filipealvesr2019/"><img src="https://i.ibb.co/bNBsmQr/instagram.png" alt="" /></a></li>
                    {/* <li><a href="https://instagram.com">Instagram</a></li> */}
                </ul>
            </div>
            {/* <p>            Copyright © 2024  - 2024 
            </p> */}
         
        </footer>
    );
}
