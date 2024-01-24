import {NavLink} from "react-router-dom";
import briefcaseSVG from  '../assets/images/briefcase.svg';
import userSVG from  '../assets/images/user.svg';

const HeaderNav = () => {
    return (
        <nav data-test-id="header-nav" className="header__nav">
            <ul className="nav-header__list">
                <li className="nav-header__item" title="Bookings">
                    <NavLink to='/bookings' data-test-id="header-bookings-link" className="nav-header__inner">
                        <span className="visually-hidden">Bookings</span>
                        <img src={briefcaseSVG} alt="bookings" />
                    </NavLink>
                </li>
                <li className="nav-header__item" title="Profile">
                    <div data-test-id="header-profile-nav" className="nav-header__inner profile-nav" tabIndex={0}>
                        <span className="visually-hidden">Profile</span>
                        <img src={userSVG} alt="profile" />
                        <ul data-test-id="header-profile-nav-list" className="profile-nav__list">
                            <li data-test-id="header-profile-nav-username" className="profile-nav__item">John Doe</li>
                            <li className="profile-nav__item">
                                <NavLink
                                    to='/sign-in'
                                    data-test-id="header-profile-nav-sign-out"
                                    className="profile-nav__sign-out button">
                                    Sign Out
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default HeaderNav;