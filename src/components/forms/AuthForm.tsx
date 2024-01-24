import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/validateEmail.ts";

export interface AuthFormProps {
    isSignUp: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isSignUp }) => {
    const navigate = useNavigate();

    const title = isSignUp ? "Sign Up" : "Sign In";
    const linkText = isSignUp ? "Sign In" : "Sign Up";
    const linkHref = isSignUp ? "/sign-in" : "/sign-up";
    const linkTestId = isSignUp ? "auth-sign-in-link" : "auth-sign-up-link";

    const [currentEmail, setCurrentEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setCurrentEmail(value);
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setCurrentPassword(value);
    }

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (currentPassword.length >= 3 && validateEmail(currentEmail)) {
            navigate('/');
        }
    };

    return (
        <>
            <form className={isSignUp ? "sign-up-form" : "sign-in-form"} autoComplete="off">
                <h2 className={isSignUp ? "sign-up-form__title" : "sign-in-form__title"}>{title}</h2>
                {isSignUp && (
                    <label className="input">
                        <span className="input__heading">Full name</span>
                        <input
                            data-test-id="auth-full-name"
                            name="full-name"
                            type="text"
                            required
                        />
                    </label>
                )}
                <label className="input">
                    <span className="input__heading">Email</span>
                    <input
                        data-test-id="auth-email"
                        name="email"
                        type="email"
                        value={currentEmail}
                        onChange={handleEmailChange} required />
                </label>
                <label className="input">
                    <span className="input__heading">Password</span>
                    <input
                        data-test-id="auth-password"
                        name="password"
                        type="password"
                        value={currentPassword}
                        onChange={handlePasswordChange}
                        autoComplete="new-password"
                        required/>
                </label>
                <button data-test-id="auth-submit" className="button" type="submit" onClick={handleSubmit}>
                    {title}
                </button>
            </form>
            <span>
                {isSignUp ? "Already have an account?" : "Don't have an account?"}
                <a
                    data-test-id={linkTestId}
                    href={linkHref}
                    className={isSignUp ? "sign-up-form__link" : "sign-in-form__link"}
                >
                {linkText}
              </a>
            </span>
        </>
    );
};

export default AuthForm;
