import { Component } from 'react';
import AdminHeader from '../../../Components/Header/AdminHeader';
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

    //func
    // handleAllChange=()=>{

    //     if(this.state.checked===false){
    //         this.setState({
    //             checked:true,
    //         })
    //         console.log('now is True');
    //     }
    //     else{
    //         this.setState({
    //             checked:false,
    //         })
    //         console.log('now is False');
    //     }
    // }
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
                                    {/* <div className="add">
                                        <a onClick={this.handleAllChange}>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M0 2C0 1.46957 0.210714 0.960859 0.585786 0.585786C0.960859 0.210714 1.46957 0 2 0H12C12.5304 0 13.0391 0.210714 13.4142 0.585786C13.7893 0.960859 14 1.46957 14 2V12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14H2C1.46957 14 0.960859 13.7893 0.585786 13.4142C0.210714 13.0391 0 12.5304 0 12V2ZM10.33 4.624C10.2806 4.58069 10.2231 4.54755 10.1609 4.52647C10.0986 4.50539 10.0328 4.49678 9.96726 4.50115C9.90169 4.50551 9.83762 4.52276 9.77872 4.55191C9.71982 4.58105 9.66725 4.62152 9.624 4.671L6.476 8.268L4.854 6.646C4.80751 6.59951 4.75232 6.56264 4.69158 6.53748C4.63084 6.51232 4.56574 6.49937 4.5 6.49937C4.43426 6.49937 4.36916 6.51232 4.30842 6.53748C4.24768 6.56264 4.19249 6.59951 4.146 6.646C4.09951 6.69249 4.06264 6.74768 4.03748 6.80842C4.01232 6.86916 3.99937 6.93426 3.99937 7C3.99937 7.06574 4.01232 7.13084 4.03748 7.19158C4.06264 7.25232 4.09951 7.30751 4.146 7.354L6.146 9.354C6.19446 9.40239 6.25234 9.44032 6.31606 9.46542C6.37978 9.49051 6.44798 9.50226 6.51643 9.49991C6.58487 9.49757 6.6521 9.48119 6.71396 9.45179C6.77581 9.42239 6.83097 9.3806 6.876 9.329L10.376 5.329C10.4632 5.22924 10.5072 5.09896 10.4984 4.96678C10.4895 4.83459 10.4286 4.71131 10.329 4.624H10.33ZM2.267 15C2.44262 15.3042 2.69524 15.5567 2.99946 15.7323C3.30368 15.9078 3.64877 16.0002 4 16H12C13.0609 16 14.0783 15.5786 14.8284 14.8284C15.5786 14.0783 16 13.0609 16 12V4C16 3.64894 15.9076 3.30406 15.732 3.00003C15.5565 2.696 15.304 2.44353 15 2.268V12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15H2.268H2.267Z"
                                                    fill="white" />
                                            </svg>
                                            <p>選擇全部</p>
                                        </a>
                                    </div> */}
                                    <div className="add">
                                        <a href="#">
                                            <p>刪除成員</p>
                                        </a>
                                    </div>
                                    <div className="add">
                                        <a href="#">
                                            <p>新增成員</p>
                                        </a>
                                    </div>
                                </div>
                                <form className="searchform">
                                    <select name="" defaultValue={academic_sys[0]}>
                                        {academic_sys.map(item =>
                                            <option value={item}>{item}</option>
                                        )}
                                    </select>
                                    <input type="text" placeholder="輸入搜尋值" />
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