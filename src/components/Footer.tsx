import {Link} from "react-router-dom";
import heartSVG from '../assets/images/heart.svg';

const Footer = () => {
    const myFavouriteSite: string = 'https://binary-studio.com';

    return (
        <footer className="footer">
          <span className="footer__text">
              from
              <Link className="footer__link" to={myFavouriteSite}>binary studio</Link>
              with
            <img className="footer__icon" src={heartSVG} alt="heart" />
          </span>
        </footer>
    );
};

export default Footer;