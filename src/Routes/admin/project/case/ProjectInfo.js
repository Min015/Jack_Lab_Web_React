import { Component } from 'react';
import { Link } from 'react-router-dom';
import AdminHeader from '../../../../Components/Header/front_end/Header';
import Sidebar from '../../../../Components/Sidebar/Sidebar';
import ProjectInfoTable from './ProjectInfoTable';
import '../../style/info.scss';
export default class ProjectInfo extends Component {
    state = {
        object: {
            proj_id: "p01",
            proj_name: "運用強化學習與自適應機制建構智慧互動聊天機器人",//
            proj_description: "寒假結果",//
            proj_createTime: "2022-01-25T19:30",//
            proj_type: "大專生國科會計畫",//
            proj_partition: "五專部",//
            proj_group: "五專一",//
            proj_creater: "陳旻愉",//
            proj_record: [
                {
                    proj_record_id: "pr01",
                    proj_record_remark: "備註",
                    proj_record_uploader: "某個人",
                    proj_record_createTime: "2022-03-28T19:30",
                    proj_record_file: {
                        proj_file_name: "運用強化學習與自適應機制建構智慧互動聊天機器人1",
                        proj_file_url: "",
                        proj_file_id: "",
                    },
                },
                {
                    proj_record_id: "pr02",
                    proj_record_remark: "備註2",
                    proj_record_uploader: "某個人2",
                    proj_record_createTime: "2022-03-29T19:30",
                    proj_record_file: {
                        proj_file_name: "運用強化學習與自適應機制建構智慧互動聊天機器人2",
                        proj_file_url: "",
                        proj_file_id: "",
                    },
                },
            ],
        },
        proj_type: ["大專生國科會計畫", "大專", "小專"],
        proj_class: ["五專部", "二技部", "四技部", "碩班"],
        proj_group: ["五專一", "二技1", "二技2", "大學1", "大學2"],
        table_header: [
            // "檔名",
            "上傳者",
            "上傳時間",
            "備註"
        ],
        array: [],
    }

    //func
    handleSelectFile = (files) => {
        if (files.length > 5) {
            alert("一次請勿上傳超過五個檔案")
        }
        else {
            let array = []
            for (let item = 0; item < files.length; item++) {
                array.push(files[item].name);
            }
            this.setState({
                array
            })
        }
    }
    //生命週期

    //func

    render() {
        const { object, array, proj_type, proj_class, proj_group, table_header } = this.state;
        console.log(object.mM_file);
        return (
            <div>
                <AdminHeader />
                <div className="content">
                    <Sidebar />
                    <div className="content_in">
                        <div className="in">
                            <form className="info_form">
                                <div className="inputbox">
                                    <div className="set col-4">
                                        <select name="" defaultValue={object.proj_type} required className="input">
                                            {proj_type.map((item) => {
                                                return (
                                                    <option value={item}>{item}</option>
                                                )
                                            })}
                                        </select>
                                        <label for="" className="label">專案類型</label>
                                    </div>
                                    <div className="set col-4">
                                        <select name="" defaultValue={object.proj_partition} className="input">
                                            {proj_class.map((item) => {
                                                return (
                                                    <option value={item}>{item}</option>
                                                )
                                            })}
                                        </select>
                                        <label for="" className="label">專案分類</label>
                                    </div>
                                </div>
                                <div className="inputbox">
                                    <div className="set col-12">
                                        <input type="text" name="" placeholder="專案名稱" defaultValue={object.proj_name} required maxLength="50" className="input" />
                                        <label for="" className="label">專案名稱</label>
                                    </div>
                                </div>
                                <div className="inputbox">
                                    <div className="set col-12">
                                        <textarea name="" id="" rows="20" placeholder="內容描述" defaultValue={object.proj_description} required maxLength="2000" className="input"></textarea>
                                        <label for="" className="label">內容描述</label>
                                    </div>
                                </div>
                                <div className="inputbox">
                                    <div className="set col-4">
                                        <select name="group" defaultValue={object.proj_group} required className="input">
                                            {proj_group.map((item) => {
                                                return (
                                                    <option value={item}>{item}</option>
                                                )
                                            })}
                                        </select>
                                        <label for="" className="label">負責小組</label>
                                    </div>
                                    <div className="set col-4">
                                        <input type="text" name="" placeholder="建立者" defaultValue={object.proj_creater} required maxLength="50" className="input" />
                                        <label for="" className="label">建立者</label>
                                    </div>
                                </div>
                                <div className="inputbox">
                                    <div className="set col-12">
                                        <input type="text" name="" id="" placeholder="標籤" className="input" />
                                        <label for="" className="label">標籤</label>
                                    </div>
                                </div>
                                <div className="inputbox">
                                    <div className="set col-12">
                                        <div className="proj_record">
                                            <div className="workinfo">
                                                <div className="edit_button">
                                                    <div className="add">
                                                        <a href="#">
                                                            <p>刪除檔案</p>
                                                        </a>
                                                    </div>
                                                    <div className="add">
                                                        <a href="#">
                                                            <p>新增檔案</p>
                                                        </a>
                                                    </div>
                                                </div>
                                                <form className="searchform">
                                                    <input type="text" placeholder="輸入搜尋值" />
                                                    <input type="submit" value="送出" className="searchBtn" />
                                                </form>
                                            </div>
                                            <ProjectInfoTable table_header={table_header} table_content={object.proj_record} />
                                        </div>
                                    </div>
                                </div>
                                <div className="inputbox">
                                    <Link to='/CaseManage' className="col-1 form_submit">返回</Link>
                                    <input type="submit" value="修改" className="col-1 form_submit" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}