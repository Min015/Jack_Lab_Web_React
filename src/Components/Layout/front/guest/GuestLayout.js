import { Component } from 'react';
import GuestHeader from '../../../Header/front_end/GuestHeader';
import './guestlayout.scss';
export default class GuestLayout extends Component {
    render() {
        const { children } = this.props;
        return (
            <div id="guest">
                <GuestHeader />
                <div className="content">
                    {children}
                </div>
            </div>
        )
    }
}