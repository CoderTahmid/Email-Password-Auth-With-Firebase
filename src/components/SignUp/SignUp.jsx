import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../../firebase.init";
import { useState } from "react";
import { FaEye, FaEyeDropper, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUp = () => {

    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSingUp = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const terms = e.target.terms.checked;

        setErrorMessage('');
        setSuccess(false);

        if (!terms) {
            setErrorMessage('Please accept our terms and conditions');
            return;
        }

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
        [A-Za-z\d@$!%*?&]{6,} --> Only allows letters, numbers, and allowed special chars, with a minimum length of 6
        */

        if (passwordRegex.test(password)) {
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

                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        console.log("Verification email sent");
                    })
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
                <fieldset className="fieldset relative">
                    <label className="label">Email</label>
                    <input type="email" className="input" placeholder="Email" name='email' />
                    <label className="label">Password</label>
                    <input type={showPassword ? 'text' : 'password'} className="input" placeholder="Password" name='password' />
                    <button onClick={() => setShowPassword(!showPassword)} className="btn btn-xs absolute right-6 top-26">{showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}</button>
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4">
                        <label className="label">
                            <input type="checkbox" name="terms" className="checkbox" />
                            Accept terms and condition
                        </label>
                    </fieldset>
                    <button className="btn btn-neutral mt-4">Sign up</button>
                </fieldset>
            </form>
            {
                errorMessage && <p className="text-red-600">{errorMessage}</p>
            }
            {
                success && <p className="text-green-500">Sign up is successful.</p>
            }
            <p className="m-2">Already have an account? please <Link to='/login'>Login</Link></p>
        </div>
    );
};

export default SignUp;