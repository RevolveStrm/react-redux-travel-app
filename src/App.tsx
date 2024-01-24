import Header from "./components/Header.tsx";
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import SignUp from "./pages/SignUp.tsx";
import SignIn from "./pages/SignIn.tsx";
import Bookings from "./pages/Bookings.tsx";
import Trip from "./pages/Trip.tsx";
import Footer from "./components/Footer.tsx";

function App() {
    return (
        <>
            <Header/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/sign-up' element={<SignUp/>}/>
                <Route path='/sign-in' element={<SignIn/>}/>
                <Route path='/bookings' element={<Bookings/>}/>
                <Route path='/trip/:tripId' element={<Trip/>}/>
                <Route path='*' element={<Navigate to='/' replace/>}/>
            </Routes>
            <Footer/>
        </>
    )
}

export default App
