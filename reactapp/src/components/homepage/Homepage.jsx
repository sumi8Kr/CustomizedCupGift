import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../header/Header'
import './homepage.css';
import { api_url } from '../../helper/Api_url';
function Homepage() {
    const token = "Bearer " + JSON.parse(localStorage.getItem('auth')).jwtToken;
    const [gifts, setGifts] = useState([]);

    useEffect(() => {
        loadAllGifts();
    }, []);
    const loadAllGifts = async () => {
        let result = await fetch(`${api_url}/user/getAllgifts`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
        setGifts(await result.json());
    }
    return (
        <>
            <Header />
            <section>
                <div className="main-container">
                    <ul className="grid-wrapper">
                        {
                            gifts.map(gift => (
                                <li>
                                    <Link className='gift-link' to={`/user/selectGift/${gift.id}`}>
                                        <div className='img-div'>
                                            <img className='gift-img' alt={gift.name} src={gift.url} />
                                        </div>
                                        <div className='gift-dsc'>
                                            <p className='dsc ps'>{gift.name}</p>
                                            <p className='dsc pe'><i className="fa fa-inr" aria-hidden="true"></i>{gift.price}</p>
                                        </div>
                                    </Link>
                                </li>
                            ))
                        }

                    </ul>
                </div>
            </section>


        </>
    )
}
export default Homepage;
