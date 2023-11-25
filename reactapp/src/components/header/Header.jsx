import { isAuthenticatedIsAdmin, isAuthenticatedIsSuperadmin, isAuthenticatedIsUser } from "../../helper/Authentication";
import { Link, useNavigate } from 'react-router-dom';
import './header.css';
function Header() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    }
    return (
        <header className='top-nav sticky-top'>
            {isAuthenticatedIsAdmin() &&
                <>
                    <Link className='subj link' to="/admin/home">Cup Gifts</Link>
                    <ul className='list'>
                        <li><button className='nav-list-item link' id="logout" onClick={handleLogout} >Logout</button></li>
                        <li><Link className='nav-list-item link' id="adminOrders" to="/admin/getAllOrders">Orders</Link></li>
                        <li><Link className='nav-list-item link' id="adminTheme" to="/admin/theme">Themes</Link></li>
                        <li><Link className='nav-list-item link' id="adminGifts" to="/admin/gift">Gifts</Link></li>
                        <li><Link className="nav-list-item link" id="adminHome" to="/admin/home">Home</Link></li>
                    </ul>
                </>
            }
            {isAuthenticatedIsUser() &&
                <>
                    <Link className='subj link' to="/user/home">Cup Gifts</Link>
                    <ul className='list'>
                        <li><button className='nav-list-item link' id="logout" onClick={handleLogout} >Logout</button></li>
                        <li><Link className='nav-list-item link' id="myOrderButton" to="/user/myorder">My Orders</Link></li>
                        <li><Link className="nav-list-item link" id="giftHomeButton" to="/user/home">Home</Link></li>
                    </ul>
                </>
            }
            {isAuthenticatedIsSuperadmin() &&
                <>
                    <Link className='subj link' to="/superAdmin/getAllUsers">Cup Gifts</Link>
                    <ul className='list'>
                        <li><button className='nav-list-item link' id="logout" onClick={handleLogout} >Logout</button></li>
                        <li><Link className='nav-list-item link' id="getUsersButton" to="/superAdmin/getAllUsers">Users</Link></li>
                    </ul>
                </>
            }
        </header>
    )
}
export default Header;