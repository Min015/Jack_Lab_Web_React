import { Component } from 'react';
import AdminHeader from '../../../Components/Header/back_end/AdminHeader';
import Sidebar from '../../../Components/Sidebar/Sidebar';
import '../style/mainstyle.scss';
import CreateTable from './CreateTable';
export default class Member extends Component {
    state = {
        table_header: [
            "學生編號",
            "帳號",
            "姓名",
            "班級",
            "角色",
            "帳號創建日期",
        ],
        object: [
            {
                s_id: "s01",
                account: "aaaa1aaaa1aaaa1aaaa1aaaa1aaa30",
                m_name: "陳旻愉",
                m_class: "資應四甲",
                m_role: "財務",
                m_createTime: "2022-02-02",
                m_password: "",
            },
            {
                s_id: "s02",
                account: "",
                m_name: "張博叡",
                m_class: "資應五甲",
                m_role: "專題生",
                m_createTime: "2022-02-02",
                m_password: "",
            },
            {
                s_id: "s03",
                account: "",
                m_name: "陳俊林",
                m_class: "資應四A",
                m_role: "專題生",
                m_createTime: "2022-02-02",
                m_password: "",
            },
            {
                s_id: "s04",
                account: "",
                m_name: "林秉宏",
                m_class: "資應三A",
                m_role: "專題生",
                m_createTime: "2022-02-02",
                m_password: "",
            },
            {
                s_id: "s05",
                account: "",
                m_name: "邱冠翔",
                m_class: "資管所研一",
                m_role: "碩士生",
                m_createTime: "2022-02-02",
                m_password: "",
            },
        ],
        s_class: ["資管所研二", "資管所研一", "資應四A", "資應三A", "資應五甲", "資應四甲", "資管四A", "資管三A", "資管五甲", "資管四甲", "資管四1", "資管三1"],
        role: ["碩士生", "專題生", "財務"],
        academic_sys: ["研究所", "四技", "二技", "五專",],
        checked: false,
    }
    //生命週期

    render() {
        const { object, table_header, s_class, role, academic_sys, checked } = this.state;
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
                                        <p>新增成員</p>
                                    </div>
                                    <div className="work_btn delete_btn">
                                        <p>批量刪除</p>
                                    </div>
                                </div>
                                <form className="searchform">
                                    <select name="" defaultValue={academic_sys[0]}>
                                        {academic_sys.map(item =>
                                            <option value={item}>{item}</option>
                                        )}
                                    </select>
                                    <input type="text" placeholder="搜尋" />
                                    <input type="submit" value="送出" className="searchBtn" />
                                </form>
                            </div>
                            <CreateTable table_header={table_header} table_content={object} s_class={s_class} role={role} checked={checked} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}