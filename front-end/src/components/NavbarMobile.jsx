import React, { useState, useRef } from 'react';
import "./NavbarMobile.css";

const NavbarMobile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const indicatorRef = useRef(null);
  const [activeLink, setActiveLink] = useState("home");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className='hideMenuMobile'>
      <div>
        <header>
          <div className="navbarMobile"> {/* Atualizado o nome da classe aqui */}
            <div className="menu-iconMobile" onClick={toggleMenu}> {/* Atualizado o nome da classe aqui */}
              {isMenuOpen ? (
                <div>
                  <img
                    src='https://i.ibb.co/YZCdvyS/close-5.png'
                    alt="Close Icon"
                    style={{
                      color: "white",
                      marginRight: "auto",
                      fontSize: "2rem",
                    }}
                  />
                </div> // Ícone de fechar menu
              ) : (
                <div>
                  <img
                    src='https://i.ibb.co/3ddF8R2/menu.png'
                    alt="Menu Icon"
                    style={{ color: "white", fontSize: "2rem" }}
                  />
                </div> // Ícone de três linhas
              )}
            </div>

            {/* Menu Navbar */}
            {isMenuOpen && (
              <div className="menu-itemsMobile">
                <div className="mobileMenuMobile"> {/* Atualizado o nome da classe aqui */}
                  NavbarMobile
                </div>
              </div>
            )}
          </div>
        </header>
      </div>
    </div>
  );
}

export default NavbarMobile;
