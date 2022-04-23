import { Component } from 'react';
import '../main_category/add.scss';
import Header from '../../../Components/Header/Header';
import upload from '../main_category/img/upload.png';
export default class AddProject extends Component {
    state = {
        array: [],
    }

    render() {
        return (
            <div>
                <Header />
                <div className="content">
                    <div className="contentin">
                        <div className="add_title">
                            <h2>新增專案</h2>
                        </div>
                        <form className="add_form">
                            <div className="inputbox">
                                <div className="set col-4">
                                    <select name="" required className="input">
                                        <option value="">專案類型</option>
                                        <option value="">2022</option>
                                        <option value="">2021</option>
                                        <option value="">2020</option>
                                        <option value="">2019</option>
                                        <option value="">2018</option>
                                        <option value="">2017</option>
                                    </select>
                                    <label for="" className="label">選擇專案類型(必填)</label>
                                </div>
                                <div className="set col-4">
                                    <select name="" required className="input">
                                        <option value="">專案分類</option>
                                        <option value="">2022</option>
                                        <option value="">2021</option>
                                        <option value="">2020</option>
                                        <option value="">2019</option>
                                        <option value="">2018</option>
                                        <option value="">2017</option>
                                    </select>
                                    <label for="" className="label">選擇專案分類(必填)</label>
                                </div>
                            </div>
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
                                        <option value="">指派小組(必填)</option>
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
                                    <input type="text" name="" id="" placeholder="標籤"  className="input" />
                                    <label for="" className="label">輸入標籤</label>
                                </div>
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