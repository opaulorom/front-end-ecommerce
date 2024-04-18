import { Link } from "react-router-dom";

function NoMatch() {
  return (
    <div>
      <h2>Pagina não encontrada</h2>
      <p>
        <Link to="/payment">Volte pra a pagina principal</Link>
      </p>
    </div>
  );
}

export default NoMatch;
