import { Component } from 'react';
import AdminHeader from '../../../../Components/Header/AdminHeader';
import Sidebar from '../../../../Components/Sidebar/Sidebar';
import '../../style/mainstyle.scss';
import search from '../../style/img/searchButton.png';
import CreateTable from './CreateTable';
export default class CaseManage extends Component {
    state = {
        table_header: [
            "專案類型",
            "專案分類",
            "專案名",
            "負責組別",
            "相關標籤",
            "建立時間",
        ],
        object: [
            {
                cM_id:"c01",
                cM_type: "大專生國科會計畫",
                cM_class: "五專部",
                cM_title: "運用強化學習與自適應機制建構智慧互動聊天機器人",
                cM_principal: "五專一",
                cM_createTime: "2022-01-25",
                cM_tag: ""
            },
        ],
        cM_T:["大專生國科會計畫", "大專", "小專"],
        cM_C:["五專部","二技部","四技部","研究所"],
        cM_Y:["2021","2020","2019","2018"],
        cM_Tag:["強化學習","自適應","聊天機器人","AI"],
    }
    //生命週期

    //func

    render() {
        const { object, table_header,cM_T,cM_C,cM_Y,cM_Tag } = this.state;
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
                                            <p>刪除專案</p>
                                        </a>
                                    </div>
                                    <div className="add">
                                        <a href="#">
                                            <p>新增專案</p>
                                        </a>
                                    </div>
                                </div>
                                <form className="searchform">
                                    <select name="" defaultValue={cM_T[0]}>
                                        {cM_T.map(item =>
                                            <option value={item}>{item}</option>
                                        )}
                                    </select>
                                    <select name="" defaultValue={cM_C[0]}>
                                        {cM_C.map(item =>
                                            <option value={item}>{item}</option>
                                        )}
                                    </select>
                                    <select name="" defaultValue={cM_Tag[0]}>
                                        {cM_Tag.map(item =>
                                            <option value={item}>{item}</option>
                                        )}
                                    </select>
                                    <select name="" defaultValue={cM_Y[0]}>
                                        {cM_Y.map(item =>
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