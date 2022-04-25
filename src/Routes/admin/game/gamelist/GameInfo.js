import { Component } from 'react';
import { Link } from 'react-router-dom';
import AdminHeader from '../../../../Components/Header/AdminHeader';
import Sidebar from '../../../../Components/Sidebar/Sidebar';
import '../../style/info.scss';
export default class GameInfo extends Component {
    state = {
        object: {
            gM_type: "資訊應用服務創新大賽",
            gM_group: "Azure雲端創新產業應用組",
            gM_name: "手影隨行",
            gM_ranking: "最佳創意",
            gM_year: "2021-11-07",
            gM_file: ["先假裝它是word", "先假裝它是ppt", "先假裝它是講稿", "先假裝它是錄音檔", "先假裝它是圖片",],
            gM_participants: ["沈舜鴻", "、柯宣竹", "陳奕伶", "王子瑜", "江糖晴",],
            gM_Uploader: "王子瑜",
        },
        array: [],
        game_type: ["資訊應用服務創新大賽", "黑克松"],
        game_rank: ["第一名", "第二名", "第三名", "佳作", "最佳創意", "NO"],
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
        const { object, array, game_type, game_rank } = this.state;
        return (
            <div>
                <AdminHeader />
                <div className="content">
                    <Sidebar />
                    <div className="content_in">
                        <div className="in">
                            <form className="info_form" >
                                <div className="inputbox">
                                    <div className="set col-4">
                                        <select name="" defaultValue={object.gM_type} required className="input">
                                            {game_type.map((item) => {
                                                return (
                                                    <option value={item}>{item}</option>
                                                )
                                            })}
                                        </select>
                                        <label for="" className="label">競賽類型</label>
                                    </div>
                                    <div className="set col-4">
                                        <input type="text" name="" placeholder="項目名稱" defaultValue={object.gM_name} required maxLength="50" className="input" />
                                        <label for="" className="label">項目名稱</label>
                                    </div>
                                </div>
                                <div className="inputbox">
                                    <div className="set col-4">
                                        <input type="text" name="" id="" placeholder="參加組別" defaultValue={object.gM_group} maxLength="100" className="input" />
                                        <label for="" className="label">參加組別</label>
                                    </div>
                                    <div className="set col-4">
                                        <select name="" defaultValue={object.gM_ranking} required className="input" >
                                            {game_rank.map((item) => {
                                                return (
                                                    <option value={item}>{item}</option>
                                                )
                                            })}
                                        </select>
                                        <label for="" className="label">得獎名次</label>
                                    </div>
                                </div>
                                <div className="inputbox">
                                    <div className="set col-4">
                                        <input type="date" className="input" defaultValue={object.gM_year} required />
                                        <label for="" className="label">競賽時間</label>
                                    </div>
                                </div>
                                <div className="inputbox">
                                    <div className="set col-12">
                                        <select name="" className="input" required>
                                            <option value="" disabled selected>參與人員</option>
                                            <option value="">2022</option>
                                            <option value="">2021</option>
                                            <option value="">2020</option>
                                            <option value="">2019</option>
                                            <option value="">2018</option>
                                            <option value="">2017</option>
                                        </select>
                                        <label for="" className="label">選擇參與人員(必填)</label>
                                    </div>
                                </div>
                                <div className="inputbox">
                                    <div className="set col-4">
                                        <input type="text" name="" placeholder="上傳者" defaultValue={object.gM_Uploader} required maxlength="50" className="input" />
                                        <label for="" className="label">上傳者</label>
                                    </div>
                                </div>
                                <div className="inputbox">
                                    <div className="upload">
                                        <input type="file" id="f" multiple="multiple" onChange={e => this.handleSelectFile(e.target.files)} />
                                        <div className="newbtn">
                                            <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20 2H10L8 0H0V16H20V2ZM11 9V13H9V9H6L10.01 5L14 9H11Z" fill="white" />
                                            </svg>
                                            <label for="f">請選擇檔案(不超過5)</label>
                                        </div>
                                    </div>
                                </div>
                                <div id="filename">
                                    <ol>
                                        {object.gM_file.map(item => (<li>{item}</li>))}
                                        {array.map(item => (<li>{item}</li>))}
                                    </ol>
                                </div>
                                <div className="inputbox">
                                    <Link to='/GameManage' className="col-1 form_submit">返回</Link>
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