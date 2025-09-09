import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { useRef, useState } from 'react';
import { auth } from '../../firebase.init';
import { Link } from 'react-router-dom';

const Login = () => {

    const [success, setSuccess] = useState(false);
    const [loginError, setLoginError] = useState('');
    const emailRef = useRef();

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        setSuccess(false);
        setLoginError('');

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)

                if (!result.user.emailVerified) {
                    setLoginError("Please verify your email address");
                } else {
                    setSuccess(true);
                }

            })
            .catch(error => {
                console.log(error.message);
                setLoginError(error.message);
            })
    }

    const handleForgetPassword = () => {
        console.log("get me email address ", emailRef.current.value); // output: [email address]
        /*
        ekhane amra email e ref={emailRef} eita pathanor maaddhome email field'r value get korte partasi
        */
        const email = emailRef.current.value;

        if(!email) {
            console.log("Please provide a valid email address");
        } else {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    alert("Password Reset email has been sent, please check your email");
                })
        }
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleLogin} className="card-body">
                        <fieldset className="fieldset">
                            <label className="label">Email</label>
                            <input ref={emailRef} type="email" name='email' className="input" placeholder="Email" required />
                            <label className="label">Password</label>
                            <input type="password" name='password' className="input" placeholder="Password" />
                            <div onClick={handleForgetPassword}><a className="link link-hover">Forgot password?</a></div>
                            <button className="btn btn-neutral mt-4">Login</button>
                        </fieldset>
                    </form>
                    {
                        success && <p className='text-green-500'>User login successful</p>
                    }
                    {
                        loginError && <p className='text-red-500'>{loginError}</p>
                    }
                    <p>New to this website sign up <Link to="/signUp">Sign up</Link> </p>
                </div>
            </div>
        </div>
    );
};

export default Login;