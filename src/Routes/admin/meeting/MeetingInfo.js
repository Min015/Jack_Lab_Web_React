import { Component } from 'react';
import { Link } from 'react-router-dom';
import AdminHeader from '../../../Components/Header/AdminHeader';
import Sidebar from '../../../Components/Sidebar/Sidebar';
import '../style/info.scss';
export default class MeetingInfo extends Component {
    state = {
        object: {
            mM_id: "a",
            mM_title: "小專畫面",
            mM_content: "這是內容",
            mM_date: "2022-03-29T19:30",
            mM_place: "2605",
            mM_file: ["先假裝它是word", "先假裝它是ppt", "先假裝它是講稿", "先假裝它是錄音檔", "先假裝它是圖片",],
            mM_member: "會議參與人員",
            mM_tag: "會議tag",
            mM_recorder: "陳旻愉",
        },
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
        const { object, array } = this.state;
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
                                    <div className="set col-12">
                                        <input type="text" name="" placeholder="會議主題" defaultValue={object.mM_title} required maxlength="50" className="input" />
                                        <label for="" className="label">會議主題</label>
                                    </div>
                                </div>
                                <div className="inputbox">
                                    <div className="set col-12">
                                        <textarea name="" id="" placeholder="會議內容" defaultValue={object.mM_content} rows="20" required maxlength="2000" className="input"></textarea>
                                        <label for="" className="label">會議內容</label>
                                    </div>
                                </div>
                                <div className="inputbox">
                                    <div className="set col-4">
                                        <input type="datetime-local" name="" defaultValue={object.mM_date} required className="input" />
                                        <label for="" className="label">會議時間</label>
                                    </div>
                                    <div className="set col-4">
                                        <input type="text" name="" defaultValue={object.mM_place} placeholder="會議地點" required maxlength="20" className="input" />
                                        <label for="" className="label">會議地點</label>
                                    </div>
                                </div>
                                <div className="inputbox">
                                    <div className="set col-12">
                                        <select name="group" required className="input">
                                            <option value="" disabled selected>參與人員</option>
                                            <option value="">2022</option>
                                            <option value="">2021</option>
                                            <option value="">2020</option>
                                            <option value="">2019</option>
                                            <option value="">2018</option>
                                            <option value="">2017</option>
                                        </select>
                                        <label for="" className="label">選擇參與人員</label>
                                    </div>
                                </div>
                                <div className="inputbox">
                                    <div className="set col-12">
                                        <input type="text" name="" id="" placeholder="標籤" className="input" />
                                        <label for="" className="label">標籤</label>
                                    </div>
                                </div>
                                <div className="inputbox">
                                    <div className="set col-4">
                                        <input type="text" name="" placeholder="記錄者" defaultValue={object.mM_recorder} required maxlength="50" className="input" />
                                        <label for="" className="label">記錄者</label>
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
                                        {object.mM_file.map(item => (<li>{item}</li>))}
                                        {array.map(item => (<li>{item}</li>))}
                                    </ol>
                                </div>
                                <div className="inputbox">
                                    <Link to='/MeetingManage' className="col-1 form_submit">返回</Link>
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