import { Component } from 'react';
import '../main_category/add.scss';
import Header from '../../../Components/Header/Header';
import upload from '../main_category/img/upload.png';
export default class AddProject extends Component {
    state = {

    }
    //生命週期

    //func


    render() {

        return (
            <div>
                <Header />
                <div class="content">
                    <div class="contentin">
                        <div class="add_title">
                            <h2>新增專案紀錄</h2>
                        </div>
                        <form class="add_form">
                            <div class="inputbox">
                                <div class="set col-12">
                                    <input type="text" name="" id="" placeholder="專案名稱" required class="input" />
                                    <label for="" class="label">輸入專案名稱(必填)</label>
                                </div>
                            </div>
                            <div class="inputbox">
                                <div class="set col-12">
                                    <textarea name="" id="" rows="20" placeholder="內容描述" required class="input"></textarea>
                                    <label for="" class="label">輸入內容描述(必填)</label>
                                </div>
                            </div>
                            <div class="inputbox">
                                <div class="set col-12">
                                    <select name="group" required class="input">
                                        <option value="" disabled selected>指派小組</option>
                                        <option value="">2022</option>
                                        <option value="">2021</option>
                                        <option value="">2020</option>
                                        <option value="">2019</option>
                                        <option value="">2018</option>
                                        <option value="">2017</option>
                                    </select>
                                    <label for="" class="label">選擇指派小組(必填)</label>
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
                                    <input type="file" id="f" multiple="multiple" onchange="selectFile(this.files)" />
                                    <div class="newbtn">
                                        <img src={upload} />
                                        <label for="f">請選擇檔案(不超過5)</label>
                                    </div>
                                </div>
                            </div>
                            <div id="filename"></div>
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