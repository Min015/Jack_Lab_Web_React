import { Component } from 'react';
import '../main_category/add.scss';
import Header from '../../../Components/Header/Header';
import upload from '../main_category/img/upload.png';
export default class AddProject extends Component {
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
                            <h2>新增專案紀錄</h2>
                        </div>
                        <form className="add_form">
                            <div className="inputbox">
                                <div className="set col-12">
                                    <input type="text" name="" id="" placeholder="專案名稱" required className="input" />
                                    <label for="" className="label">輸入專案名稱(必填)</label>
                                </div>
                            </div>
                            <div className="inputbox">
                                <div className="set col-12">
                                    <textarea name="" id="" rows="20" placeholder="內容描述" required className="input"></textarea>
                                    <label for="" className="label">輸入內容描述(必填)</label>
                                </div>
                            </div>
                            <div className="inputbox">
                                <div className="set col-12">
                                    <select name="group" required className="input">
                                        <option value="" disabled selected>指派小組</option>
                                        <option value="">2022</option>
                                        <option value="">2021</option>
                                        <option value="">2020</option>
                                        <option value="">2019</option>
                                        <option value="">2018</option>
                                        <option value="">2017</option>
                                    </select>
                                    <label for="" className="label">選擇指派小組(必填)</label>
                                </div>
                            </div>

                            <div className="inputbox">
                                <div className="set col-12">
                                    <select name="Tag" className="input">
                                        <option value="" disabled selected>標籤</option>
                                        <option value="">2022</option>
                                        <option value="">2021</option>
                                        <option value="">2020</option>
                                        <option value="">2019</option>
                                        <option value="">2018</option>
                                        <option value="">2017</option>
                                    </select>
                                    <label for="" className="label">選擇標籤</label>
                                </div>

                            </div>

                            <div className="inputbox">
                                <div className="upload">
                                    <input type="file" id="f" multiple="multiple" onChange={e => this.handleSelectFile(e.target.files)}/>
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
                                <input type="submit" value="送出" className="col-1 form_submit" />
                            </div>
                        </form>
                    </div>

                </div>
            </div>

        )
    }
}