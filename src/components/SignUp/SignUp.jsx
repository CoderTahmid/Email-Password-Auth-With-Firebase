import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.init";
import { useState } from "react";

const SignUp = () => {

    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSingUp = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        setErrorMessage('');
        setSuccess(false);

        if (password.length < 6) {
            setErrorMessage('Password should be 6 character of longer');
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        /*
        here
        (?=.*[a-z]) --> at least one lowercase
        (?=.*[A-Z]) --> at least one uppercase
        (?=.*\d) --> at least one digit
        (?=.*[@$!%*?&]) --> at least one special digit
        [A-Za-z\d@$!%*?&]{8,} --> Only allows letters, numbers, and allowed special chars, with a minimum length of 8
        */

        if (!passwordRegex.test(password)) {
            /*
            amra jante chacchi je password'r moddhe oi character gula ache kina
            jodi na thake tahole ei if block ta execute hbe
            */
            setErrorMessage('At least one uppercase, one lowercase, one number, one special character need for you password');
            return;

        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess(true);
            })
            .catch(err => {
                console.log("Error", err);
                setErrorMessage(err.message);
                setSuccess(false);
            })
    }

    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
            <h1 className="text-5xl font-bold">Sign up now!</h1>
            <form onSubmit={handleSingUp} className="card-body">
                <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input type="email" className="input" placeholder="Email" name='email' />
                    <label className="label">Password</label>
                    <input type="password" className="input" placeholder="Password" name='password' />
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Sign up</button>
                </fieldset>
            </form>
            {
                errorMessage && <p className="text-red-600">{errorMessage}</p>
            }
            {
                success && <p className="text-green-500">Sign up is successful.</p>
            }
        </div>
    );
};

export default SignUp;