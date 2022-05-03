import { Component } from 'react';
import '../main_category/projectInfo.scss';
import Header from '../../../Components/Header/Header';
import AddProjectInfo from './ProjectInfoTable';
export default class ProjectInfo extends Component {
    state = {
        drop: false,
        upload: [],
        table_header: [
            "檔名",
            "上傳者",
            "上傳時間",
            "備註"
        ],
        object: [
            {
                file_id: "",
                file_name: "以深度學習神經網路為基礎不良坐姿檢測與警示系統",
                file_uploader: "千千",
                file_createTime: "2019-03-06",
                file_record: "v3",
            },
            {
                file_id: "",
                file_name: "以深度學習神經網路為基礎不良坐姿檢測與警示系統",
                file_uploader: "千千",
                file_createTime: "2019-03-07",
                file_record: "v4",
            },
        ],
    }
    //生命週期

    //func


    handelMouseDown = (e) => {
        if (e.target.className === "window") {
            this.setState({
                drop: false,
            })
        }
    }
    drop_down = () => {
        if (this.state.drop === false) {
            this.setState({
                drop: true,
            })
        }
        else {
            this.setState({
                drop: false,
            })
        }
    }

    handleSelectFile = (files) => {
        if (files.length > 1) {
            alert("一次只能上傳一個檔案")
        }
        else {
            let array = []
            for (let item = 0; item < files.length; item++) {
                array.push(files[item].name);
            }
            this.setState({
                upload: array
            })
        }
    }
    render() {
        const { table_header, object, drop, upload } = this.state;
        return (
            <div id='project_info'>
                <Header />
                <div className="content">
                    <div className="contentin">
                        <div className="add_title">
                            <div className="title_name">
                                <h2>以深度學習神經網路為基礎不良坐姿檢測與警示系統</h2>
                                <div className="tag">
                                    <div className="small_tag">
                                        國科會
                                    </div>
                                </div>
                            </div>
                            <div className="edit_button">
                                <div className="add">
                                    <a href="#">
                                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M18.5118 2.99361L16.0177 0.489257C15.33 -0.201275 14.1663 -0.156091 13.4205 0.594632C12.6747 1.34349 12.626 2.51381 13.3156 3.20432L15.8097 5.70867C16.4974 6.39921 17.661 6.35405 18.4087 5.60331C19.1545 4.85259 19.2014 3.68603 18.5118 2.99361ZM2.61215 11.4456L7.60035 16.4543L15.7066 8.31654L10.7184 3.30784L2.61215 11.4456ZM0 19L6.5791 17.6773L1.31732 12.3938L0 19Z" fill="white" />
                                        </svg>
                                        <p>修改專案</p>
                                    </a>
                                </div>
                                <div className="add">
                                    <div
                                        className='func_btn'
                                        onClick={this.drop_down}
                                    >
                                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.84375 11.8945H7.62891C7.58539 11.8945 7.54366 11.9118 7.5129 11.9426C7.48213 11.9734 7.46484 12.0151 7.46484 12.0586V13.043C7.46484 13.0865 7.48213 13.1282 7.5129 13.159C7.54366 13.1897 7.58539 13.207 7.62891 13.207H9.84375V15.4219C9.84375 15.4654 9.86103 15.5071 9.8918 15.5379C9.92257 15.5687 9.9643 15.5859 10.0078 15.5859H10.9922C11.0357 15.5859 11.0774 15.5687 11.1082 15.5379C11.139 15.5071 11.1562 15.4654 11.1562 15.4219V13.207H13.3711C13.4146 13.207 13.4563 13.1897 13.4871 13.159C13.5179 13.1282 13.5352 13.0865 13.5352 13.043V12.0586C13.5352 12.0151 13.5179 11.9734 13.4871 11.9426C13.4563 11.9118 13.4146 11.8945 13.3711 11.8945H11.1562V9.67969C11.1562 9.63618 11.139 9.59445 11.1082 9.56368C11.0774 9.53291 11.0357 9.51562 10.9922 9.51562H10.0078C9.9643 9.51562 9.92257 9.53291 9.8918 9.56368C9.86103 9.59445 9.84375 9.63618 9.84375 9.67969V11.8945ZM17.526 5.92061C17.649 6.04365 17.7188 6.20977 17.7188 6.38408V19.0312C17.7188 19.3942 17.4255 19.6875 17.0625 19.6875H3.9375C3.57451 19.6875 3.28125 19.3942 3.28125 19.0312V1.96875C3.28125 1.60576 3.57451 1.3125 3.9375 1.3125H12.6472C12.8215 1.3125 12.9896 1.38223 13.1127 1.50527L17.526 5.92061ZM16.2053 6.68555L12.3457 2.82598V6.68555H16.2053Z" fill="white" />
                                        </svg>
                                        <p>新增記錄</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="project_content something_content">
                            這是專案的內容描述
                        </div>
                        <div className="reaults_area">
                            <AddProjectInfo table_header={table_header} table_content={object} />
                        </div>
                    </div>
                    <div
                        className={drop ? "popup_background active" : "popup_background"}
                        onClick={this.handelMouseDown}
                    >
                        <div className="window">
                            <div className="form">
                                <h1 className="title">
                                    新增專案記錄
                                </h1>
                                <div className='col-12 enter'>
                                    <textarea className='long_text'>

                                    </textarea>
                                    <label for="" className="label">備註(必填)</label>
                                </div>
                                <div id="filename">
                                    <ul>
                                        {upload.map(item => (<li>{item}</li>))}
                                    </ul>
                                </div>
                                <div className='enter'>
                                    <input type='file' id='f' onChange={e => this.handleSelectFile(e.target.files)} />
                                    <label for='f' className='nowfile'>
                                        上傳檔案
                                    </label>
                                </div>
                                <div id='btn_block'>
                                    <button
                                        id='close'
                                        className="submitBtn"
                                        onClick={this.drop_down}
                                    >
                                        取消
                                    </button>
                                    <button
                                        className="submitBtn"
                                    // onClick={(e) => this.Delete(this.state.Id, e)}
                                    >
                                        新增
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}