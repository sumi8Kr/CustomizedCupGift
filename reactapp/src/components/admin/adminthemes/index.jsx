import React, { Component } from 'react';
import './index.css';
import AddThemes from './addtheme/addTheme';
import DisplayThemes from './displayTheme/displayTheme';
import Header from '../../header/Header';
class Themes extends Component {
    render() {
        return (
            <>
            <Header />
            <div className="container-fluid mt-5">
                <div className="row">
                 <div className="col-8">
                    <DisplayThemes/>
                 </div>
                 <div className="col-4">
                    <AddThemes/>
                </div>
                </div>
            </div>
            </>
        );
    }
}

export default Themes;