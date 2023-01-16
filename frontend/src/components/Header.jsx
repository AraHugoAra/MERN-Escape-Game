import "../main.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const Header = () => {
  const storage = localStorage.getItem("user");
  const [user, setUser] = useState(storage ? JSON.parse(storage) : "");

  const [authentified, setAuthentified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const checkAuth = async () => {
    setLoading(true);
    try {
      const resp = await fetch("http://localhost:3000/checkToken", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: user.token,
        },
      });
      const data = await resp.json();
      setLoading(false);
      if (data.status === 200) {
        setAuthentified(true);
      }
    } catch (err) {
      setAuthentified(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    user.token && checkAuth();
    setLoading(false);
    // : setAuthentified(false)
  }, [user, updating]);

  // const navigate = useNavigate();
  const handleDisconnect = () => {
    localStorage.removeItem("user");
    setUser("");
    window.location = "/login";
    // setUpdating(u => !u)
    // return navigate('/login')
  };

  return (
    <header>
      <ul className="header-list">
        <li>
          <NavLink to="/">
            <img className="logo" src="../assets/logo-esc.png" alt=""></img>
          </NavLink>
        </li>
        {!loading && authentified ? (
          <>
            <li>Bonjour {user.userName}</li>

            <li>
              <NavLink to="/history" className="header-history">
                Historique
              </NavLink>
            </li>

            <li className="header-deconnexion" onClick={handleDisconnect}>
              Déconnexion
            </li>
          </>
        ) : null}
        {!authentified && !loading ? (
          <li>
            <NavLink className="connexion" to="/login">
              Connexion
            </NavLink>
          </li>
        ) : null}
        {/* <li class="connexion">Connexion</li> */}
      </ul>
    </header>
  );
};

export default Header;
