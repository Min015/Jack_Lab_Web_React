import { Component } from 'react';
import AdminHeader from '../../../Components/Header/AdminHeader';
import Sidebar from '../../../Components/Sidebar/Sidebar';
import '../style/mainstyle.scss';
import search from '../style/img/searchButton.png';
import CreateTable from './CreateTable';
export default class TagManage extends Component {
    state = {
        table_header: [
            "標籤名稱",
        ],
        object: [
            {
                tag_id: "a",
                tag_title: "強化學習",
            },
            {
                tag_id: "b",
                tag_title: "自適應",
            },
            {
                tag_id: "c",
                tag_title: "聊天機器人",
            },
            {
                tag_id: "d",
                tag_title: "AI",
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
                                            <p>刪除標籤</p>
                                        </a>
                                    </div>
                                    <div className="add">
                                        <a href="#">
                                            <p>新增標籤</p>
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