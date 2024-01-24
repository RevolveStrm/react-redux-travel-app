import AuthForm from "../components/forms/AuthForm.tsx";

const SignIn = () => {
    return (
        <main className="sign-in-page">
            <h1 className="visually-hidden">Travel App</h1>
            <AuthForm isSignUp={false}/>
        </main>
    );
};

export default SignIn;