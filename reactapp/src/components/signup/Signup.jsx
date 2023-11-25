import { useState } from 'react';
import './signup.css';
import { Link } from 'react-router-dom';
import { signupValidation, signupAuth } from '../../helper/Authentication';
function Signup() {
    const [userRegistration, setUserRegistration] = useState({
        email: "",
        username: "",
        mobileNumber: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState({ email: "", username: "", mobileNumber: "", password: "", confirmPassword: "" });
    const [result, setResult] = useState("");
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setResult("");
        setUserRegistration({ ...userRegistration, [name]: value });
        
        if (name === 'email') { errors.email = '' }
        else if (name === 'username') { errors.username = '' }
        else if (name === 'mobileNumber') { errors.mobileNumber = '' }
        else if (name === 'password') { 
            errors.password = '';
            errors.confirmPassword='';
        }
        else if (name === 'confirmPassword') { 
            errors.confirmPassword = '';
         }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorsObj = signupValidation(userRegistration);
        setErrors(errorsObj.errors);
        if (!errorsObj.status) {
            var message = await signupAuth(userRegistration);
            setResult(message);
            if(message==="successfull"){
                setUserRegistration({email: "", username: "", mobileNumber: "", password: "", confirmPassword: "" });
            }
        }
        
    }
    const handleBlur = (e) => {
        const name = e.target.name;
        if (name === 'email' && userRegistration.email === '') {
            errors.email = 'Please enter Email';
        }
        else if (name === 'username' && userRegistration.username === '') {
            errors.username = 'Please enter your username';
        }
        else if (name === 'mobileNumber' && userRegistration.mobileNumber === '') {
            errors.mobileNumber = 'Mobile number is required';
        }
        else if (name === 'password' && userRegistration.password === '') {
            errors.password = 'Please enter pPassword';
        }
        else if (name === 'confirmPassword' && userRegistration.confirmPassword === '') {
            errors.confirmPassword = 'PLease confirm your password';
        }
    }
    return (
        <div className='model'>
            <div className="reg-nav">
                Register
            </div>

            <div className="container box w-x bg-body mt">
                {result === "successfull" && <div className="border-success mt-2 bg-success p-2 text-white success">Signup successfull</div>}
                {result === "unsuccessfull" && <div className="border-danger mt-2 bg-danger p-2 text-white unsuccess">
                    This Email or Username is already registered
                </div>}
                <div className='pt-4 text-dec'>
                    <h3>Sign up with your email</h3>
                    Already have an account? <Link id="signinLink" className='text-decoration-none' to="/login">Login</Link>
                </div>
                <form id='signupForm' action='' onSubmit={handleSubmit}>
                    <div className="pt-4">
                        <input onBlur={handleBlur} onChange={handleInput} className="input-field"
                            value={userRegistration.email} placeholder="Enter email" type="email"
                            name="email" autoComplete='off' id="email" />
                    </div>
                    {errors.email && <div className='errors'>{errors.email}</div>}

                    <div className="pt-3 ">
                        <input onBlur={handleBlur} onChange={handleInput} className="input-field"
                            value={userRegistration.username} placeholder="Enter username" type="text"
                            name="username" autoComplete='off' id="username" />
                    </div>
                    {errors.username && <div className='errors'>{errors.username}</div>}

                    <div className="pt-3 ">
                        <input onBlur={handleBlur} onChange={handleInput} className="input-field"
                            value={userRegistration.mobileNumber} placeholder="Enter Mobilenumber" type="number"
                            name="mobileNumber" autoComplete='off' id="mobileNumber" />
                    </div>
                    {errors.mobileNumber && <div className='errors'>{errors.mobileNumber}</div>}

                    <div className="pt-3 ">
                        <input onBlur={handleBlur} onChange={handleInput} className="input-field"
                            value={userRegistration.password} placeholder="Password" type="password"
                            name="password" autoComplete='off' id="password" />
                    </div >
                    {errors.password && <div className='errors'>{errors.password}</div>}

                    <div className="pt-3 ">
                        <input onBlur={handleBlur} onChange={handleInput} className="input-field"
                            value={userRegistration.confirmPassword} placeholder="Confirm Password" type="password"
                            name="confirmPassword" autoComplete='off' id="confirmPassword" />
                    </div>
                    {errors.confirmPassword && <div className='errors'>{errors.confirmPassword}</div>}

                    <div className='pt-5 pb-4'>
                        <button id="submitButtton" className="button" type="submit">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
}
export default Signup