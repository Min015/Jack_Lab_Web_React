import React, { Component } from 'react';
import MemberLayout from '../../../Components/Layout/front/member/MemberLayout';
import '../main_category/add.scss';
export default class UpdateGame extends Component {
    state = {
        array: [],
        game_type: ["資訊應用服務創新大賽", "黑克松"],
        game_rank: ["第一名", "第二名", "第三名", "佳作", "NO"]
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

    render() {
        const { array, game_type, game_rank } = this.state;
        return (
            <div>
                <MemberLayout>
                    <div className="add_title">
                        <h2>新增競賽記錄</h2>
                    </div>
                    <form className="add_form" >
                        <div className="inputbox">
                            <div className="set col-4">
                                <select name="" required className="input">
                                    {game_type.map((item) => {
                                        return (
                                            <option value={item}>{item}</option>
                                        )
                                    })}
                                </select>
                                <label htmlFor="" className="label">選擇競賽類型(必填)</label>
                            </div>
                            <div className="set col-4">
                                <input type="text" name="" id="" placeholder="項目名稱" required maxLength="50" className="input" />
                                <label htmlFor="" className="label">輸入項目名稱(必填)</label>
                            </div>
                        </div>
                        <div className="inputbox">
                            <div className="set col-4">
                                <input type="text" name="" id="" placeholder="參加組別" maxLength="100" className="input" />
                                <label htmlFor="" className="label">輸入參加組別</label>
                            </div>
                            <div className="set col-4">
                                <select name="" required className="input" >
                                    {game_rank.map((item) => {
                                        return (
                                            <option value={item}>{item}</option>
                                        )
                                    })}
                                </select>
                                <label htmlFor="" className="label">選擇得獎名次(必填)</label>
                            </div>
                        </div>
                        <div className="inputbox">
                            <div className="set col-4">
                                <input type="date" className="input" required />
                                <label htmlFor="" className="label">選擇競賽時間(必填)</label>
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
                                <label htmlFor="" className="label">選擇參與人員(必填)</label>
                            </div>
                        </div>

                        <div className="inputbox">
                            <div className="upload">
                                <input type="file" id="f" multiple="multiple" onChange={e => this.handleSelectFile(e.target.files)} />
                                <label htmlFor='f' className="newbtn">
                                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 2H10L8 0H0V16H20V2ZM11 9V13H9V9H6L10.01 5L14 9H11Z" fill="white" />
                                    </svg>
                                    <label htmlFor='f'>請選擇檔案(不超過5)</label>
                                </label>
                            </div>

                        </div>
                        <div id="filename">
                            <ol>
                                {array.map(item => (<li>{item}</li>))}
                            </ol>
                        </div>
                        <div className="inputbox">
                            <input type="submit" value="送出" className="col-1 form_submit" formnovalidate="formnovalidate" />
                        </div>
                    </form>
                </MemberLayout>
            </div>

        )
    }
}