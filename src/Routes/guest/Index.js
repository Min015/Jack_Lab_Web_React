import { Component } from 'react';
import '../../Components/Header/header1.scss';
import Header from '../../Components/Header/Header';
import GuestHeader from '../../Components/Header/GuestHeader';

export default class Index extends Component {
    state = {
        
    }

    //生命週期

    //func

    render() {
        return (
            <div>
                <GuestHeader/>
                <div className="content">
                    <div className="contentin">
                        
                    </div>
                </div>
            </div>
        )
    }
}