import { Component } from 'react';
import '../main_category/add.scss';
import Header from '../../../Components/Header/Header';
import { GET_Members } from '../../../Service/meeting/Meeting.js';
export default class AddMeeting extends Component {
    state = {
        array: [],//file
        participate: [],//已選擇
        participateName: [],
        drop: false,
        long: 0,
        nowclass: "selectlist",
        title: {
            value: "",
            errormsg: "必填",
        },
        content: {
            value: "",
            errormsg: "必填",
        },
        time: {
            value: "",
            errormsg: "必填",
        },
        place: {
            value: "",
            errormsg: "必填",
        },
        member: {
            value: "",
            errormsg: "必填",
        },

        tag: [],
        Members: [],

    }

    componentDidMount = async () => {
        try {
            const res = await GET_Members();
            this.setState({ Members: res.data.data });
        } catch (err) {
            console.log(err);
        }
    }


    handleInputChange(event) {
        const target = event.target;
        let { value, name } = target;
        console.log(value);
        value = value.trim();
        if (value !== "") {
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
                    errormsg: "必填",
                }
            });
        }
        console.log(this.state.meeting.member.value + "---");
    }
    handelOnClick = e => {
        let participate = this.state.participate;
        let participateName = this.state.participateName;
        if (e.checked === true) {
            if (!participate.includes(e.id)) {
                participate.push(e.id);
                participateName.push(e.value)
            }
        }
        else {
            participate.forEach((item, index) => {
                if (item === e.id) {
                    participate.splice(index, 1)
                }
            })
            participateName.forEach((item, index) => {
                if (item === e.value) {
                    participateName.splice(index, 1)
                }
            })
        }
        this.setState({
            participate
        })
        console.log(participate);
    }
    handelOnClick2 = e => {
        let participate = this.state.participate;
        const account = e.id;
        const name = e.value;
        const obj = {
            account,
            name
        }
        if (e.checked === true) {
            if (!participate.find((item)=>JSON.stringify(item)===JSON.stringify(obj))) {
                participate.push(obj);
                console.log("加入");
            }
            this.setState({
                participate,
            })
        }
        else {
            let newarray=participate.filter((item)=>item.account!==obj.account)
            console.log(newarray);
            console.log("刪除");
            this.setState({
                participate:newarray,
            })
        }
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
    handleGrop_down = () => {
        if (this.state.drop === false) {
            this.setState({
                drop: true,
                nowclass: 'selectlist active',
            })
        }
        else {
            this.setState({
                drop: false,
                nowclass: 'selectlist',
            })
        }
    }
    handelMouseDown = (e) => {
        const cn = (e.target.className);
        const name = cn.split(" ");
        if (name[0] !== "choose") {
            this.setState({
                drop: false,
                nowclass: 'selectlist',
            })
        }
        else {
            this.setState({
                drop: true,
                nowclass: 'selectlist active',
            })
        }
    }
    heandleAddTag = (e) => {
        const tag = this.state.tag;
        if (e.keyCode === 32) {
            if (!tag.includes(e.target.value) && (e.target.value) !== "" && (e.target.value) !== " ") {
                tag.push(e.target.value);
            }
            e.target.value = "";
            console.log(tag);
        }
    }
    heandleDelTag = (e) => {
        const thistag = e.target.id;
        let tag = this.state.tag;
        if (tag.includes(thistag)) {
            tag.forEach((item, index) => {
                if (item === thistag) {
                    tag.splice(index, 1)
                }
            })
        }
        this.setState({
            tag
        })
        console.log(tag)
    }

    headleGetLong = (e) => {
        const long = e.target.value.length;
        if (long >= 20) {
            alert("一個標籤勿超過20字");
            e.target.value = "";
        }
        this.setState({
            long
        })
    }

    render() {
        const { array, title, content, time, member, tag, place, student, participate, participateName, nowclass, long, Members } = this.state;
        return (
            <div>
                <Header />
                <div className="content">
                    <div className="contentin">
                        <div className="add_title">
                            <h2>新增會議記錄</h2>
                        </div>
                        <form
                            className="add_form"
                            onClick={this.handelMouseDown.bind(this)}
                        >
                            {/* 輸入會議主題 */}
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
                            {/* 輸入會議內容 */}
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
                            {/* 輸入會議時間地點 */}
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
                            {/* 參與人員 */}
                            <div className="inputbox">
                                <div className="set col-12">
                                    <div
                                        className='choose input'
                                        onClick={this.handleGrop_down}
                                    >
                                        {participate.length === 0 ? "參與人員" : ""}
                                        {participate.map((item, index) =>
                                            <div
                                                className='oncheck'
                                                key={index}
                                            >
                                                <p >{item.name}
                                                    <label className='deselect'>
                                                        <input
                                                            type='checkbox'
                                                            id={item.account}
                                                            value={item.name}
                                                            checked
                                                            onChange={(e) => { this.handelOnClick2(e.target) }}
                                                        />
                                                        <span>
                                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M0.33546 0.33546C0.550319 0.120665 0.841693 0 1.1455 0C1.44932 0 1.74069 0.120665 1.95555 0.33546L6.00692 4.38683L10.0583 0.33546C10.2744 0.126752 10.5638 0.0112672 10.8642 0.0138777C11.1646 0.0164882 11.452 0.136985 11.6644 0.349417C11.8768 0.561848 11.9973 0.849216 12 1.14963C12.0026 1.45004 11.8871 1.73946 11.6784 1.95555L7.62701 6.00692L11.6784 10.0583C11.8871 10.2744 12.0026 10.5638 12 10.8642C11.9973 11.1646 11.8768 11.452 11.6644 11.6644C11.452 11.8768 11.1646 11.9973 10.8642 12C10.5638 12.0026 10.2744 11.8871 10.0583 11.6784L6.00692 7.62701L1.95555 11.6784C1.73946 11.8871 1.45004 12.0026 1.14963 12C0.849216 11.9973 0.561848 11.8768 0.349417 11.6644C0.136985 11.452 0.0164882 11.1646 0.0138777 10.8642C0.0112672 10.5638 0.126752 10.2744 0.33546 10.0583L4.38683 6.00692L0.33546 1.95555C0.120665 1.74069 0 1.44932 0 1.1455C0 0.841693 0.120665 0.550319 0.33546 0.33546Z" fill="#6248FF" />
                                                            </svg>
                                                        </span>
                                                    </label>
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    <div className='locator'>
                                        <div className={nowclass}>
                                            {Members.map((item, index) => {
                                                return (
                                                    <div
                                                        className={participate.includes(item.Account) ? "option selected" : "option noS"}
                                                        key={index}
                                                    >
                                                        <input
                                                            type='checkbox'
                                                            id={item.Account}
                                                            value={item.student.Name}
                                                            className='choose'
                                                            onChange={(e) => { this.handelOnClick2(e.target) }}
                                                        />
                                                        <label for={item.Account} className='choose'>{item.student.Name}</label>
                                                    </div>
                                                )
                                            }
                                            )}
                                            {/* {student.map((item, index) => {
                                            const v = item.s_account + "," + item.s_name
                                            return (
                                                <div
                                                    className={participate.includes(v) ? "option selected" : "option noS"}
                                                    key={index}
                                                >
                                                    <input
                                                        type='checkbox'
                                                        id={index}
                                                        value={v}
                                                        className='choose'
                                                        onChange={(e) => { this.handelOnClick(e.target) }}
                                                    />
                                                    <label for={index} className='choose'>{item.s_name}</label>
                                                </div>
                                            )
                                        }
                                        )} */}
                                        </div>
                                    </div>
                                    <label className="label">選擇參與人員<div className='error_msg'>{member.errormsg}</div></label>
                                </div>
                            </div>
                            {/* 標籤 */}
                            <div className="inputbox">
                                <div className="set col-12">
                                    <div className="input">
                                        {tag.map((item) => (
                                            <p key={item}>
                                                {item}
                                                <span
                                                    onClick={this.heandleDelTag}
                                                >
                                                    <svg id={item} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M0.33546 0.33546C0.550319 0.120665 0.841693 0 1.1455 0C1.44932 0 1.74069 0.120665 1.95555 0.33546L6.00692 4.38683L10.0583 0.33546C10.2744 0.126752 10.5638 0.0112672 10.8642 0.0138777C11.1646 0.0164882 11.452 0.136985 11.6644 0.349417C11.8768 0.561848 11.9973 0.849216 12 1.14963C12.0026 1.45004 11.8871 1.73946 11.6784 1.95555L7.62701 6.00692L11.6784 10.0583C11.8871 10.2744 12.0026 10.5638 12 10.8642C11.9973 11.1646 11.8768 11.452 11.6644 11.6644C11.452 11.8768 11.1646 11.9973 10.8642 12C10.5638 12.0026 10.2744 11.8871 10.0583 11.6784L6.00692 7.62701L1.95555 11.6784C1.73946 11.8871 1.45004 12.0026 1.14963 12C0.849216 11.9973 0.561848 11.8768 0.349417 11.6644C0.136985 11.452 0.0164882 11.1646 0.0138777 10.8642C0.0112672 10.5638 0.126752 10.2744 0.33546 10.0583L4.38683 6.00692L0.33546 1.95555C0.120665 1.74069 0 1.44932 0 1.1455C0 0.841693 0.120665 0.550319 0.33546 0.33546Z" fill="#6248FF" />
                                                    </svg>
                                                </span>
                                            </p>
                                        ))}
                                        <input
                                            type="text"
                                            name=""
                                            placeholder=""
                                            size={long}
                                            className='input_tag'
                                            onKeyDown={this.heandleAddTag}
                                            onChange={this.headleGetLong}
                                        />
                                    </div>
                                    <label className="label">輸入標籤</label>
                                </div>
                            </div>
                            {/* 檔案 */}
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
                            {/* 送出 */}
                            <div className="inputbox">
                                <input type="submit" value="送出" className="col-1 form_submit"></input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}