import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-item">
          <Link to="/">
            <img
              className="logo"
              src="../assets/logo-esc.png"
              alt="escape-game-logo"
            />
          </Link>
          <ul>
            <li className="footer-list">
              <NavLink to="/">Accueil</NavLink>
            </li>
            {/* <li>
              <NavLink to="/history">| Historique</NavLink>
            </li> */}
          </ul>
        </div>
        <div className="footer-item">
          <address>
            <span className="footer-blue">55 rue du Faubourd Saint-Honoré</span>
            75008 Paris
            <a className="footer-tel" href="tel: +33142928100">
              +33 1 42 92 81 00
            </a>
            <a href="mailto: contact@escape-game.com">
              contact@escape-game.com
            </a>
          </address>
          <p>
            Copyright ©
            <a
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              target="_blank"
            >
              SLI & SYL
            </a>{" "}
            2022
          </p>
        </div>
        <div className="footer-item">
          <h3>A propos</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
            exercitationem inventore.
          </p>
          <a className="footer-social" href="#">
            <FacebookOutlinedIcon />
          </a>
          <a className="footer-social" href="#">
            <TwitterIcon />
          </a>
          <a className="footer-social" href="#">
            <LinkedInIcon />
          </a>
          <a className="footer-social" href="#">
            <GitHubIcon />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
