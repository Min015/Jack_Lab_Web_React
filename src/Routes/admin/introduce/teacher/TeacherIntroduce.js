import { Component } from 'react';
import AdminHeader from '../../../../Components/Header/AdminHeader';
import Sidebar from '../../../../Components/Sidebar/Sidebar';
import './teacher.scss';
import search from '../../style/img/searchButton.png';
import CreateTable from './CreateTable';
export default class TeacherIntroduce extends Component {
    state = {
        table_header: [
            "頭像",
            "姓名",
            "職稱",
            "介紹",
        ],
        object: [
            {
                t_id:"t01",
                teacher_name: "姜琇森",
                teacher_position: "教授",
                teacher_photo: "",
                teacher_introduce: "",
            },
        ]
}
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
                                            <p>刪除教師</p>
                                        </a>
                                    </div>
                                    <div className="add">
                                        <a href="#">
                                            <p>新增教師</p>
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