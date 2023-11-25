import React, { Component } from 'react';
/* import 'bootstrap/dist/css/bootstrap.css'; */
import { api_url } from '../../../../helper/Api_url';
import axios from 'axios';
class AddThemes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            themeName: "",
            themePrice: "",
            themeDetails: "",

        }
        this.submitTheme = this.submitTheme.bind(this);
    }
    onChangeThemeData = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
    }
    submitTheme = (e) => {
        e.preventDefault();
        let addThemeData = {
            themeName: this.state.themeName,
            themePrice: this.state.themePrice,
            themeDetails: this.state.themeDetails
        }
        axios({
            method: 'post',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization' : "Bearer " + JSON.parse(localStorage.getItem('auth')).jwtToken,
            },
            url: `${api_url}/admin/addTheme`,
            data: addThemeData
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

        return (
            <>
                <div className="px-4 pt-2">
                    <div className="card rounded-0 shadow border-0">
                        <div className="card-body text-center p-5">
                            <h3 className="mb-3">Add Theme</h3>
                            <form onSubmit={this.submitTheme}>
                                <div className="mb-3">
                                    <input type="text" onChange={(event) => this.onChangeThemeData(event)} value={this.state.themeName} name="themeName" className="form-control rounded-0" placeholder="Enter name"></input>
                                </div>
                                <div className="mb-3">
                                    <input type="number" onChange={(event) => this.onChangeThemeData(event)} value={this.state.themePrice} name="themePrice" className="form-control rounded-0" placeholder="Enter price"></input>
                                </div>
                                <div className="mb-4">
                                    <textarea type="text" onChange={(event) => this.onChangeThemeData(event)} value={this.state.themeDetails} name="themeDetails" className="form-control rounded-0" placeholder="Enter desciption"></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary rounded-0 w-100">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>

            </>
        );
    }
}

export default AddThemes;