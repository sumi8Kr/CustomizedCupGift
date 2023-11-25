import { api_url } from "./Api_url";
export function isAuthenticatedIsSuperadmin() {
    let tokenObj = JSON.parse(localStorage.getItem('auth'))
    if (tokenObj && tokenObj.userRole==='SuperAdmin') {
        return true;
    }
    return false;
}
export function isAuthenticatedIsAdmin() {
    let tokenObj = JSON.parse(localStorage.getItem('auth'));
    if (tokenObj && tokenObj.userRole==='Admin') {
        return true;
    }
    return false;
}
export function isAuthenticatedIsUser() {
    let tokenObj = JSON.parse(localStorage.getItem('auth'));
    if (tokenObj && tokenObj.userRole==='User') {
        return true;
    }
    return false;
}
export const isSuperAdmin = async (email) => {
    const response = await fetch(`${api_url}/isSuperAdmin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body : email
    })
    return response.json();
}
export const isAdmin = async (email) => {
    const response = await fetch(`${api_url}/isAdmin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body : email
    })
    
    return response.json();
}
export const isUser = async (email) => {
    const response = await fetch(`${api_url}/isUser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body : email
    })
    
    return response.json();
}
export const loginAuth = async (loginModel) => {
    const response = await fetch(`${api_url}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginModel)
    })
    if (response.ok) {
        const tokenObj = await response.json();
        localStorage.setItem('auth', JSON.stringify(tokenObj));
        return tokenObj.jwtToken;
    }
    return null;
}
export async function signupAuth(userModel) {
    const response = await fetch(`${api_url}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userModel)
    })
    if (response.ok) {
        return "successfull"
    }
    else {
        return "unsuccessfull"
    }
}
export function loginValidation(props) {
    let errorsObj = { errors: { email: '', password: '' }, error: false };
    if (props.email === '') {
        errorsObj.errors.email = 'Please enter Email';
        errorsObj.error = true;
    }
    if (props.password === '') {
        errorsObj.errors.password = 'Please enter your Password';
        errorsObj.error = true;
    }
    return (errorsObj);
}
export function signupValidation(props) {
    let errorsObj = {
        errors: {
            email: "",
            username: "",
            mobileNumber: "",
            password: "",
            confirmPassword: ""
        }, status: false
    };
    if (props.userRole === '') {
        errorsObj.errors.userRole = 'Please select user type';
        errorsObj.status = true;
    }
    if (props.email === '') {
        errorsObj.errors.email = 'please enter Email';
        errorsObj.status = true;
    }
    else{
        if(!props.email.match("^[a-zA-Z][a-zA-Z0-9_+&*-]*(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:([a-zA-Z])[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$")){
            errorsObj.errors.email='Invalid email';
            errorsObj.status = true;
        }
    }
    if (props.username === '') {
        errorsObj.errors.username = 'Please enter username';
        errorsObj.status = true;
    }
    else {
        if (props.username.length < 4) {
            errorsObj.errors.username = 'Must have atleast 4 character';
            errorsObj.status = true;
        }
    }
    if (props.mobileNumber === '') {
        errorsObj.errors.mobileNumber = 'Please enter Mobile number';
        errorsObj.status = true;
    }
    else {
        if (props.mobileNumber.length !== 10) {
            errorsObj.errors.mobileNumber = '10 character required';
            errorsObj.status = true;
        }
        else if(props.mobileNumber<Math.pow(10,9)){
            errorsObj.errors.mobileNumber='Invalid mobile number';
            errorsObj.status=true;
        }
    }
    if (props.password === '') {
        errorsObj.errors.password = 'Password is required';
        errorsObj.status = true;
    }
    else {
        if (props.password.length < 8) {
            errorsObj.errors.password = 'Password must contains atleast 8 character';
            errorsObj.status = true;
        }
        else if (props.password.length > 15) {
            errorsObj.errors.password = 'Password should have less than 15 character';
            errorsObj.status = true;
        }
    }
    if (props.confirmPassword === '') {
        errorsObj.errors.confirmPassword = 'Please Confirm Password';
        errorsObj.status = true;
    }
    else {
        if (props.confirmPassword !== props.password) {
            errorsObj.errors.confirmPassword = 'Password doesn\'t match';
            errorsObj.status = true;
        }
    }
    return (errorsObj);
}
