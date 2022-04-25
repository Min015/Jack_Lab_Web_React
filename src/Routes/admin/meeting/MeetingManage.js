import { Component } from 'react';
import AdminHeader from '../../../Components/Header/AdminHeader';
import Sidebar from '../../../Components/Sidebar/Sidebar';
import '../style/mainstyle.scss';
import CreateTable from './CreateTable';
export default class MeetingManage extends Component {
    state = {
        table_header: [
            "會議主題",
            "會議日期",
            "會議地點",
            "記錄者",
        ],
        object: [
            {
                mM_id: "a",
                mM_title: "小專畫面",
                mM_date: "2022-03-29",
                mM_place: "2605",
                mM_recorder: "陳旻愉",
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
                                            <p>刪除會議</p>
                                        </a>
                                    </div>
                                    <div className="add">
                                        <a href="#">
                                            <p>新增會議</p>
                                        </a>
                                    </div>
                                </div>
                                <form className="searchform">
                                    <div className='date'>
                                        <input type="date" />~
                                        <input type="date" />
                                    </div>
                                    <input type="text" placeholder="輸入搜尋值" />
                                    <input type="submit" value="送出" className="searchBtn" />
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