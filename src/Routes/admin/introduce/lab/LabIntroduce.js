import { Component } from 'react';
import AdminHeader from '../../../../Components/Header/AdminHeader';
import Sidebar from '../../../../Components/Sidebar/Sidebar';
import '../../style/mainstyle.scss';
import CreateTable from './CreateTable';
export default class LabIntroduce extends Component {
    state = {
        table_header: [
            "標題",
            "內容",
        ],
        object: [
            {
                l_id:"l01",
                l_title:"Web_Lab",
                l_content: "這是內容",
            },
        ]
    }
    
    render() {
        const{table_header,object}=this.state;
        return (
            <div>
                <AdminHeader />
                <div className="content">
                    <Sidebar />
                    <div className="content_in">
                        <div className="in">
                        <div className="work">
                                <div className="edit_button">
                                    <div className="add">
                                        <a href="#">
                                            <p>刪除簡介</p>
                                        </a>
                                    </div>
                                    <div className="add">
                                        <a href="#">
                                            <p>新增簡介</p>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <CreateTable table_header={table_header} table_content={object} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}