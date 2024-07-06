import AccordionFooter from "./AccordionFooter";
import "./Footer.css"
export default function Footer() {
    return (
        <footer>
            <AccordionFooter />
            <div className="footer">
            <div>
                <h3>Sobre Nós</h3>
                <p>Informações sobre a empresa.</p>
            </div>
            <div>
                <h3>Contato</h3>
                <p>Email: contato@exemplo.com</p>
                <p>Telefone: (00) 1234-5678</p>
            </div>
            <div>
                <h3>Redes Sociais</h3>
                <ul>
                    <li><a href="https://facebook.com">Facebook</a></li>
                    <li><a href="https://twitter.com">Twitter</a></li>
                    <li><a href="https://instagram.com">Instagram</a></li>
                </ul>
            </div>
            </div>
           
        </footer>
    );
}
