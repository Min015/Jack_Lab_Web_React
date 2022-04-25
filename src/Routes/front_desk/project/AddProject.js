import { Component } from 'react';
import '../main_category/add.scss';
import Header from '../../../Components/Header/Header';
import upload from '../main_category/img/upload.png';
export default class AddProject extends Component {
    state = {
        proj_type: ["大專生國科會計畫", "大專", "小專"],
        proj_class: ["選擇分類"],
        proj_group: ["五專一", "二技1", "二技2", "大學1", "大學2"],

    }

    render() {
        const { proj_type, proj_class,proj_group } = this.state;
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
                                        {proj_type.map((item) => {
                                            return (
                                                <option value={item}>{item}</option>
                                            )
                                        })}
                                    </select>
                                    <label for="" className="label">選擇專案類型(必填)</label>
                                </div>
                                <div className="set col-4">
                                    <select name="" className="input">
                                        {proj_class.map((item) => {
                                            return (
                                                <option value={item}>{item}</option>
                                            )
                                        })}
                                    </select>
                                    <label for="" className="label">選擇專案分類</label>
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
                                        {proj_group.map((item) => {
                                            return (
                                                <option value={item}>{item}</option>
                                            )
                                        })}
                                    </select>
                                    <label for="" className="label">選擇指派小組(必填)</label>
                                </div>
                            </div>
                            <div className="inputbox">
                                <div className="set col-12">
                                    <input type="text" name="" id="" placeholder="標籤" className="input" />
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