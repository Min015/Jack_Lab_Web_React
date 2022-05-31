import React, { Component } from 'react';
import AdminHeader from '../../Header/back_end/AdminHeader';
import Sidebar from '../../Sidebar/Sidebar';
import './backlayout.scss';

export default class BackLayout extends Component {
    render() {
        const { children } = this.props;
        return (
            <div>
                <AdminHeader />
                <div className="content">
                    <Sidebar />
                    <div className="content_in">
                        <div className="in">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}