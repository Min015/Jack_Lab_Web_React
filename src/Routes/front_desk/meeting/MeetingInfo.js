import { Component } from 'react';
import '../main_category/meetingInfo.scss';
import Header from '../../../Components/Header/Header';
import { GET_MeetingInfo, GET_download } from '../../../Service/meeting/Meeting.js';
import { useParams, useLocation, } from 'react-router-dom';
export default class MeetingInfo extends Component {
    state = {
        Id: "1",
        data: [],
    }
    //生命週期
    componentDidMount = async () => {
        // console.log(this.props);
        const id = this.state.Id;
        try {
            const res = await GET_MeetingInfo(id);
            this.setState({ data: res.data.data });
            // console.log(this.state.data);
        } catch (err) {
            console.log(err);
        }
    }

    //func
    Download = async (filename) => {
        try {
            const res = await GET_download(filename);
            const url=res.config.url;
            console.log(url);
            return(url);
        } catch (err) {
            console.log(err);
        }
    }
    render() {
        const { data } = this.state;
        const dt =data.Time?.split(" ");
        dt?.map((item, index) => (console.log(item, index)))
        console.log(dt);
        return (
            <div>
                <Header />
                <div className="content">
                    <div className="contentin">
                        <div className="add_title">
                            <div className="title_name">
                                <h2>{data.Title}</h2>
                                {data.tag?.map((item, index) => {
                                    return (
                                        <div key={index} className="tag">
                                            <div className="small_tag">
                                                <p>#{item.Name}</p>
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>
                            <div className="edit_button">
                                <div className="add">
                                    <a href="#">
                                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M18.5118 2.99361L16.0177 0.489257C15.33 -0.201275 14.1663 -0.156091 13.4205 0.594632C12.6747 1.34349 12.626 2.51381 13.3156 3.20432L15.8097 5.70867C16.4974 6.39921 17.661 6.35405 18.4087 5.60331C19.1545 4.85259 19.2014 3.68603 18.5118 2.99361ZM2.61215 11.4456L7.60035 16.4543L15.7066 8.31654L10.7184 3.30784L2.61215 11.4456ZM0 19L6.5791 17.6773L1.31732 12.3938L0 19Z" fill="white" />
                                        </svg>
                                        <p>修改記錄</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="meeting">
                            <div className="col-5 something_content meeting_content">
                                {data.Content}
                            </div>
                            <div className="col-6 meeting_info">
                                <div className="else_info">
                                    <div className="col-3">
                                        <p>時間</p>
                                        <div className="info_block_content">
                                            {data.Time}
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <p>地點</p>
                                        <div className="info_block_content">
                                            {data.Place}
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <p>紀錄者</p>
                                        <div className="info_block_content">
                                            {data.uploader?.Name}
                                        </div>
                                    </div>
                                </div>
                                <div className="magin_top_70">
                                    <p>參與人員</p>
                                    <div className="participant something_content">
                                        {data.member?.map((item, index) =>
                                            <span>{`${item.Name}　`}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="magin_top_70">
                                    <p>相關檔案</p>
                                    <ol>
                                        {data.files?.map((item, index) => (
                                            <li
                                                key={index}
                                                onClick={this.Download(item.Name)}
                                            >
                                                {/* `http://localhost/${this.Download(item.Name)` */}
                                                <a href={`http://localhost/${this.Download(item.Name).then()}`}>
                                                {item.Name}
                                                </a>
                                                
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}