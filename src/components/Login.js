import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import testimonalIMg from '../Assets/UserTestimonial.svg'
import { useContext, useState } from 'react';
import AuthContext from '../store/AuthContext';

const Login = () => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [emailError, setEMailError] = useState(false);
    const [pwdError, setPwdError] = useState(false);
    const [userError, setUserError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const switchAuthModeHandler = () => {
        setEMailError(false);
        setUserError(false);
        setPwdError(false);
        setErrorMessage('');
        setIsLogin((prevState) => !prevState);
    };

    const formSubmitHandler = (e) => {
        e.preventDefault();
        if (enteredUsername === '' && enteredPassword === '') {
            setEMailError(true);
            setUserError(true);
            setPwdError(true);
        }
        else if (!isLogin && enteredUsername === '') {
            setUserError(true);
        }
        else if (enteredPassword === '') {
            setPwdError(true);
        } else if (enteredEmail === '') {
            setEMailError(true);
        } else {
            let url;
            if (isLogin) {
                url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBRzaP7zpKGecgJp1zHE2YMk1jJQ3YFny0";
            }
            else {
                url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBRzaP7zpKGecgJp1zHE2YMk1jJQ3YFny0';
            }

            fetch(url, {
                method: "POST",
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true
                }),
                headers: { 'Content-Type': 'application/json' }
            }).then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return res.json().then((data) => {
                        let errorMessage = "Auth Failed";
                        if (data && data.error && data.error.message) {
                            errorMessage = data.error.message;
                        }
                        throw new Error(errorMessage);
                    });
                }
            }).then((data) => {
                const name = data.email.replace('@gmail.com', '');
                const expirationTime = new Date(new Date().getTime() + (+data.expiresIn * 1000));
                localStorage.setItem("localId", data.localId);
                localStorage.setItem("username", name);
                authCtx.login(data.idToken, expirationTime.toISOString());
                navigate('/home');
            }).catch((err) => {
                setErrorMessage(err.message + " ERROR");
            })

        }
    }


    return <section className="container my-5">
        <div className="row align-items-center justify-content-around">
            <div className="col-lg-6  bg-white text-left">
                <h2 className="font-weight-bold w-75">Start exploring the camps from all around the world</h2>
                <form className="text-start" onSubmit={formSubmitHandler}>
                    {!isLogin && (<div className="form-group ">
                        <label htmlFor="name" className="mb-2 font-weight-bold">Username</label>
                        <input type="text" className="form-control p-2 mb-1 " id="name" aria-describedby="name"
                            placeholder="Enter Username" onChange={(e) => { setEnteredUsername(e.target.value); setUserError(false) }} />
                        {userError && <span className='text-danger p-0'>please enter username</span>}
                    </div>
                    )}
                    <div className="form-group ">
                        <label htmlFor="email" className="mb-2 font-weight-bold">Email</label>
                        <input type="email" className="form-control p-2 mb-1 " id="email" aria-describedby="email"
                            placeholder="Enter Email" onChange={(e) => { setEnteredEmail(e.target.value); setEMailError(false) }} />
                        {emailError && <span className='text-danger'>please enter email</span>}
                    </div>
                    <div className="form-group ">
                        <label htmlFor="pwd" className="mb-2 font-weight-bold">Password</label>
                        <input type="password" className="form-control p-2 mb-1 " id="pwd"
                            placeholder="Enter your Password" onChange={(e) => { setEnteredPassword(e.target.value); setPwdError(false) }} />
                        {pwdError && <span className='text-danger'>please enter password</span>}
                    </div>

                    <input type="submit" className="form-control p-2 bg-dark text-white mb-1 p-3 font-weight-bold" />
                    <strong className='text-danger'>{errorMessage} </strong>
                    <br />
                    <div onClick={switchAuthModeHandler}>
                        {isLogin ? (<p>Not a user yet? <Link className="font-weight-bold">create an account</Link> </p>)
                            : (<p>Already a user? <Link className="font-weight-bold">Login</Link> </p>)}
                    </div>
                </form>
            </div>
            <div className="col-lg-6 ">
                <div className="w-50 m-auto ">
                    <strong className="text-justify"> "Yelpcamp has honestly saved me hours of research time, and the camps
                        on here are definetly
                        well
                        picked and added."
                    </strong>
                    <div className="row mt-5 align-items-center justify-content-end">
                        <div className="col-sm-4 col-lg-1">
                            <img src={testimonalIMg} alt="testimonal" />
                        </div>
                        <div className="col-sm-8 col-lg-4 pt-2">
                            <strong>May Andrews</strong>
                            <p>Professional Hiker</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
}

export default Login;