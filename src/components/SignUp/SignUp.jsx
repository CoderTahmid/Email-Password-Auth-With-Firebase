import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.init";
import { useState } from "react";

const SignUp = () => {

    const [errorMessage, setErrorMessage] = useState('');

    const handleSingUp = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        setErrorMessage('');

        createUserWithEmailAndPassword(auth, email, password)
            .then(result  => {
                console.log(result.user);
            })
            .catch(err => {
                console.log("Error", err);
                setErrorMessage(err.message);
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
        </div>
    );
};

export default SignUp;