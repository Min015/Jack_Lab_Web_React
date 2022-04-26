import { Component } from 'react';
import '../main_category/add.scss';
import Header from '../../../Components/Header/Header';
export default class AddMeeting extends Component {
    state = {
        array: [],
        participate: [],
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
        student: [
            {
                s_account: "s01",
                s_name: "陳旻愉",
            },
            {
                s_account: "s02",
                s_name: "張博叡",
            },
            {
                s_account: "s03",
                s_name: "陳俊林",
            },
            {
                s_account: "s04",
                s_name: "林秉宏",
            },
            {
                s_account: "s05",
                s_name: "邱冠翔",
            },
        ]

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
        console.log(this.state.meeting.member.value + "---");
    }
    handelOnClick = e => {
        let participate = this.state.participate;
        console.log(e);
        if (e.checked === true) {
            if (!participate.includes(e.value)) {
                participate.push(e.value
                );
            }
        }
        else {
            participate.forEach((item, index) => {
                if (item === e.value) {
                    participate.splice(index, 1)
                }
            })
        }
        this.setState({
            participate
        })
        console.log(participate);
    }
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
        const { array, title, content, time, member, tag, place, student, participate } = this.state;
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
                                    <div className='input'>
                                        {participate.length === 0 ? "參與人員" : ""}
                                        {participate.map((item) =>
                                            <div className='oncheck'>
                                                <p >{item}</p>
                                                <label className='deselect'>
                                                    <input
                                                        type='checkbox'
                                                        id={item}
                                                        value={item}
                                                        checked
                                                        onChange={(e) => { this.handelOnClick(e.target) }}
                                                    />
                                                    <span>
                                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M9 0C14.0143 0 18 3.98571 18 9C18 14.0143 14.0143 18 9 18C3.98571 18 2.38419e-07 14.0143 2.38419e-07 9C2.38419e-07 3.98571 3.98571 0 9 0ZM5.52857 13.5L9 10.0286L12.4714 13.5L13.5 12.4714L10.0286 9L13.5 5.52857L12.4714 4.5L9 7.97143L5.52857 4.5L4.5 5.52857L7.97143 9L4.5 12.4714L5.52857 13.5Z" fill="#FF0000" />
                                                        </svg>
                                                    </span>
                                                </label>

                                            </div>
                                        )}
                                    </div>
                                    <div className='locator'>
                                        <div className='selectlist'>
                                            {student.map((item) => {
                                                const v = item.s_account + "," + item.s_name
                                                return (
                                                    <div className={participate.includes(v) ? "option selected" : "option noS"}>
                                                        <input
                                                            type='checkbox'
                                                            id={v}
                                                            value={v}
                                                            onChange={(e) => { this.handelOnClick(e.target) }}
                                                        />
                                                        <label for={v}>{item.s_name}</label>
                                                    </div>
                                                )
                                            }

                                            )}
                                        </div>
                                    </div>

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