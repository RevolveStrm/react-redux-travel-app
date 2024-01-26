import React, {useState} from 'react';
import { validateEmail } from "../../utils/validateEmail.ts";
import {useDispatch, useSelector} from "react-redux";
import {signIn, signUp} from "../../storage/auth/asyncActions.ts";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {RootState} from "../../storage/store.ts";

export interface AuthFormProps {
    isSignUp: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isSignUp }) => {
    const dispatch = useDispatch();
    const { error } = useSelector((state: RootState) => state.auth);

    const title = isSignUp ? "Sign Up" : "Sign In";
    const linkText = isSignUp ? "Sign In" : "Sign Up";
    const linkHref = isSignUp ? "/sign-in" : "/sign-up";
    const linkTestId = isSignUp ? "auth-sign-in-link" : "auth-sign-up-link";

    const [currentFullName, setCurrentFullName] = useState('');
    const [currentEmail, setCurrentEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');

    React.useEffect(() => {
        toast.error(error, {
            className: 'notification',
            hideProgressBar: true,
            autoClose: 2000,
        });
    }, [error]);

    const handleFullNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setCurrentFullName(value);
    }

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

        if (!currentPassword || currentPassword.length < 3) {
            toast.error('Password must be at least 3 characters', {
                className: 'notification',
                hideProgressBar: true,
                autoClose: 2000,
            });
            return;
        }
        if (!currentEmail || !validateEmail(currentEmail)) {
            toast.error('Please enter a valid email address', {
                className: 'notification',
                hideProgressBar: true,
                autoClose: 2000,
            });
            return;
        }
        if (isSignUp && !currentFullName) {
            toast.error('Full name is required', {
                className: 'notification',
                hideProgressBar: true,
                autoClose: 2000,
            });
            return;
        }

        if (isSignUp) {
            // @ts-ignore
            dispatch(signUp({
                fullName: currentFullName,
                email: currentEmail,
                password: currentPassword
            }));
        } else {
            // @ts-ignore
            dispatch(signIn({
                email: currentEmail,
                password: currentPassword
            }));
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
                            onChange={handleFullNameChange}
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
