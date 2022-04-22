import { Component } from 'react';
import GuestHeader from '../../../Components/Header/GuestHeader';
import Carousel from './Carousel';
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
                    {/* <Carousel/> */}
                    <div className="contentin">
                        B
                    </div>
                </div>
            </div>
        )
    }
}