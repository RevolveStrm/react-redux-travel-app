import AuthForm from "../components/forms/AuthForm.tsx";

const SignUp = () => {
    return (
        <main className="sign-up-page">
            <h1 className="visually-hidden">Travel App</h1>
            <AuthForm isSignUp={true}/>
        </main>
    );
};

export default SignUp;