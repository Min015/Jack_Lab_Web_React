import { Component } from 'react';
import Header from '../../../Header/front_end/Header';
import './memberlayout.scss';

export default class MemberLayout extends Component {
    render() {
        const { children } = this.props;
        return (
            <div>
                <Header />
                <div className="content">
                    <div className="contentin">
                        {children}
                    </div>
                </div>
            </div>
        )
    }
}