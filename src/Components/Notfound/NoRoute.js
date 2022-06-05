import React, { Component } from "react";
import { Link } from "react-router-dom";
import GuestLayout from '../Layout/front/guest/GuestLayout';
import './NoRoute.scss';
export default class NoRoute extends Component {
    render() {
        return (
            <GuestLayout>
                <div id="NoRoute">
                    <div className="center">
                        <h1>404</h1>
                        <div>
                            您所尋找的路徑不存在<Link to='/index'>回主頁</Link>
                        </div>
                    </div>
                </div>
            </GuestLayout>
        );
    }
}
