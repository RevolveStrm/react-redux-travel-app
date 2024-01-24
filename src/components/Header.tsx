import {Link, useLocation} from "react-router-dom";
import HeaderNav from "./HeaderNav.tsx";
import {ReactElement} from "react";

const Header = (): ReactElement => {
    const pathname: string = useLocation().pathname;
    const navHidden: boolean = ['/sign-in', '/sign-up'].includes(pathname);

    return (
        <header className='header'>
            <div className='header__inner'>
                <Link data-test-id="header-logo" className="header__logo" to='/'>Travel App</Link>
                {!navHidden && <HeaderNav/>}
            </div>
        </header>
    );
};

export default Header;