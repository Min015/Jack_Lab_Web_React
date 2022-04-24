import { Component } from 'react';
import '../main_category/setinfo.scss';
import Header from '../../../Components/Header/Header';
import info from '../main_category/img/info.png';
import CreateTable from './CreateTable';
export default class SetInfo extends Component {
    state = {
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


    render() {
        const { object, table_header } = this.state;
        return (
            <div>
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
                                            <a href="#">
                                                <svg width="24" height="23" viewBox="0 0 24 23" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M22.6039 3.60901L19.5585 0.589834C18.7187 -0.242651 17.2978 -0.188179 16.3872 0.716871C15.4765 1.61968 15.417 3.03058 16.259 3.86304L19.3045 6.88221C20.1442 7.7147 21.5651 7.66026 22.478 6.7552C23.3887 5.85015 23.4459 4.44377 22.6039 3.60901ZM3.18957 13.7984L9.28043 19.8368L19.1786 10.0262L13.0878 3.98784L3.18957 13.7984ZM0 22.9059L8.03343 21.3112L1.60851 14.9417L0 22.9059Z"
                                                        fill="#022840" />
                                                </svg>
                                            </a>
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
                            {/* <div className="small_card">
                                <div className="card_banner"></div>
                                <div className="card_content">
                                    <div className="account_info">
                                        <div className="col-3">
                                            帳號
                                        </div>
                                        <div className="col-9">
                                            <div className="account_contnet">
                                                s1110734015@nutc.edu.tw
                                            </div>
                                        </div>
                                    </div>
                                    <div className="account_info">
                                        <div className="col-3" >
                                            修改密碼
                                        </div>
                                        <div className="edit_pen col-9">
                                            <a href="#">
                                                <svg width="24" height="23" viewBox="0 0 24 23" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M22.6039 3.60901L19.5585 0.589834C18.7187 -0.242651 17.2978 -0.188179 16.3872 0.716871C15.4765 1.61968 15.417 3.03058 16.259 3.86304L19.3045 6.88221C20.1442 7.7147 21.5651 7.66026 22.478 6.7552C23.3887 5.85015 23.4459 4.44377 22.6039 3.60901ZM3.18957 13.7984L9.28043 19.8368L19.1786 10.0262L13.0878 3.98784L3.18957 13.7984ZM0 22.9059L8.03343 21.3112L1.60851 14.9417L0 22.9059Z"
                                                        fill="#022840" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <div className="reaults_area">
                        <CreateTable table_header={table_header} table_content={object} />
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}