import { Component } from 'react';
import AdminHeader from '../../../../Components/Header/AdminHeader';
import Sidebar from '../../../../Components/Sidebar/Sidebar';
import '../../style/mainstyle.scss';
import search from '../../style/img/searchButton.png';
import CreateTable from './CreateTable';
export default class GTypeManage extends Component {
    state = {
        table_header: [
            "類型名稱",
        ],
        object: [
            {
                gty_id: "a",
                gty_title: "資訊應用服務創新大賽",
            },
            {
                gty_id: "b",
                gty_title: "黑克松",
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
                                        <p>新增類型</p>
                                    </div>
                                    <div className="work_btn delete_btn">
                                        <p>批量刪除</p>
                                    </div>
                                </div>
                                <form action="" className="searchbar">
                                    <input type="text" required placeholder="搜尋" />
                                    <div className="submit">
                                        <input type="image" src={search} alt="送出" />
                                    </div>
                                </form>
                            </div>
                            <CreateTable table_header={table_header} table_content={object} />
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}