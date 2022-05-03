import { Component } from 'react';
import '../main_category/add.scss';
import Header from '../../../Components/Header/Header';
import { GET_Members } from '../../../Service/meeting/Meeting';
import { POST_AddMeeting } from '../../../Service/fileupload/Sendform';

export default class AddMeeting extends Component {
    state = {
        array: [],//file
        participate: [],//已選擇
        long: 0,//一個tag的長度
        tag: [],//已輸入的tag
        Members: [],//所有人員名單
        drop: false,
        disabled: false,
        nowclass: "selectlist",
        all_file_max_size: 1024 * 1024 * 50,//50M
        one_file_max_size: 1024 * 1024 * 30,//30M
        mimes_type: ['zip', '7z', 'rar', 'svg', 'png', 'jpg', 'jpeg', 'csv', 'txt', 'xlx', 'xls', 'xlsx', 'pdf', 'doc', 'docx', 'ppt', 'pptx'],//媒體類型
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
            errormsg: "必填",
        },
        uploader: "jacklab",
    }


    //載入所有人員名單
    componentDidMount = async () => {
        try {
            const res = await GET_Members();
            this.setState({ Members: res.data.data });
        } catch (err) {
            console.log(err);
        }
    }
    //送出
    Submit = async () => {
        const { title, content, time, place, uploader, array, participate, tag, member } = this.state;
        const errormsg = "必填";
        if (title.errormsg !== errormsg && content.errormsg !== errormsg && time.errormsg !== errormsg && place.errormsg !== errormsg && member.errormsg !== errormsg) {
            const addmember = participate.map((item) => { return (item.account) });
            const data = new FormData();
            data.append('title', title.value);
            data.append('content', content.value);
            data.append('time', time.value);
            data.append('place', place.value);
            // data.append('uploader', uploader);
            array.map((item, index) =>
                data.append(`files[${index}]`, item)
            )
            addmember.map((item, index) =>
                data.append(`member[${index}]`, item)
            )
            tag.map((item, index) =>
                data.append(`tag[${index}]`, item)
            )
            try {
                const req = await POST_AddMeeting(data);
                console.log(req);
                window.location.replace('http://localhost:3000/meeting');
            } catch (err) {
                console.log(err);
            }
        }
        else {
            alert("您有必填欄位尚未填寫，請確認");
        }
    }

    //確定是否填寫
    handleInputChange(event) {
        const target = event.target;
        let { value, name } = target;
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
    }
    //選參與人
    handelOnClick = e => {
        let participate = this.state.participate;
        const account = e.id;
        const name = e.value;
        const obj = {
            account,
            name
        }
        if (e.checked === true) {
            if (!participate.find((item) => JSON.stringify(item) === JSON.stringify(obj))) {
                participate.push(obj);
                // console.log("加入");
            }
            this.setState({
                participate,
            })
        }
        else {
            let newarray = participate.filter((item) => item.account !== obj.account)
            // console.log("刪除");
            this.setState({
                participate: newarray,
            })
        }
        if (participate.length === 0) {
            this.setState({
                member: {
                    errormsg: "必填",
                },
            })
        }
        else {
            this.setState({
                member: {
                    errormsg: "",
                },
            })
        }
    }
    //選檔案
    handleSelectFile = (files) => {
        let nowsize = 0;
        const { all_file_max_size, one_file_max_size, mimes_type } = this.state;
        if (files.length > 5) {
            alert("一次請勿上傳超過五個檔案")
        }
        else {
            let array = [];
            for (let index = 0; index < files.length; index++) {
                const file_type = files[index].name.split(".").pop();
                if (!mimes_type.includes(file_type)) {
                    const media_type = mimes_type.map((item) => ` ${item}`);
                    alert(`上傳檔案類型錯誤,請選擇${media_type}類型的檔案`);
                }
                else {
                    const thissize = files[index].size;
                    nowsize += thissize;
                    if (thissize > one_file_max_size || nowsize > all_file_max_size) {
                        alert("檔案過大，請重新選擇(單個檔案勿超過30M，總大小物超過50M");
                    }
                    else {
                        array.push(files[index]);
                    }
                }
            }
            this.setState({
                array
            })
        }
    }
    //取得現在時間
    handleGetnow = () => {
        const dt = new Date();
        const hh = dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours();
        const mm = dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes();
        const today = new Date().toISOString().split("T");
        const ISO = today[0] + "T" + hh + ":" + mm;
        return (ISO);
    }
    //下拉式選人判斷
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
    //下拉式選人關閉
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
    //判斷標籤長度
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
    //新增標籤
    heandleAddTag = (e) => {
        const tag = this.state.tag;
        if (tag.length === 5) {
            e.target.value = "";
            this.setState({
                disabled: true,
            })
            alert("一次請勿輸入超過五個標籤");
        }
        else {
            this.setState({
                disabled: false,
            })
            if (e.keyCode === 32) {
                if (!tag.includes(e.target.value) && (e.target.value) !== "" && (e.target.value) !== " ") {
                    tag.push(e.target.value);
                }
                e.target.value = "";
            }
        }
    }
    //刪除標籤
    heandleDelTag = (e) => {
        const thistag = e.target.id;
        let tag = this.state.tag;
        this.setState({
            disabled: false,
        })
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
    }

    render() {
        const { array, title, content, time, member, tag, place, participate, nowclass, long, Members, disabled, mimes_type } = this.state;
        return (
            <div>
                <Header />
                <div className="content">
                    <div className="contentin">
                        <div className="add_title">
                            <h2>新增會議記錄</h2>
                        </div>
                        <div
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
                                                            onChange={(e) => { this.handelOnClick(e.target) }}
                                                        />
                                                        <span>
                                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M0.33546 0.33546C0.550319 0.120665 0.841693 0 1.1455 0C1.44932 0 1.74069 0.120665 1.95555 0.33546L6.00692 4.38683L10.0583 0.33546C10.2744 0.126752 10.5638 0.0112672 10.8642 0.0138777C11.1646 0.0164882 11.452 0.136985 11.6644 0.349417C11.8768 0.561848 11.9973 0.849216 12 1.14963C12.0026 1.45004 11.8871 1.73946 11.6784 1.95555L7.62701 6.00692L11.6784 10.0583C11.8871 10.2744 12.0026 10.5638 12 10.8642C11.9973 11.1646 11.8768 11.452 11.6644 11.6644C11.452 11.8768 11.1646 11.9973 10.8642 12C10.5638 12.0026 10.2744 11.8871 10.0583 11.6784L6.00692 7.62701L1.95555 11.6784C1.73946 11.8871 1.45004 12.0026 1.14963 12C0.849216 11.9973 0.561848 11.8768 0.349417 11.6644C0.136985 11.452 0.0164882 11.1646 0.0138777 10.8642C0.0112672 10.5638 0.126752 10.2744 0.33546 10.0583L4.38683 6.00692L0.33546 1.95555C0.120665 1.74069 0 1.44932 0 1.1455C0 0.841693 0.120665 0.550319 0.33546 0.33546Z" fill="#022840" />
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
                                                            onChange={(e) => { this.handelOnClick(e.target) }}
                                                        />
                                                        <label for={item.Account} className='choose'>{item.student.Name}</label>
                                                    </div>
                                                )
                                            }
                                            )}
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
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M0.33546 0.33546C0.550319 0.120665 0.841693 0 1.1455 0C1.44932 0 1.74069 0.120665 1.95555 0.33546L6.00692 4.38683L10.0583 0.33546C10.2744 0.126752 10.5638 0.0112672 10.8642 0.0138777C11.1646 0.0164882 11.452 0.136985 11.6644 0.349417C11.8768 0.561848 11.9973 0.849216 12 1.14963C12.0026 1.45004 11.8871 1.73946 11.6784 1.95555L7.62701 6.00692L11.6784 10.0583C11.8871 10.2744 12.0026 10.5638 12 10.8642C11.9973 11.1646 11.8768 11.452 11.6644 11.6644C11.452 11.8768 11.1646 11.9973 10.8642 12C10.5638 12.0026 10.2744 11.8871 10.0583 11.6784L6.00692 7.62701L1.95555 11.6784C1.73946 11.8871 1.45004 12.0026 1.14963 12C0.849216 11.9973 0.561848 11.8768 0.349417 11.6644C0.136985 11.452 0.0164882 11.1646 0.0138777 10.8642C0.0112672 10.5638 0.126752 10.2744 0.33546 10.0583L4.38683 6.00692L0.33546 1.95555C0.120665 1.74069 0 1.44932 0 1.1455C0 0.841693 0.120665 0.550319 0.33546 0.33546Z" fill="#022840" />
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
                                            disabled={disabled}
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
                                    <input
                                        type="file"
                                        id="f"
                                        multiple="multiple"
                                        onChange={e => this.handleSelectFile(e.target.files)}
                                    />
                                    <label for='f' className="newbtn">
                                        <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20 2H10L8 0H0V16H20V2ZM11 9V13H9V9H6L10.01 5L14 9H11Z" fill="white" />
                                        </svg>
                                        <label for='f'>請選擇檔案(不超過5)</label>
                                    </label>
                                </div>
                            </div>
                            <div id="filename">
                                <ol>
                                    {array.map(item => (<li>{item.name}</li>))}
                                </ol>
                            </div>
                            {/* 送出 */}
                            <div className="inputbox">
                                <button
                                    className="col-1 form_submit"
                                    onClick={this.Submit}
                                >
                                    送出
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}