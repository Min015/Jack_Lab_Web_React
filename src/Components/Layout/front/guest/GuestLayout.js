import { Component } from 'react';
import GuestHeader from '../../../Header/front_end/GuestHeader';

export default class GuestLayout extends Component {
    render() {
        const { children } = this.props;
        return (
            <div>
                <GuestHeader />
                <div className="content">
                    {children}
                </div>
            </div>
        )
    }
}