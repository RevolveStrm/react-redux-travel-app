import {Link, NavigateFunction, useLocation, useNavigate} from "react-router-dom";
import HeaderNav from "./HeaderNav.tsx";
import {logout} from "../storage/auth/slice.ts";
import {useAppDispatch} from "../storage/store.ts";

const Header = () => {
    const navigate: NavigateFunction = useNavigate();
    const dispatch = useAppDispatch();

    const pathname: string = useLocation().pathname;
    const navHidden: boolean = ['/sign-in', '/sign-up'].includes(pathname);

    const handleSignOut = () => {
        dispatch(logout('logout'));
        navigate('/sign-in');
    }

    return (
        <header className='header'>
            <div className='header__inner'>
                <Link data-test-id="header-logo" className="header__logo" to='/'>Travel App</Link>
                {!navHidden && <HeaderNav onSignOut={handleSignOut}/>}
            </div>
        </header>
    );
};

export default Header;