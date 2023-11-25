import axios from "axios";
import React, { useState, useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Header from "../header/Header";

import "./myorder.css"
const Myorder = () => {
    const token = "Bearer " + JSON.parse(localStorage.getItem('auth')).jwtToken;
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadOrders();
    }, []);
    /*
    const loadOrders = async () => {
        const result = await axios.get("http://localhost:8080/user/myOrder");
        setOrders(result.data);
    }*/
    const loadOrders = async () => {
        let result = await fetch("http://localhost:8080/user/myOrder", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
        setOrders(await result.json());
    }
    /*
    const deleteOrder = async id =>{
        await axios.delete(`http://localhost:8080/user/deleteOrder/${id}`);
        loadOrders();
    }*/
    const deleteOrder = async id => {
        await fetch(`http://localhost:8080/user/deleteOrder/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
        loadOrders();
    };
    return (
        <>
        <Header/>
        <div>
            <table className="table-container" rules='rows'>
                    <thead className="table-head">
                        <tr>
                            <th scope="col" className="rowstyle">Gift Name</th>
                            <th scope="col" className="rowstyle">Price</th>
                            <th scope="col" className="rowstyle">Quanity</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((ord, index) => (
                                <tr class="align-middle">
                                    <td className="rowstyle">{ord.gift.giftName}</td>
                                    <td className="rowstyle">{ord.orderPrice}</td> 
                                    <td className="rowstyle">{ord.quantity}</td>
                                    <td>
                                        <Link className="btn btn-outline-primary" to={`/user/editOrder/${ord.orderId}`}><AiFillEdit /></Link>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger" onClick={ () => deleteOrder(ord.orderId)}><AiFillDelete /></button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
        </div>
        </>
    );
}
export default Myorder;