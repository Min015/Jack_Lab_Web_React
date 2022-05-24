import { Component } from 'react';
import GuestHeader from '../../../Components/Header/front_end/GuestHeader';
import Carousel from './Carousel';
import CreateTable from './CreateTable';
import Booklist from './BooksList';
import '../style/guestmain.scss';
import book1 from './img/book1.jpg';
import book2 from './img/book2.jpg';
import book3 from './img/book3.jpg';
export default class Index extends Component {
    state = {
        table_header: [
            "年分",
            "類型",
            "參加組別",
            "項目名稱",
            "參加人員",
            "得獎名次",
        ],
        object: [
            {
                g_year: 2021,
                g_type: "資訊應用服務創新大賽",
                g_group: "Azure雲端創新產業應用組",
                g_name: "手影隨行",
                g_participants: "沈舜鴻、柯宣竹、陳奕伶、王子瑜、江糖晴",
                g_position: "最佳創意",
            },
            {
                g_year: 2021,
                g_type: "資訊應用服務創新大賽",
                g_group: "教育資料開放組",
                g_name: "讀癮",
                g_participants: "",
                g_position: "佳作",
            },
        ],
        imgs: [
            './img/img1.jpg',
            './img/img2.jpg',
            './img/img3.jpg',
        ],
        books: [
            {
                book_id:'b01',
                book_photo:{book1},
                book_title:'秒懂行動網頁設計Visual Studio Code+GitHub+Bootstrap5+CSS3+HTML5+Web App專案實作',
                book_author:'姜琇森 朱珮儀 章家源 董子瑜 蕭國倫 陳璟誼',
            },
            {
                book_id:'b02',
                book_photo:{book2},
                book_title:'一次就懂 ASP.NET MVC 5.x 網站開發：Web應用的經典實務範例解析(Visual C# )',
                book_author:'吳玟憲 姜琇森 楊鎧睿 蕭國倫 黃子銘 黃煒凱',
            },
            {
                book_id:'b03',
                book_photo:{book3},
                book_title:'原來跨平台開發可以這麼簡單：React Native全攻略(附範例光碟)',
                book_author:'姜琇森 蕭國倫 許瑋芩 黃子銘 楊鎧睿 黃煒凱 周冠瑜',
            },
        ],
    }

    //生命週期

    //func

    //渲染
    render() {

        const { object, table_header,books } = this.state;
        return (
            <div>
                <GuestHeader />
                <div className="content">
                    <Carousel/>
                    <div className="contentin">
                        <div id='GuestIndex'>
                            {/* <div className='block'>
                                <div className='index_title'>榮譽榜</div>
                                <div className="works_area">
                                    <form action="">
                                        <div className="select_list">
                                            <select name="year" required className="select">
                                                <option value="" defaultValue="選擇年分(必填)">選擇年分(必填)</option>
                                                <option value="">2022</option>
                                                <option value="">2021</option>
                                                <option value="">2020</option>
                                                <option value="">2019</option>
                                                <option value="">2018</option>
                                                <option value="">2017</option>
                                            </select>
                                        </div>
                                        <div className="search_add">
                                            <input type="search" placeholder="輸入搜尋值" className="search" />
                                            <input type="submit" value="送出" className="submit" />
                                        </div>
                                    </form>
                                </div>
                                <div className="reaults_area">
                                    <CreateTable table_header={table_header} table_content={object} />
                                </div>
                            </div> */}
                            <div className='block'>
                                <div className='index_title'>出版品</div>
                                <Booklist books={books}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}