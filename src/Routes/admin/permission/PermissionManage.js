import { Component } from 'react';
import AdminHeader from '../../../Components/Header/back_end/AdminHeader';
import Sidebar from '../../../Components/Sidebar/Sidebar';
import '../style/mainstyle.scss';
import search from '../style/img/searchButton.png';
import CreateTable from './CreateTable';
export default class PermissionManage extends Component {
    state = {
        table_header: [
            "角色名稱",
        ],
        object: [
            {
                role_id: "a",
                role_title: "管理者",
            },
            {
                role_id: "b",
                role_title: "研究生",
            },
            {
                role_id: "c",
                role_title: "專題生",
            },
            {
                role_id: "c",
                role_title: "訪客",
            },
        ]
    }
    //生命週期

    //func

    render() {
        const { object, table_header } = this.state;
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
                                        <p>新增角色</p>
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