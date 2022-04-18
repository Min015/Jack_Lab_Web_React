import { Component } from 'react';
import AdminHeader from '../../../../Components/Header/AdminHeader';
import Sidebar from '../../../../Components/Sidebar/Sidebar';
import '../../style/mainstyle.scss';
export default class LabIntroduce extends Component {
    state = {
        
    }
    
    render() {
        return (
            <div>
                <AdminHeader />
                <div className="content">
                    <Sidebar />
                    <div className="content_in">
                        <div className="in">
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}