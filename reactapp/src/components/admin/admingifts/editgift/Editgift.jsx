import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../../../header/Header'
import './editgift.css'

const API_URL = "http://localhost:8080";

export const Editgift = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [quantity, setQuantity] = useState("");
  const [details, setDetails] = useState("");


  useEffect(() => {
    axios({
      method: 'get',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + JSON.parse(localStorage.getItem('auth')).jwtToken
      },
      url: `${API_URL}/admin/getGift/${id}`,
    })
      .then((res) => {
        let data = res.data
        setName(data.name)
        setPrice(data.price)
        setImageUrl(data.url)
        setQuantity(data.quantity)
        setDetails(data.details)
      })
  }, [id])

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


  const updateHandler = async (e) => {
    e.preventDefault()
    const giftData = {
      name: name,
      price: price,
      url: imageUrl,
      quantity: quantity,
      details: details,
    };
    await axios({
      method: 'put',
      headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + JSON.parse(localStorage.getItem('auth')).jwtToken
      },
      url: `${API_URL}/admin/editGift/${id}`,
      data: giftData
  })
    .then(() => {
      navigate('/admin/gift')
    })
  }

  const cancelHandler = (e) => {
    e.preventDefault()
    navigate('/admin/gift')
  }

  return (

    <div className='editPage_body'>
      <Header />
      <div className='editGiftBody'>
        <div className='editGift'>
          <h1 className='h1'>Edit Gift</h1>
          <form>
            <input type='text' value={name} onChange={nameChangeHandler} placeholder='enter the gift name' ></input>
            <input type='number' value={price} onChange={priceChangeHandler} placeholder='enter the gift price' ></input>
            <input type='url' value={imageUrl} onChange={imageUrlChangeHandler} placeholder='enter the gift image url' ></input>
            <input type='number' value={quantity} onChange={quantityChangeHandler} placeholder='enter the product quantity' ></input>
            <input type='text' value={details} onChange={detailsChangeHandler} placeholder='enter the gift details' ></input><br />
            <button type='submit' onClick={updateHandler}>Update</button>
            <button onClick={cancelHandler}>Cancel</button>
          </form>
        </div>
      </div>
    </div>
  )
}
