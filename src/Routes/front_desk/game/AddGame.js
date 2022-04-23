import { Component } from 'react';
import '../main_category/add.scss';
import Header from '../../../Components/Header/Header';
import upload from '../main_category/img/upload.png';
export default class AddGame extends Component {
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
                <div className="content">
                    <div className="contentin">
                        <div className="add_title">
                            <h2>新增競賽記錄</h2>
                        </div>
                        <form className="add_form" >
                            <div className="inputbox">
                                <div className="set col-4">
                                    <select name="" required className="input">
                                        <option value="" disabled selected>競賽類型</option>
                                        <option value="">2022</option>
                                        <option value="">2021</option>
                                        <option value="">2020</option>
                                        <option value="">2019</option>
                                        <option value="">2018</option>
                                        <option value="">2017</option>
                                    </select>
                                    <label for="" className="label">選擇競賽類型(必填)</label>
                                </div>
                                <div className="set col-4">
                                    <input type="text" name="" id="" placeholder="項目名稱" required className="input" />
                                    <label for="" className="label">輸入項目名稱(必填)</label>
                                </div>
                            </div>
                            <div className="inputbox">
                                <div className="set col-4">
                                    <input type="text" name="" id="" placeholder="參加組別" className="input" />
                                    <label for="" className="label">輸入參加組別</label>
                                </div>
                                <div className="set col-4">
                                    <select name="" required className="input" >
                                        <option value="" disabled selected>得獎名次</option>
                                        <option value="">第一名</option>
                                        <option value="">第二名</option>
                                        <option value="">第三名</option>
                                        <option value="">佳作</option>
                                        <option value="">NO</option>
                                    </select>
                                    <label for="" className="label">選擇得獎名次(必填)</label>
                                </div>
                            </div>
                            <div className="inputbox">
                                <div className="set col-12">
                                    <textarea name="contnet" id="" rows="20" placeholder="內容描述" required className="input"></textarea>
                                    <label for="" className="label">輸入內容描述(必填)</label>
                                </div>
                            </div>
                            <div className="inputbox">
                                <div className="set col-4">
                                    <input type="date" className="input" />
                                    <label for="" className="label">選擇競賽時間(必填)</label>
                                </div>
                            </div>
                            <div className="inputbox">
                                <div className="set col-12">
                                    <select name="" className="input">
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
                                <div className="upload">
                                    <input type="file" id="f" multiple="multiple" onChange={e => this.handleSelectFile(e.target.files)} />
                                    <div className="newbtn">
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
                            <div className="inputbox">
                                <input type="submit" value="送出" className="col-1 form_submit" formnovalidate="formnovalidate"/>
                            </div>
                        </form>
                    </div>

                </div>
            </div>

        )
    }
}