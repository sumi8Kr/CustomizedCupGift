import './updateuser.css';
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom'
import Header from '../../header/Header';
import { api_url } from '../../../helper/Api_url';
function Updateuser() {
    const token = "Bearer " + JSON.parse(localStorage.getItem('auth')).jwtToken;
    const navigate = useNavigate();
    const { userId } = useParams();
    const [userInfo, setUserInfo] = useState({
        email: '',
        username: '',
        mobileNumber: '',
        password: '',
        userRole: ''
    });
    useEffect(() => {
        loadUser()
    }, [])
    const loadUser = async () => {
        let response = await fetch(`${api_url}/superAdmin/getUser/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
        setUserInfo(await response.json());
    }
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserInfo({ ...userInfo, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        let response = await fetch(`${api_url}/superAdmin/editUser/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(userInfo)
        })
        if (response.ok) {
            navigate("/superAdmin/getAllUsers")
        }
    };
    return (
        <>
            <Header />
            <div className="container box w-x bg-body mt-4">
                <div className='pt-4 text-dec'>
                    <h2>Edit user detail</h2>
                    <Link className='text-decoration-none' to="/superAdmin/getAllUsers">
                        <i className="fa fa-backward i-size" aria-hidden="true"></i>
                    </Link>
                </div>
                <form id='addUserForm' action='' onSubmit={handleSubmit}>
                    {
                        userInfo.userRole === 'Admin' &&
                        <select onChange={handleInput} name='userRole' className="input-field mt-4" aria-label="Default select example">
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                        </select>
                    }
                    {
                        userInfo.userRole === 'User' &&
                        <select onChange={handleInput} name='userRole' className="input-field mt-4" aria-label="Default select example">
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>

                        </select>
                    }
                    <div className="pt-3">
                        <input className="input-field disable"
                            value={userInfo.email} onChange={handleInput} placeholder="Enter email" type="email"
                            name="email" autoComplete='off' id="email" disabled />
                    </div>

                    <div className="pt-3 ">
                        <input className="input-field disable"
                            value={userInfo.username} onChange={handleInput} placeholder="Enter username" type="text"
                            name="username" autoComplete='off' id="username" disabled />
                    </div>

                    <div className="pt-3 ">
                        <input className="input-field disable"
                            value={userInfo.mobileNumber} onChange={handleInput} placeholder="Enter Mobilenumber" type="number"
                            name="mobileNumber" autoComplete='off' id="mobileNumber" disabled />
                    </div>

                    <div className="pt-3 ">
                        <input className="input-field disable"
                            value={userInfo.password} onChange={handleInput} placeholder="Password" type="password"
                            name="password" id="password" disabled />
                    </div >

                    <div className='pt-5 pb-4'>
                        <button id="updateButtton" className="button" type="submit">
                            Update user
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default Updateuser;