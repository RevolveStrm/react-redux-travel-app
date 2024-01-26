import Header from "./components/Header.tsx";
import {Location, Navigate, NavigateFunction, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Home from "./pages/Home.tsx";
import SignUp from "./pages/SignUp.tsx";
import SignIn from "./pages/SignIn.tsx";
import Bookings from "./pages/Bookings.tsx";
import Trip from "./pages/Trip.tsx";
import Footer from "./components/Footer.tsx";
import {ToastContainer} from "react-toastify";
import {useSelector} from "react-redux";
import {setToken} from "./storage/auth/slice.ts";
import React from "react";
import {getAuthenticatedUser} from "./storage/auth/asyncActions.ts";
import {RootState, useAppDispatch} from "./storage/store.ts";

function App() {
    const location: Location = useLocation();
    const navigate: NavigateFunction = useNavigate();
    const dispatch = useAppDispatch();
    const { user, token } = useSelector((state: RootState) => state.auth);

    React.useEffect(() => {
        const token: string | null = localStorage.getItem('token');
        if (token) {
            dispatch(setToken(token));
        } else {
            if (location.pathname !== '/sign-up') {
                navigate('/sign-in');
            }
        }
    }, []);

    React.useEffect(() => {
        if (token) {
            dispatch(getAuthenticatedUser());
            navigate('/');
        } else {
            if (location.pathname !== '/sign-up') {
                navigate('/sign-in');
            }
        }
    }, [token]);

    React.useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user]);

    return (
        <>
            <ToastContainer/>
            <Header/>
            <Routes>
                <Route path='/sign-up' element={<SignUp/>}/>
                <Route path='/sign-in' element={<SignIn/>}/>
                {
                    token ?
                    <>
                        <Route path='/' element={<Home/>}/>
                        <Route path='/bookings' element={<Bookings/>}/>
                        <Route path='/trip/:tripId' element={<Trip/>}/>
                        <Route path='*' element={<Navigate to='/' replace/>}/>
                    </> :
                    <Route path='*' element={<Navigate to='/sign-in' replace/>}/>
                }
            </Routes>
            <Footer/>
        </>
    )
}

export default App
