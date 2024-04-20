import Header from "./Header";
import Navbar from "./Navbar";

function NoMatch() {
  return (
    <div>
       <Header/>
       <Navbar/>

      <div style={{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        marginTop:"15rem",
        gap:"1rem"
      }}>
              <img src="https://i.ibb.co/0M09gh3/browser.png" alt="" />

      <h2 style={{
        fontFamily:"poppins",
        fontWeight:"500"
      }}>Pagina não encontrada</h2>

      </div>

     
    </div>
  );
}

export default NoMatch;
