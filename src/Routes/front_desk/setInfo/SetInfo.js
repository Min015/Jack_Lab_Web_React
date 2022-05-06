import { Component } from 'react';
import './setinfo.scss';
import Header from '../../../Components/Header/front_end/Header';
import info from './img/info.png';
import camera from './img/camera.png';
import CreateTable from './CreateTable';
export default class SetInfo extends Component {
    state = {
        drop: false,
        photo: false,
        upload: [],
        table_header: [
            "年分",
            "比賽類型",
            // "參加組別",
            "項目名稱",
            // "參加人員",
            "得獎名次",
        ],
        object: [
            {
                g_year: 2021,
                g_type: "資訊應用服務創新大賽",
                g_group: "Azure雲端創新產業應用組",
                g_name: "手影隨行",
                g_participants: "沈舜鴻、柯宣竹、陳奕伶、王子瑜、江糖晴",
                g_position: "最佳創意",
            },
            {
                g_year: 2021,
                g_type: "資訊應用服務創新大賽",
                g_group: "教育資料開放組",
                g_name: "讀癮",
                g_participants: "",
                g_position: "佳作",
            },
        ]
    }
    //生命週期

    //func

    handelMouseDown = (e) => {
        if (e.target.className === "window") {
            this.setState({
                drop: false,
                d: false,
            })
        }
    }
    drop_down = (e) => {
        if (e === 'drop') {
            this.setState({
                drop: !this.state.drop,
            })
        }
        else if(e==='photo'){
            this.setState({
                photo: !this.state.photo,
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
        const { object, table_header, drop, photo,upload } = this.state;
        return (
            <div id='personal_info'>
                <Header />
                <div className="content">
                    <div className="contentin">
                        <div className="card">
                            <div className="big_card">
                                <div className="card_banner"></div>
                                <div className="card_content">
                                    <div className="head_stickers">
                                        <img src={info} />
                                    </div>
                                    <div className="information">
                                        <div className="edit_pen">
                                            <div className='edit_introduce'>
                                                <svg width="24" height="23" viewBox="0 0 24 23" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M22.6039 3.60901L19.5585 0.589834C18.7187 -0.242651 17.2978 -0.188179 16.3872 0.716871C15.4765 1.61968 15.417 3.03058 16.259 3.86304L19.3045 6.88221C20.1442 7.7147 21.5651 7.66026 22.478 6.7552C23.3887 5.85015 23.4459 4.44377 22.6039 3.60901ZM3.18957 13.7984L9.28043 19.8368L19.1786 10.0262L13.0878 3.98784L3.18957 13.7984ZM0 22.9059L8.03343 21.3112L1.60851 14.9417L0 22.9059Z"
                                                        fill="#022840" />
                                                </svg>
                                                <div className='colse'>
                                                    <div className="close_btn" onClick={() => this.drop_down('drop')} />
                                                </div>
                                            </div>
                                            <div className='camera'  >
                                                <img src={camera} onClick={() => this.drop_down('photo')} />
                                            </div>
                                        </div>
                                        <div className="member_label">
                                            <div className="member_name">陳旻愉</div>
                                            <div>資訊應用菁英班四甲</div>
                                        </div>
                                    </div>
                                    <div className="introduction">
                                        <div className="introduction_in">
                                            這是個人簡介<br />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="reaults_area">
                            <CreateTable table_header={table_header} table_content={object} />
                        </div>
                        <div
                            className={drop ? "popup_background active" : "popup_background"}
                            onClick={this.handelMouseDown}
                        >
                            <div className="window">
                                <div className="form">
                                    <h1 className="title">
                                        修改個人簡介
                                        <div className="close">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M24 2.4L21.6 0L12 9.6L2.4 0L0 2.4L9.6 12L0 21.6L2.4 24L12 14.4L21.6 24L24 21.6L14.4 12L24 2.4Z" fill="#51718C" />
                                            </svg>
                                            <div className="close_btn" onClick={() => this.drop_down('drop')} />
                                        </div>
                                    </h1>
                                    <div className='col-12 enter'>
                                        <textarea className='long_text'>

                                        </textarea>
                                    </div>
                                    <div id='btn_block'>
                                        <button
                                            className="submitBtn"
                                        // onClick={(e) => this.Delete(this.state.Id, e)}
                                        >
                                            修改
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className={photo ? "popup_background active" : "popup_background"}
                            onClick={this.handelMouseDown}
                        >
                            <div className="window">
                                <div className="form">
                                    <h1 className="title">
                                        上傳大頭貼
                                        <div className="close">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M24 2.4L21.6 0L12 9.6L2.4 0L0 2.4L9.6 12L0 21.6L2.4 24L12 14.4L21.6 24L24 21.6L14.4 12L24 2.4Z" fill="#51718C" />
                                            </svg>
                                            <div className="close_btn" onClick={() => this.drop_down('photo')} />
                                        </div>
                                    </h1>
                                    <div id="filename">
                                        <ul>
                                        {upload.map(item => (<li>{item}</li>))}
                                        </ul>
                                    </div>
                                    <div className='enter'>
                                        <input type='file' id='f' onChange={e => this.handleSelectFile(e.target.files)} />
                                        <label for='f' className='nowfile'>
                                            選擇相片
                                        </label>
                                    </div>
                                    <div id='btn_block'>
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
            </div>
        )
    }
}