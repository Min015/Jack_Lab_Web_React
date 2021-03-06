import React, { Component } from 'react';
import '../main_category/category.scss';
import MemberLayout from '../../../Components/Layout/front/member/MemberLayout';
import { Link } from 'react-router-dom';
import CreateTable from './CreateTable';
export default class GameList extends Component {
    state = {
        all_data: 101,//總資料筆數
        now_page: 1,//現在頁面
        all_page: 0,
        page: [],
        table_header: [
            "年分",
            "類型",
            "參加組別",
            "項目名稱",
            "參加人員",
            "得獎名次",
        ],
        object: [
            {
                Id: '1',
                g_year: 2021,
                g_type: "資訊應用服務創新大賽",
                g_group: "Azure雲端創新產業應用組",
                g_name: "手影隨行",
                g_participants: "沈舜鴻、柯宣竹、陳奕伶、王子瑜、江糖晴",
                g_position: "最佳創意",
            },
            {
                Id: '2',
                g_year: 2021,
                g_type: "資訊應用服務創新大賽",
                g_group: "教育資料開放組",
                g_name: "讀癮",
                g_participants: "",
                g_position: "佳作",
            },
        ],
        year: ["選擇年分(必填)", "2022", "2021", "2020", "2019", "2018", "2017", "2016"],
        game_type: ["選擇類型", "資訊應用服務創新大賽", "黑克松"],
    }


    render() {
        const { object, table_header, year, game_type, page } = this.state;

        return (
            <div id='fornt_main'>
                <MemberLayout>
                    <div className="works_area">
                        <div className="select_list">
                            <select name="year" required className="select">
                                {year.map((item, index) => {
                                    return (
                                        <option key={`year${index}`} value={item}>{item}</option>
                                    )
                                })}
                            </select>
                            <select name="type" className="select">
                                {game_type.map((item, index) => {
                                    return (
                                        <option key={`game_type${index}`} value={item}>{item}</option>
                                    )
                                })}
                            </select>
                            <input type="input" placeholder="搜尋" className="search" />
                            <input type="submit" value="送出" className="submit" />
                        </div>
                        <div className="search_add">
                            <div className="add">
                                <Link to='/game/addgame'>
                                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.84375 11.8945H7.62891C7.58539 11.8945 7.54366 11.9118 7.5129 11.9426C7.48213 11.9734 7.46484 12.0151 7.46484 12.0586V13.043C7.46484 13.0865 7.48213 13.1282 7.5129 13.159C7.54366 13.1897 7.58539 13.207 7.62891 13.207H9.84375V15.4219C9.84375 15.4654 9.86103 15.5071 9.8918 15.5379C9.92257 15.5687 9.9643 15.5859 10.0078 15.5859H10.9922C11.0357 15.5859 11.0774 15.5687 11.1082 15.5379C11.139 15.5071 11.1562 15.4654 11.1562 15.4219V13.207H13.3711C13.4146 13.207 13.4563 13.1897 13.4871 13.159C13.5179 13.1282 13.5352 13.0865 13.5352 13.043V12.0586C13.5352 12.0151 13.5179 11.9734 13.4871 11.9426C13.4563 11.9118 13.4146 11.8945 13.3711 11.8945H11.1562V9.67969C11.1562 9.63618 11.139 9.59445 11.1082 9.56368C11.0774 9.53291 11.0357 9.51562 10.9922 9.51562H10.0078C9.9643 9.51562 9.92257 9.53291 9.8918 9.56368C9.86103 9.59445 9.84375 9.63618 9.84375 9.67969V11.8945ZM17.526 5.92061C17.649 6.04365 17.7188 6.20977 17.7188 6.38408V19.0312C17.7188 19.3942 17.4255 19.6875 17.0625 19.6875H3.9375C3.57451 19.6875 3.28125 19.3942 3.28125 19.0312V1.96875C3.28125 1.60576 3.57451 1.3125 3.9375 1.3125H12.6472C12.8215 1.3125 12.9896 1.38223 13.1127 1.50527L17.526 5.92061ZM16.2053 6.68555L12.3457 2.82598V6.68555H16.2053Z" fill="white" />
                                    </svg>
                                    <p>新增競賽</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="reaults_area">
                        <CreateTable table_header={table_header} table_content={object} />
                    </div>
                    <div className='page'>
                        <div className='one_page'>
                            <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 9L9 18L10.4 16.5L3 9L10.4 1.5L9 0L0 9Z" fill="white" />
                            </svg>
                        </div>
                        <div className='page_group'>
                            {page.map((item, index) =>
                                (<a key={index}><div className='one_page'>{item}</div></a>)
                            )}
                        </div>
                        <div className='one_page'>
                            <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.4 0L0 1.5L7.4 9L0 16.5L1.4 18L10.4 9L1.4 0Z" fill="white" />
                            </svg>
                        </div>
                    </div>
                </MemberLayout>
            </div>
        )
    }
}