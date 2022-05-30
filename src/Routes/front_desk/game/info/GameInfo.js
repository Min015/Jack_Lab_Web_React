import { Component } from 'react';
import MemberLayout from '../../../../Components/Layout/front/member/MemberLayout';
import Header from '../../../../Components/Header/front_end/Header';
import { Link } from 'react-router-dom';
import './gameInfo.scss'
export default class GameInfo extends Component {
    state = {
        Id: "1",
        data: [],
        drop: false,
    }
    handleMouseDown = (e) => {
        if (e.target.className === "window") {
            this.setState({
                drop: false,
            })
        }
    }
    drop_down = (e) => {
        if (e === 'drop') {
            this.setState({
                drop: !this.state.drop,
            })
        }
    }

    render() {
        const { data, drop } = this.state;
        return (
            <div id='game_info'>
                <MemberLayout>
                    <div className="add_title">
                        <div className="title_name">
                            <h2>
                                {/* {data.Title} */}
                                手影隨行
                            </h2>
                        </div>
                        <div className="edit_button">
                            <div className="add">
                                <div
                                    className='func_btn'
                                    onClick={() => this.drop_down('drop')}
                                >
                                    <svg width="15" height="19" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_450_27)">
                                            <path d="M1.07143 17.2188C1.07143 17.6912 1.24075 18.1442 1.54215 18.4783C1.84355 18.8123 2.25233 19 2.67857 19H12.3214C12.7477 19 13.1565 18.8123 13.4578 18.4783C13.7592 18.1442 13.9286 17.6912 13.9286 17.2188V4.75001H1.07143V17.2188ZM10.1786 7.71876C10.1786 7.56129 10.235 7.41026 10.3355 7.29891C10.4359 7.18756 10.5722 7.12501 10.7143 7.12501C10.8564 7.12501 10.9926 7.18756 11.0931 7.29891C11.1936 7.41026 11.25 7.56129 11.25 7.71876V16.0313C11.25 16.1887 11.1936 16.3398 11.0931 16.4511C10.9926 16.5625 10.8564 16.625 10.7143 16.625C10.5722 16.625 10.4359 16.5625 10.3355 16.4511C10.235 16.3398 10.1786 16.1887 10.1786 16.0313V7.71876ZM6.96429 7.71876C6.96429 7.56129 7.02073 7.41026 7.12119 7.29891C7.22166 7.18756 7.35792 7.12501 7.5 7.12501C7.64208 7.12501 7.77834 7.18756 7.87881 7.29891C7.97927 7.41026 8.03571 7.56129 8.03571 7.71876V16.0313C8.03571 16.1887 7.97927 16.3398 7.87881 16.4511C7.77834 16.5625 7.64208 16.625 7.5 16.625C7.35792 16.625 7.22166 16.5625 7.12119 16.4511C7.02073 16.3398 6.96429 16.1887 6.96429 16.0313V7.71876ZM3.75 7.71876C3.75 7.56129 3.80644 7.41026 3.90691 7.29891C4.00737 7.18756 4.14363 7.12501 4.28571 7.12501C4.42779 7.12501 4.56406 7.18756 4.66452 7.29891C4.76499 7.41026 4.82143 7.56129 4.82143 7.71876V16.0313C4.82143 16.1887 4.76499 16.3398 4.66452 16.4511C4.56406 16.5625 4.42779 16.625 4.28571 16.625C4.14363 16.625 4.00737 16.5625 3.90691 16.4511C3.80644 16.3398 3.75 16.1887 3.75 16.0313V7.71876ZM14.4643 1.18751H10.4464L10.1317 0.493561C10.065 0.345203 9.96233 0.220408 9.83515 0.133214C9.70798 0.04602 9.56137 -0.000112366 9.41183 6.50628e-06H5.58482C5.43562 -0.000629197 5.28927 0.0453312 5.16255 0.132622C5.03582 0.219913 4.93385 0.345003 4.8683 0.493561L4.55357 1.18751H0.535714C0.393634 1.18751 0.257373 1.25006 0.156907 1.36141C0.0564412 1.47276 0 1.62378 0 1.78126L0 2.96876C0 3.12623 0.0564412 3.27725 0.156907 3.3886C0.257373 3.49995 0.393634 3.56251 0.535714 3.56251H14.4643C14.6064 3.56251 14.7426 3.49995 14.8431 3.3886C14.9436 3.27725 15 3.12623 15 2.96876V1.78126C15 1.62378 14.9436 1.47276 14.8431 1.36141C14.7426 1.25006 14.6064 1.18751 14.4643 1.18751Z" fill="white" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_450_27">
                                                <rect width="15" height="19" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <p>刪除記錄</p>
                                </div>
                            </div>
                            <div className="add">
                                <Link to={``}>
                                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.5118 2.99361L16.0177 0.489257C15.33 -0.201275 14.1663 -0.156091 13.4205 0.594632C12.6747 1.34349 12.626 2.51381 13.3156 3.20432L15.8097 5.70867C16.4974 6.39921 17.661 6.35405 18.4087 5.60331C19.1545 4.85259 19.2014 3.68603 18.5118 2.99361ZM2.61215 11.4456L7.60035 16.4543L15.7066 8.31654L10.7184 3.30784L2.61215 11.4456ZM0 19L6.5791 17.6773L1.31732 12.3938L0 19Z" fill="white" />
                                    </svg>
                                    <p>修改記錄</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='game'>
                        <div className='right_block'>
                            <div className='r_block'>
                                <div className='title'>競賽類型</div>
                                <div className='info'>資訊應用服務創新大賽</div>
                            </div>
                            <div className='r_block'>
                                <div className='title'>參加組別</div>
                                <div className='info'>Azure雲端創新產業應用組</div>
                            </div>
                            <div className='r_block'>
                                <div className='title'>競賽時間</div>
                                <div className='info'>比賽日期</div>
                            </div>
                            <div className='r_block'>
                                <div className='title'>得獎名次</div>
                                <div className='info'>最佳創意</div>
                            </div>
                            <div className='r_block'>
                                <div className='title'>上傳者</div>
                                <div className='info'>王子瑜</div>
                            </div>
                        </div>
                        <div className='left_block'>
                            <div>
                                <div className='title'>參與人員</div>
                                <div className="participant something_content">
                                    {/* {data.member?.map((item, index) =>
                                            <span>{`${item.Name}　`}</span>
                                        )} */}
                                    沈舜鴻、柯宣竹、陳奕伶、王子瑜、江糖晴
                                </div>
                            </div>
                            <div className="magin_top_70">
                                <div className='title'>相關檔案</div>
                                <ol>
                                    {data.files?.map((item, index) => (
                                        <li
                                            key={index}
                                            onClick={(e) => this.Download(item.Name, e)}
                                        >
                                            {item.Name}
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </div>
                </MemberLayout>
                <div
                    className={drop ? "popup_background active" : "popup_background"}
                    onClick={this.handleMouseDown}
                >
                    <div className="window">
                        <div className="form">
                            <h1 className="title">
                                <div className="close">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M24 2.4L21.6 0L12 9.6L2.4 0L0 2.4L9.6 12L0 21.6L2.4 24L12 14.4L21.6 24L24 21.6L14.4 12L24 2.4Z" fill="#51718C" />
                                    </svg>
                                    <div className="close_btn" onClick={() => this.drop_down('drop')} />
                                </div>
                            </h1>

                            <h2 className='message'>
                                是否要刪除競賽紀錄紀錄「(競賽名稱){data.Title}」
                            </h2>
                            <div id='btn_block'>
                                <button
                                    className="submitBtn"
                                // onClick={(e) => this.Delete(this.state.Id, e)}
                                >
                                    確定
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}