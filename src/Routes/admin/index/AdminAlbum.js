import { Component } from 'react';
import AdminHeader from '../../../Components/Header/AdminHeader';
import Sidebar from '../../../Components/Sidebar/Sidebar';
export default class AddGame extends Component {
    state = {

    }
    //生命週期

    //func

    render() {

        return (
            <div>
                <AdminHeader />
                <div class="content">
                    <Sidebar />
                    <div class="content_in">
                        <h1>test</h1>
                    </div>
                </div>
            </div>

        )
    }
}