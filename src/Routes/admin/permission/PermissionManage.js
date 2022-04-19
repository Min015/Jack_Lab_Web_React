import { Component } from 'react';
import AdminHeader from '../../../Components/Header/AdminHeader';
import Sidebar from '../../../Components/Sidebar/Sidebar';
import '../style/mainstyle.scss';
import search from '../style/img/searchButton.png';
import CreateTable from './CreateTable';
export default class PermissionManage extends Component {
    state = {
        table_header: [
            "書名",
            "作者",
            "出版社",
            "出版時間",
        ],
        object: [
            {
                b_id: "a",
                b_title: "秒懂行動網頁設計Visual Studio Code+GitHub+Bootstrap5+CSS3+HTML5+Web App專案實作",
                b_author:"姜琇森 朱珮儀 章家源 董子瑜 蕭國倫 陳璟誼",
                b_publisher:"碁峰",
                b_time:"2021-12-15",
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
                            
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}