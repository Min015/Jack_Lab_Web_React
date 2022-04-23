import { Component } from 'react';
import AdminHeader from '../../../../Components/Header/AdminHeader';
import Sidebar from '../../../../Components/Sidebar/Sidebar';
import '../../style/mainstyle.scss';
import CreateTable from './CreateTable';
export default class GameManage extends Component {
    state = {
        table_header: [
            "競賽類型",
            "參加組別",
            "項目名稱",
            "得獎名次",
            "年分",
        ],
        object: [
            {
                gM_type: "資訊應用服務創新大賽",
                gM_group: "Azure雲端創新產業應用組",
                gM_name: "手影隨行",
                gM_position: "最佳創意",
                gM_year: 2021,
            },
            {
                gM_type: "資訊應用服務創新大賽",
                gM_group: "教育資料開放組",
                gM_name: "讀癮",
                gM_position: "佳作",
                gM_year: 2021,
            },
        ],
        gM_type:["資訊應用服務創新大賽","黑客松"],
        gM_Y:["2021","2020","2019","2018"],
    }
    //生命週期

    //func

    render() {
        const { object, table_header,gM_type,gM_Y } = this.state;
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
                                            <p>刪除記錄</p>
                                        </a>
                                    </div>
                                    <div className="add">
                                        <a href="#">
                                            <p>新增記錄</p>
                                        </a>
                                    </div>
                                </div>
                                <form className="searchform">
                                    <select name="" defaultValue={gM_type[0]}>
                                        {gM_type.map(item =>
                                            <option value={item}>{item}</option>
                                        )}
                                    </select>
                                    <select name="" defaultValue={gM_Y[0]}>
                                        {gM_Y.map(item =>
                                            <option value={item}>{item}</option>
                                        )}
                                    </select>
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