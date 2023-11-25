import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../../header/Header";
import "./addgift.css";
import { GiftTable } from "./GiftTable";

const API_URL = "http://localhost:8080";

export const Addgift = () => {
  const [isValid, setIsValid] = useState(true)
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [quantity, setQuantity] = useState("");
  const [details, setDetails] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    loadAllGifts();
  }, []);

  const loadAllGifts = () => {
    axios({
      method: 'get',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + JSON.parse(localStorage.getItem('auth')).jwtToken
      },
      url: `${API_URL}/admin/getAllGifts`,
    }).then((value) => {
      setData(value.data);
    });
  }

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };
  const priceChangeHandler = (e) => {
    setPrice(e.target.value);
  };
  const imageUrlChangeHandler = (e) => {
    setImageUrl(e.target.value);
  };
  const quantityChangeHandler = (e) => {
    setQuantity(e.target.value);
  };
  const detailsChangeHandler = (e) => {
    setDetails(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (name.trim().length !== 0 && price.trim().length !== 0 && imageUrl.trim().length !== 0 &&
      quantity.trim().length !== 0 && details.trim().length !== 0) {
      const giftData = {
        name: name,
        price: price,
        url: imageUrl,
        quantity: quantity,
        details: details,
      };
      axios({
        method: 'post',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + JSON.parse(localStorage.getItem('auth')).jwtToken,
        },
        url: `${API_URL}/admin/addGift`,
        data: giftData
      }).then(()=>{
        loadAllGifts();
      })
      setIsValid(true)
      setName("");
      setPrice("");
      setImageUrl("");
      setQuantity("");
      setDetails("");
      return
    }
    setIsValid(false)
  };

  return (
    <div className="main_body">
      <Header />
      <div className="gift_body">
        <GiftTable giftDetails={data} />
        <div className="addGift">
          <h1>Add Gift</h1>
          <form>
            <div className={`form_controller ${!isValid ? 'invalid' : ''}`}>
              <input type="text" value={name} onChange={nameChangeHandler} placeholder="enter the gift name"></input>
              <input type="number" value={price} onChange={priceChangeHandler} placeholder="enter the gift price"></input>
              <input type="url" value={imageUrl} onChange={imageUrlChangeHandler} placeholder="enter the gift image url" ></input>
              <input type="number" value={quantity} onChange={quantityChangeHandler} placeholder="enter the product quantity"></input>
              <input type="text" value={details} onChange={detailsChangeHandler} placeholder="enter the gift details" ></input>
            </div>
            <button type="submit" onClick={submitHandler}> ADD </button>
          </form>
        </div>
      </div>
    </div>
  );
};
