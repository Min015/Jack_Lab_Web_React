import { Component } from 'react';
import '../main_category/add.scss';
import Header from '../../../Components/Header/Header';
export default class AddMeeting extends Component {
    state = {
        array: [],
        title: "",
        content: "",
        title: {
            value: "",
            errormsg: "請輸入",
        },
        content: {
            value: "",
            errormsg: "請輸入",
        },
        time: {
            value: "",
            errormsg: "請輸入",
        },
        place: {
            value: "",
            errormsg: "請輸入",
        },
        member: {
            value: "",
            errormsg: "請輸入",
        },
    }

    handleInputChange(event) {
        const target = event.target;
        let { value, name } = target;
        console.log(value);
        value = value.trim();
        if (value != "") {
            this.setState({
                [name]: {
                    value,
                    errormsg: "",
                }
            });
        }
        else {
            this.setState({
                [name]: {
                    value,
                    errormsg: "請輸入",
                }
            });
        }
        console.log(this.state.meeting.member.value +"---");
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
    handleGetnow = () => {
        const dt = new Date();
        const hh = dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours();
        const mm = dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes();
        const today = new Date().toISOString().split("T");
        const ISO = today[0] + "T" + hh + ":" + mm;
        // console.log("ISO=>" + ISO);
        return (ISO);
    }

    render() {
        const { array, title, content, time, member, tag, place } = this.state;
        return (
            <div>
                <Header />
                <div className="content">
                    <div className="contentin">
                        <div className="add_title">
                            <h2>新增會議記錄</h2>
                        </div>
                        <form className="add_form">
                            <div className="inputbox">
                                <div className="set col-12">
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="會議主題"
                                        required
                                        maxLength="50"
                                        className="input"
                                        value={title.value}
                                        onChange={this.handleInputChange.bind(this)}
                                    />
                                    <label className="label">輸入會議主題<div className='error_msg'>{title.errormsg}</div></label>

                                </div>
                            </div>
                            <div className="inputbox">
                                <div className="set col-12">
                                    <textarea
                                        name="content"
                                        placeholder="會議內容"
                                        rows="20"
                                        required
                                        maxLength="2000"
                                        className="input"
                                        value={content.value}
                                        onChange={this.handleInputChange.bind(this)}
                                    ></textarea>
                                    <label className="label">輸入會議內容<div className='error_msg'>{content.errormsg}</div></label>

                                </div>
                            </div>
                            <div className="inputbox">
                                <div className="set col-4">
                                    <input
                                        type="datetime-local"
                                        name="time"
                                        max={this.handleGetnow()}
                                        required className="input"
                                        value={time.value}
                                        onChange={this.handleInputChange.bind(this)}
                                    />
                                    <label className="label">輸入會議時間<div className='error_msg'>{time.errormsg}</div></label>
                                </div>
                                <div className="set col-4">
                                    <input type="text"
                                        name="place"
                                        placeholder="會議地點"
                                        required
                                        maxLength="20"
                                        className="input"
                                        value={place.value}
                                        onChange={this.handleInputChange.bind(this)}
                                    />
                                    <label className="label">輸入會議地點<div className='error_msg'>{place.errormsg}</div></label>
                                </div>
                            </div>
                            <div className="inputbox">
                                <div className="set col-12">
                                    <select 
                                    name="member" 
                                    required 
                                    className="input"
                                    

                                    >
                                        <option value="">參與人員</option>
                                        <option value="">2022</option>
                                        <option value="">2021</option>
                                        <option value="">2020</option>
                                        <option value="">2019</option>
                                        <option value="">2018</option>
                                        <option value="">2017</option>
                                    </select>
                                    <label className="label">選擇參與人員<div className='error_msg'>{member.errormsg}</div></label>
                                </div>
                            </div>
                            <div className="inputbox">
                                <div className="set col-12">
                                    <input type="text" 
                                    name=""
                                    placeholder="標籤" 
                                    className="input"
                                    />
                                    <label className="label">輸入標籤</label>
                                </div>
                            </div>
                            <div className="inputbox">
                                <div className="upload">
                                    <input type="file" id="f" multiple="multiple" onChange={e => this.handleSelectFile(e.target.files)} />
                                    <div className="newbtn">
                                        <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20 2H10L8 0H0V16H20V2ZM11 9V13H9V9H6L10.01 5L14 9H11Z" fill="white" />
                                        </svg>
                                        <label>請選擇檔案(不超過5)</label>
                                    </div>
                                </div>
                            </div>
                            <div id="filename">
                                <ol>
                                    {array.map(item => (<li>{item}</li>))}
                                </ol>
                            </div>
                            <div className="inputbox">
                                <input type="submit" value="送出" className="col-1 form_submit" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}