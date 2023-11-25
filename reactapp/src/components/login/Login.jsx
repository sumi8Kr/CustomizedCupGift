import { useState } from 'react';
import './login.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { loginValidation, loginAuth, isAdmin, isUser, isAuthenticatedIsAdmin, isAuthenticatedIsUser, isAuthenticatedIsSuperadmin, isSuperAdmin } from '../../helper/Authentication';
function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [failed, setFailed] = useState(false);
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setLoginInfo({ ...loginInfo, [name]: value });
        setIsEmailValid(true);
        setFailed(false);
        if (name === 'email') {
            errors.email = '';
        }
        else if (name === 'password') {
            errors.password = '';
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorsObj = loginValidation(loginInfo);
        setErrors(errorsObj.errors);
        if (!errorsObj.error) {
            let isValid = await isAdmin(loginInfo.email) || await isUser(loginInfo.email) || await isSuperAdmin(loginInfo.email);
            if (isValid) {
                let token = await loginAuth(loginInfo);
                if (token) {
                    (isAuthenticatedIsAdmin() && navigate("/admin/home"))
                        || (isAuthenticatedIsSuperadmin() && navigate("/superAdmin/getAllUsers"))
                        || (isAuthenticatedIsUser() && navigate("/user/home"))
                }
                else {
                    setFailed(true);
                }
            }
            else {
                setIsEmailValid(false)
            }
        }

    };
    const handleBlur = (e)=>{
        const name = e.target.name;
        if(name==='email' && loginInfo.email===''){
            errors.email='Email is required';
        }
        else if(name==='password' && loginInfo.password===''){
            errors.password='Password is required';
        }
    }
    return (
        <div className='model'>
            <div className="reg-nav">
                Login
            </div>
            {(isAuthenticatedIsAdmin() && <Navigate to="/admin/home" />)
                || (isAuthenticatedIsUser() && <Navigate to="/user/home" />)
                || (isAuthenticatedIsSuperadmin() && <Navigate to="/superAdmin/getAllUsers" />)}
            <div className="container box w-x mb-5 bg-body">
                {failed && <div className="border-danger mt-2 bg-danger p-2 text-white unsuccess">
                    Incorrect password
                </div>}
                {!isEmailValid && <div className="border-danger mt-2 bg-danger p-2 text-white unsuccess">
                    Invalid email</div>}

                <div className='pt-4 text-dec'>
                    <h3>Login with your email</h3>
                    Don't have an account? <Link id="signupLink" className='text-decoration-none' to="/signup">Sign Up</Link>
                </div>
                <form id='loginForm' action='' onSubmit={handleSubmit}>
                    <div className="pt-4 form-group">
                        <input onChange={handleInput} onBlur={handleBlur} className="input-field"
                            value={loginInfo.email} placeholder="Enter email" type="email"
                            autoComplete='off' name="email" id="email" />
                    </div>
                    {errors.email && <div className='errors'>{errors.email}</div>}

                    <div className="pt-4 form-group">
                        <input onChange={handleInput} onBlur={handleBlur} className="input-field"
                            value={loginInfo.password} placeholder="Password" type="password"
                            autoComplete='off' name="password" id="password" />
                    </div >
                    {errors.password && <div className='errors'>{errors.password}</div>}

                    <div className='pt-5 pb-5'>
                        <button id="loginButtton" className="button" type="submit">
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Login
