import Header from "./Header";
import Navbar from "./Navbar";
import styles from "./NoMatch.module.css"
function NoMatch() {
  return (
    <div>
       <Header/>
       <Navbar/>

      <div  className={styles.container}>
              <img src="https://i.ibb.co/0M09gh3/browser.png" alt="" />

      <h2 className={styles.title}>Pagina não encontrada!</h2>

      </div>

     
    </div>
  );
}

export default NoMatch;
