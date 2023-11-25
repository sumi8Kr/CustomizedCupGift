import './GiftTable.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_URL = "http://localhost:8080";
export const GiftTable = (props) => {

  const navigate = useNavigate()
  const deleteGift = (id) => {
    axios({
      method: 'delete',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + JSON.parse(localStorage.getItem('auth')).jwtToken
      },
      url: `${API_URL}/admin/deleteGift/${id}`,
    })
      .then(() => {
        window.location.reload(true);
      })
      .catch((err) => {
        console.log(err);
      })
  }
  return (
    <div className="dispGifts">
      <table className="dispGifts_table">
        <thead className="table_heading">
          <tr className='table_heading_row'>
            <th scope="col" style={{ width: "20%" }}>Image</th>
            <th scope="col" style={{ width: "30%" }}>Gift Name</th>
            <th scope="col" style={{ width: "15%" }}>Price</th>
            <th scope="col" style={{ width: "15%" }}>Quality</th>
            <th scope="col" style={{ width: "20%" }}>Action</th>
          </tr>
        </thead>

        <tbody className='table_body'>
          {
            props.giftDetails.map((data, idx) => (
              <tr key={idx} className='table_body_row'>
                <td><img src={data.url} width="64" height="64" alt=''></img></td>
                <td>{data.name}</td>
                <td>&#8377;{data.price}</td>
                <td>{data.quantity}ps</td>
                <td>
                  <i className="fa fa-pencil-square-o" aria-hidden="true" style={{ fontSize: "32px", color: "blue", padding: "0.25rem" }} onClick={() => navigate('/admin/editGift/' + data.id)} ></i>
                  <i className="fa fa-trash" style={{ fontSize: "32px", color: "red", padding: "0.25rem" }} onClick={() => deleteGift(data.id)}></i>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
