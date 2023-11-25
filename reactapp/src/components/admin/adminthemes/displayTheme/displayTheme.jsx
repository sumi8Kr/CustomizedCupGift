import React, { Component } from 'react';
import './displayTheme.css';
/* import 'bootstrap/dist/css/bootstrap.css'; */
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { api_url } from '../../../../helper/Api_url';
import axios from 'axios';
import Modal from 'react-modal';
class DisplayThemes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            themeCards: [],
            modalIsOpen: false,
            themeName: "",
            themePrice: "",
            themeDetails: "",
            id: ""
        }
    }

    componentDidMount() {
        axios({
            method: 'get',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + JSON.parse(localStorage.getItem('auth')).jwtToken
            },
            url: `${api_url}/admin/getTheme`,
        })
            .then((response) => {
                console.log(response.data);
                this.setState({ ...this.state, themeCards: response.data })
            })
            .catch((err) => {
                console.log(err);
            })

    }

    deleteTheme = (id) => {
        axios({
            method: 'delete',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + JSON.parse(localStorage.getItem('auth')).jwtToken
            },
            url: `${api_url}/admin/deleteTheme/${id}`,
        })
            .then((response) => {
                console.log(response.data);
                window.location.reload(true);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    openModal = ({ themePrice, themeName, themeDetails, id }) => {
        this.setState({
            ...this.state,
            modalIsOpen: true,
            themeName,
            themePrice,
            themeDetails,
            id
        })
    }

    closeModal = () => {
        this.setState({
            ...this.state,
            modalIsOpen: false,
            themeName: "",
            themePrice: "",
            themeDetails: "",
            id: ""
        })
    }
    onChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
    }
    submitEditTheme = (event) => {
        event.preventDefault();
        const editThemeData = {
            themeName: this.state.themeName,
            themePrice: this.state.themePrice,
            themeDetails: this.state.themeDetails
        }
        axios({
            method: 'put',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + JSON.parse(localStorage.getItem('auth')).jwtToken
            },
            url: `${api_url}/admin/editTheme/${this.state.id}`,
            data: editThemeData
        })
            .then((response) => {
                console.log(response.data);
                window.location.reload(true);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        const customStyles = {
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
            },
        };
        return (
            <>
                <div className="d-flex p-2">
                    <div className="input-group">
                        <input type="text" className="form-control border-0 shadow fs-6 p-2 rounded-0" placeholder="Type here to search theme"></input>
                    </div>
                    <button type="button" className="btn ms-3 text-white rounded-0 shadow" style={{ background: "#4C80E5" }}>Search</button>
                </div>
                <div className="theme-card-container p-2 my-3">
                    {
                        this.state.themeCards.map((card) =>
                            <div key={card.id} className="card shadow border-0 themeCard mt-3">
                                <div className="card-body p-0 d-flex">
                                    <div className="py-3 ps-3" style={{ width: "95%" }}>
                                        <p className="mb-1">Name: {card.themeName}</p>
                                        <p className="mb-1">Price: {card.themePrice}</p>
                                        <p className="mb-1">Description: {card.themeDetails}</p>
                                    </div>
                                    <div style={{ width: "5%" }}>
                                        <div className="h-50 d-flex justify-content-center align-items-center" style={{ background: "#4C80E5", borderTopRightRadius: "5px", cursor: "pointer" }}>
                                            <BiEdit className="text-white" size={18} onClick={() => this.openModal(card)} />
                                        </div>
                                        <div className="h-50 d-flex justify-content-center align-items-center" onClick={() => this.deleteTheme(card.id)} style={{ background: "#E03E1F", borderBottomRightRadius: "5px", cursor: "pointer" }}>
                                            <RiDeleteBin5Line className="text-white" size={18} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className="card-body text-center p-5">
                        <h3 className="mb-3">Edit Theme</h3>
                        <form onSubmit={this.submitEditTheme}>
                            <div className="mb-3">
                                <input type="text" onChange={(event) => this.onChange(event)} value={this.state.themeName} name="themeName" className="form-control rounded-0" placeholder="Enter name"></input>
                            </div>
                            <div className="mb-3">
                                <input type="number" onChange={(event) => this.onChange(event)} value={this.state.themePrice} name="themePrice" className="form-control rounded-0" placeholder="Enter price"></input>
                            </div>
                            <div className="mb-4">
                                <textarea type="text" onChange={(event) => this.onChange(event)} value={this.state.themeDetails} name="themeDetails" className="form-control rounded-0" placeholder="Enter desciption"></textarea>
                            </div>
                            <div className="d-flex">
                                <button type="submit" className="btn btn-primary rounded-0 w-100 me-2">Submit</button>
                                <button type="button" onClick={this.closeModal} className="btn btn-primary rounded-0 w-100 ms-2">Cancel</button>
                            </div>
                        </form>
                    </div>
                </Modal>
            </>
        );
    }
}

export default DisplayThemes;