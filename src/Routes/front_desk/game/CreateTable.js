import { Component } from 'react';
import '../main_category/category.scss';
import Header from '../../../Components/Header/Header';
import { Link } from 'react-router-dom';
export default class CreateTable extends Component {
    state = {
        style:'',
    }
    //生命週期
    //func
    handleSetStyle=(i)=>{
        if(i%2===0){
            this.setState({
                style:"tr_odd"
            })
        }
        else{
            this.setState({
                style:"tr_even"
            })
        }
    }
    handleGetTable = (obj) => {
        // let array=[] 
        console.log(obj);
        obj.map((item) =>(
            <tr className="">
                <td>{item.year}</td>
                <td>{item.Gtype}</td>
                <td>{item.Ggroup}</td>
                <td>{item.Gname}</td>
                <td>{item.participants}</td>
                <td>{item.Position}</td>
                <td>{item.file}</td>
                <td>{item.Uploader}</td>
            </tr>
        )
            
        );
    }
    render() {
        const { game } = this.props;
        this.handleGetTable(game);
        const content = this.props.game.map((item) =>
            <tr>
                <td>{item.year}</td>
                <td>{item.Gtype}</td>
                <td>{item.Ggroup}</td>
                <td>{item.Gname}</td>
                <td>{item.participants}</td>
                <td>{item.Position}</td>
                <td>{item.file}</td>
                <td>{item.Uploader}</td>
            </tr>);
        // console.log(game);
        // this.handleGetTable(game);
        return (

            <table>
                <tr>
                    <th>年分</th>
                    <th>類型</th>
                    <th>參加組別</th>
                    <th>項目名稱</th>
                    <th>參加人員</th>
                    <th>得獎名次</th>
                    <th>相關檔案</th>
                    <th>上傳者</th>
                </tr>
                <tr class="tr_odd">
                    <td>2021</td>
                    <td>資訊應用服務創新大賽</td>
                    <td>Azure 雲端創新產業應用組</td>
                    <td>手影隨行</td>
                    <td>沈舜鴻、柯宣竹、陳奕伶、王子瑜、江糖晴</td>
                    <td>最佳創意</td>
                    <td></td>
                    <td>王子瑜</td>
                </tr>
                <tr class="tr_even">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                {content}
            </table >

        )
    }
}