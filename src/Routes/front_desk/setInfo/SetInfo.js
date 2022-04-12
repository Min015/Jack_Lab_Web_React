import { Component } from 'react';
import '../main_category/setinfo.scss';
import Header from '../../../Components/Header/Header';
import info from '../main_category/img/info.png';
import { Link } from 'react-router-dom';
export default class SetInfo extends Component {
    state = {

    }
    //生命週期

    //func


    render() {

        return (
            <div>
                <Header />
                <div class="content">
                    <div class="contentin">
                        <div class="card">
                            <div class="big_card">
                                <div class="card_banner"></div>
                                <div class="card_content">
                                    <div class="head_stickers">
                                        <img src={info} />
                                    </div>
                                    <div class="information">
                                        <div class="edit_pen">
                                            <a href="#">
                                                <svg width="24" height="23" viewBox="0 0 24 23" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M22.6039 3.60901L19.5585 0.589834C18.7187 -0.242651 17.2978 -0.188179 16.3872 0.716871C15.4765 1.61968 15.417 3.03058 16.259 3.86304L19.3045 6.88221C20.1442 7.7147 21.5651 7.66026 22.478 6.7552C23.3887 5.85015 23.4459 4.44377 22.6039 3.60901ZM3.18957 13.7984L9.28043 19.8368L19.1786 10.0262L13.0878 3.98784L3.18957 13.7984ZM0 22.9059L8.03343 21.3112L1.60851 14.9417L0 22.9059Z"
                                                        fill="#022840" />
                                                </svg>
                                            </a>
                                        </div>
                                        <div class="member_label">
                                            <div class="member_name">陳旻愉</div>
                                            <div>資訊應用菁英班四甲</div>
                                        </div>
                                    </div>
                                    <div class="introduction">
                                        <div class="introduction_in">
                                            這是個人簡介<br />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="small_card">
                                <div class="card_banner"></div>
                                <div class="card_content">
                                    <div class="account_info">
                                        <div class="col-3">
                                            帳號
                                        </div>
                                        <div class="col-9">
                                            <div class="account_contnet">
                                                s1110734015@nutc.edu.tw
                                            </div>
                                        </div>
                                    </div>
                                    <div class="account_info">
                                        <div class="col-3" >
                                            修改密碼
                                        </div>
                                        <div class="edit_pen col-9">
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
                            </div>
                        </div>
                        <div class="reaults_area">
                            <table>
                                <tr>
                                    <th>年分</th>
                                    <th>類型</th>
                                    <th>參加組別</th>
                                    <th>項目名稱</th>
                                    <th>參加人員</th>
                                    <th>得獎名次</th>
                                </tr>
                                <tr class="tr_odd">
                                    <td>2021</td>
                                    <td>資訊應用服務創新大賽</td>
                                    <td>Azure 雲端創新產業應用組</td>
                                    <td>手影隨行</td>
                                    <td>沈舜鴻、柯宣竹、陳奕伶、王子瑜、江糖晴</td>
                                    <td>最佳創意</td>
                                </tr>
                                <tr class="tr_even">
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}