import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import styles from "./SuccessPage.module.css";
const SuccessPage = () => {
  return (
    <div className={styles.container}>
      <Header></Header>
      <Navbar></Navbar>

      <div className={styles.flex}>
      <a>
        <img src="https://i.imgur.com/1gdmFPF.png" title="source: imgur.com" />
      </a>
      <p className={styles.container__p}>
        Agradecemos por sua compra! Confirmamos que seu pedido foi realizado com
        sucesso.
      </p>
      </div>
    
      <div className={styles.flex}>
      <h1  className={styles.container__h1}>Informações de Contato:</h1>
      <span  className={styles.container__span}>Telefone: [Número de Telefone]</span>
      <span  className={styles.container__span}>E-mail: [E-mail de Suporte]</span>
      </div>

     
    </div>
  );
};

export default SuccessPage;
