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
                                    <div className="add">
                                        <a href="#">
                                            <p>刪除類型</p>
                                        </a>
                                    </div>
                                    <div className="add">
                                        <a href="#">
                                            <p>新增類型</p>
                                        </a>
                                    </div>
                                </div>
                                <form action="" className="searchbar">
                                    <input type="text" required placeholder="輸入搜尋值" />
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