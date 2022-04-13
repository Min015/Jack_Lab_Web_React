import { Component } from 'react';
import '../main_category/add.scss';
import Header from '../../../Components/Header/Header';
import upload from '../main_category/img/upload.png';
export default class AddMeeting extends Component {
    state = {
        array:[],
    }
    //func
    handleSelectFile = (files) => {
        if (files.length > 5) {
            alert("一次請勿上傳超過五個檔案")
        }
        else {
            let array=[] 
            for (let item = 0; item < files.length; item++) {
                array.push(files[item].name); 
            }
            this.setState({
                array
            })
        }
    }


    render() {
        const{array}=this.state;
        return (
            <div>
                <Header />
                <div class="content">
                    <div class="contentin">
                        <div class="add_title">
                            <h2>新增會議記錄</h2>
                        </div>
                        <form class="add_form">
                            <div class="inputbox">
                                <div class="set col-12">
                                    <input type="text" name="" id="" placeholder="會議主題" required class="input" />
                                    <label for="" class="label">輸入會議主題(必填)</label>
                                </div>
                            </div>
                            <div class="inputbox">
                                <div class="set col-12">
                                    <textarea name="" id="" placeholder="會議內容" rows="20" required class="input"></textarea>
                                    <label for="" class="label">輸入會議內容(必填)</label>
                                </div>
                            </div>
                            <div class="inputbox">
                                <div class="set col-4">
                                    <input type="datetime-local" name="" id="" required class="input" />
                                    <label for="" class="label">輸入會議時間(必填)</label>
                                </div>
                                <div class="set col-4">
                                    <input type="text" name="" id="" placeholder="會議地點" required class="input" />
                                    <label for="" class="label">輸入會議地點(必填)</label>
                                </div>
                            </div>
                            <div class="inputbox">
                                <div class="set col-12">
                                    <select name="group" required class="input">
                                        <option value="" disabled selected>參與人員</option>
                                        <option value="">2022</option>
                                        <option value="">2021</option>
                                        <option value="">2020</option>
                                        <option value="">2019</option>
                                        <option value="">2018</option>
                                        <option value="">2017</option>
                                    </select>
                                    <label for="" class="label">選擇參與人員(必填)</label>
                                </div>
                            </div>

                            <div class="inputbox">
                                <div class="set col-12">
                                    <select name="Tag" class="input">
                                        <option value="" disabled selected>標籤</option>
                                        <option value="">2022</option>
                                        <option value="">2021</option>
                                        <option value="">2020</option>
                                        <option value="">2019</option>
                                        <option value="">2018</option>
                                        <option value="">2017</option>
                                    </select>
                                    <label for="" class="label">選擇標籤</label>
                                </div>

                            </div>
                            <div class="inputbox">
                                <div class="upload">
                                    <input type="file" id="f" multiple="multiple" onChange={e => this.handleSelectFile(e.target.files)} />
                                    <div class="newbtn">
                                        <img src={upload} />
                                        <label for="f">請選擇檔案(不超過5)</label>
                                    </div>
                                </div>
                            </div>
                            <div id="filename">
                                <ol>
                                    {array.map(item=>(<li>{item}</li>))}
                                </ol>
                            </div>
                            <div class="inputbox">
                                <input type="submit" value="送出" class="col-1 form_submit" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}