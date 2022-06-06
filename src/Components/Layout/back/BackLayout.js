import React, { Component } from 'react';
import AdminHeader from '../../Header/back_end/AdminHeader';
import Sidebar from '../../Sidebar/Sidebar';
import './backlayout.scss';
export default class BackLayout extends Component {
    state = {
        sidebarclick: false,
    }

    handleOnClickSidebar = () => {
        this.setState({
            sidebarclick: !this.state.sidebarclick
        })
    }
    render() {
        const { children } = this.props;
        const { sidebarclick } = this.state;
        return (
            <div>
                <AdminHeader
                    onClick={() => this.handleOnClickSidebar(this)}
                />
                <div className="content">
                    <Sidebar sidebarclick={sidebarclick} />
                    <div className={sidebarclick === true ? "content_in_hide content_in" : "content_in"}>
                        <div className="in">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}