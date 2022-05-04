import { Component } from 'react';
import AdminHeader from '../../../../Components/Header/back_end/AdminHeader';
import Sidebar from '../../../../Components/Sidebar/Sidebar';
import '../../style/mainstyle.scss';
import search from '../../style/img/searchButton.png';
import CreateTable from './CreateTable';
export default class Books extends Component {
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
                b_author: "姜琇森 朱珮儀 章家源 董子瑜 蕭國倫 陳璟誼",
                b_publisher: "碁峰",
                b_time: "2021-12-15",
            },
            {
                b_id: "b",
                b_title: "一次就懂 ASP.NET MVC 5.x 網站開發：Web應用的經典實務範例解析(Visual C# )",
                b_author: "吳玟憲 姜琇森 楊鎧睿 蕭國倫 黃子銘 黃煒凱",
                b_publisher: "深智數位",
                b_time: "2019-11-19",
            },
            {
                b_id: "c",
                b_title: "原來跨平台開發可以這麼簡單：React Native全攻略(附範例光碟)",
                b_author: "姜琇森, 蕭國倫, 許瑋芩, 黃子銘, 楊鎧睿, 黃煒凱, 周冠瑜",
                b_publisher: "全華圖書",
                b_time: "2020-07-01",
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
                                        <p>新增書籍</p>
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