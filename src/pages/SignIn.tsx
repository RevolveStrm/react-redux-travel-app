import AuthForm from "../components/forms/AuthForm.tsx";
import {useSelector} from "react-redux";
import Loader from "../components/Loader.tsx";

const SignIn = () => {
    const loading = useSelector((state: any) => state.auth.loading);

    return (
        <main className="sign-in-page">
            <h1 className="visually-hidden">Travel App</h1>
            { loading ? <Loader/> : <AuthForm isSignUp={false}/>}
        </main>
    );
};

export default SignIn;