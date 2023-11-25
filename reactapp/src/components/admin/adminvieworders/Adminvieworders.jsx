import axios from "axios";
import React, {useState, useEffect} from "react";
import Header from "../../header/Header";
import "./adminvieworders.css"
import { signupValidation } from '../../../helper/Authentication';

const Adminvieworders = () => {
    const token = "Bearer " + JSON.parse(localStorage.getItem('auth')).jwtToken;
    const [orders, setOrders] = useState([]);

    useEffect(()=>{
        loadOrders();
    },[]);
/*
    const loadOrders = async () =>{
        const result = await axios.get("http://localhost:8080/admin/getAllOrders");
        setOrders(result.data);
    }*/
    const loadOrders = async () => {
        let result = await fetch("http://localhost:8080/admin/getAllOrders", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
        setOrders(await result.json());
    }
    return (
        <div>
            <Header/>
            <div id="orders" >
             <table className="table-container" rules='rows'>
                    <thead className="table-head">
                        <tr>
                            <th scope="col" className="rowstyle">Order Id</th>
                            <th scope="col" className="rowstyle">User Id</th>
                            <th scope="col" className="rowstyle">Gift Name</th>
                            <th scope="col" className="rowstyle">Price</th>
                            <th scope="col" className="rowstyle">Quanity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((ord, index) => (
                                <tr class="align-middle">
                                    <td className="rowstyle">{ord.orderId}</td>
                                    <td className="rowstyle">{"User"+ord.user.userId}</td>
                                    <td className="rowstyle">{ord.gift.giftName}</td>
                                    <td className="rowstyle">{ord.orderPrice}</td> 
                                    <td className="rowstyle">{ord.quantity}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
        </div>
        </div>
    );
}
export default Adminvieworders;