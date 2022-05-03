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
                l_id: "l01",
                l_title: "Web_Lab",
                l_content: "這是內容",
            },
        ]
    }

    render() {
        const { table_header, object } = this.state;
        return (
            <div>
                <AdminHeader />
                <div className="content">
                    <Sidebar />
                    <div className="content_in">
                        <div className="in">
                            <div className="work">
                                <div className="edit_button">
                                    <div className="work_btn add_btn">
                                        <p>新增介紹</p>
                                    </div>
                                    <div className="work_btn delete_btn">
                                        <p>批量刪除</p>
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