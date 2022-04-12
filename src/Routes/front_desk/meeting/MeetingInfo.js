import { Component } from 'react';
import '../main_category/meetingInfo.scss';
import Header from '../../../Components/Header/Header';
import { Link } from 'react-router-dom';
export default class MeetingInfo extends Component {
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
                        <div class="add_title">
                            <div class="title_name">
                                <h2>小專畫面</h2>
                                <div class="tag">
                                    <div class="small_tag">
                                        <a href="../html/project.html">#小專</a>
                                    </div>
                                </div>
                            </div>
                            <div class="edit_button">
                                <div class="add">
                                    <a href="#">
                                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M18.5118 2.99361L16.0177 0.489257C15.33 -0.201275 14.1663 -0.156091 13.4205 0.594632C12.6747 1.34349 12.626 2.51381 13.3156 3.20432L15.8097 5.70867C16.4974 6.39921 17.661 6.35405 18.4087 5.60331C19.1545 4.85259 19.2014 3.68603 18.5118 2.99361ZM2.61215 11.4456L7.60035 16.4543L15.7066 8.31654L10.7184 3.30784L2.61215 11.4456ZM0 19L6.5791 17.6773L1.31732 12.3938L0 19Z" fill="white" />
                                        </svg>
                                        <p>修改記錄</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="meeting">
                            <div class="col-5 something_content meeting_content">
                                這是開會的內容

                            </div>
                            <div class="col-6 meeting_info">
                                <div class="else_info">
                                    <div class="col-3">
                                        <p>時間</p>
                                        <div class="info_block_content">
                                            2022-03-29
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <p>地點</p>
                                        <div class="info_block_content">
                                            2606
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <p>紀錄者</p>
                                        <div class="info_block_content">
                                            陳旻愉
                                        </div>
                                    </div>
                                </div>
                                <div class="magin_top_70">
                                    <p>參與人員</p>
                                    <div class="participant something_content">
                                        這是參與開會的人們
                                    </div>
                                </div>
                                <div class="magin_top_70">
                                    <p>相關檔案</p>
                                    <ol>
                                        <li>先假裝它是word</li>
                                        <li>先假裝它是ppt</li>
                                        <li>先假裝它是講稿</li>
                                        <li>先假裝它是錄音檔</li>
                                        <li>先假裝它是圖片</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}