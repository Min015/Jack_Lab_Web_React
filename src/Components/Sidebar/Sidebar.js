import { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './sidebar.scss';
export default class Sidebar extends Component {
    state = {

    }
    //生命週期

    //func


    render() {
        return (
            <div className="sidebar">
                <div className="set">
                    <div className="sidebar_title">
                        首頁
                    </div>
                    <ul>
                        <NavLink to='/AdminAlbum' className={(navData) => navData.isActive ? "nowPage" : ""} >
                            <li>
                                {/* <div className="svg">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z" fill="white" />
                                    </svg>
                                </div> */}
                                相簿
                            </li>
                        </NavLink>
                        <NavLink to='/Books' className={(navData) => navData.isActive ? "nowPage" : ""} >
                            <li>
                                {/* <div className="svg">
                                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.7996 3.1498H18.8996V19.9498H5.24961C3.50661 19.9498 2.09961 18.5428 2.09961 16.7998V4.1998C2.09961 2.4568 3.50661 1.0498 5.24961 1.0498H14.6996V15.7498H5.24961C4.67211 15.7498 4.19961 16.2223 4.19961 16.7998C4.19961 17.3773 4.67211 17.8498 5.24961 17.8498H16.7996V3.1498Z" fill="white" />
                                    </svg>
                                </div> */}
                                出版品
                            </li>
                        </NavLink>
                    </ul>
                </div>
                <div className="set">
                    <div className="sidebar_title">
                        研究室介紹
                    </div>
                    <ul>
                        <NavLink to='/TeacherIntroduce' className={(navData) => navData.isActive ? "nowPage" : ""} >
                            <li>
                                {/* <div className="svg">
                                    <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.15004 12.375C7.06788 12.375 6.98573 12.3873 6.90735 12.4133C6.46185 12.5613 5.99332 12.6562 5.50004 12.6562C5.00676 12.6562 4.53823 12.5613 4.09239 12.4133C4.01401 12.3873 3.9322 12.375 3.85005 12.375C1.71674 12.375 -0.0112882 14.1497 5.55319e-05 16.3343C0.00486802 17.2575 0.747022 18 1.65005 18H9.35003C10.2531 18 10.9952 17.2575 11 16.3343C11.0114 14.1497 9.28334 12.375 7.15004 12.375ZM5.50004 11.25C7.3226 11.25 8.80003 9.73898 8.80003 7.875C8.80003 6.01102 7.3226 4.5 5.50004 4.5C3.67748 4.5 2.20005 6.01102 2.20005 7.875C2.20005 9.73898 3.67748 11.25 5.50004 11.25ZM20.35 0H7.15004C6.24013 0 5.50004 0.782227 5.50004 1.7434V3.375C6.3051 3.375 7.05035 3.61336 7.70004 4.00078V2.25H19.8V12.375H17.6V10.125H13.2V12.375H10.5793C11.2358 12.9618 11.7178 13.7366 11.9436 14.625H20.35C21.2599 14.625 22 13.8428 22 12.8816V1.7434C22 0.782227 21.2599 0 20.35 0Z" fill="white" />
                                    </svg>
                                </div> */}
                                教師介紹
                            </li>
                        </NavLink>
                        <NavLink to='/LabIntroduce' className={(navData) => navData.isActive ? "nowPage" : ""} >
                            <li>
                                {/* <div className="svg">
                                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.04952 4.09521V7.31565C6.05022 7.37305 6.03959 7.43003 6.01823 7.48331C5.99688 7.5366 5.96523 7.58515 5.92508 7.62619C5.88494 7.66722 5.83709 7.69993 5.78428 7.72244C5.73148 7.74496 5.67475 7.75683 5.61734 7.75738C5.5006 7.75668 5.38887 7.70985 5.30652 7.6271C5.22416 7.54435 5.17787 7.4324 5.17773 7.31565V4.09521H4.3357V7.31565C4.3357 7.55896 4.14366 7.75632 3.903 7.75738C3.78626 7.75668 3.67453 7.70985 3.59217 7.6271C3.50982 7.54435 3.46353 7.4324 3.46339 7.31565V4.09521H2.6543V8.28226H6.84798V4.09521H6.04978H6.04952Z" fill="white" />
                                        <path d="M14.7226 0.112305H2.29532C1.07743 0.112305 0.0869141 1.10309 0.0869141 2.32098V14.7474C0.0869141 15.9656 1.07769 16.9561 2.29532 16.9561H14.7226C15.9402 16.9561 16.931 15.9656 16.931 14.7474V2.32098C16.931 1.10309 15.9405 0.112305 14.7226 0.112305V0.112305ZM2.22573 8.70926V3.66849H3.46221V2.6623H3.32913L3.32701 2.42112H4.45644L4.45777 2.6623H4.33452V3.66849H5.17655V2.6623H5.04348L5.04188 2.42112H6.17052L6.17238 2.6623H6.0486V3.66849H7.27393V8.70926H2.22573ZM6.85504 10.0865L9.94373 11.8707L9.63826 12.4004L6.54877 10.6162L6.85504 10.0865V10.0865ZM14.5287 14.6837H6.9334V13.4161H9.63162C11.4777 13.4161 12.9804 11.9143 12.9804 10.0682C12.9804 8.90104 12.3745 7.84651 11.4304 7.2446L9.8906 9.91148L9.57105 9.72687L9.11684 10.5129L8.31226 10.0483L8.76648 9.26282L8.44666 9.07821L12.1086 2.73482L12.3548 2.87693L12.7232 2.23916L13.6864 2.79538L13.319 3.43421L13.553 3.56915L12.0634 6.14757C13.3931 6.97233 14.2482 8.44071 14.2482 10.0687C14.2482 11.3902 13.6829 12.5741 12.7907 13.4167H14.5289V14.6842L14.5287 14.6837Z" fill="white" />
                                    </svg>
                                </div> */}
                                研究室簡介
                            </li>
                        </NavLink>
                    </ul>
                </div>
                <div className="set">
                    <div className="sidebar_title">
                        權限管理
                    </div>
                    <ul>
                        <NavLink to='/TeacherIntroduce' className={(navData) => navData.isActive ? "nowPage" : ""} >
                            <li>
                                角色列表
                            </li>
                        </NavLink>
                    </ul>
                </div>
                <div className="set">
                    <div className="sidebar_title">
                        成員管理
                    </div>
                    <ul>
                        <NavLink to='/TeacherIntroduce' className={(navData) => navData.isActive ? "nowPage" : ""} >
                            <li>
                                成員列表
                            </li>
                        </NavLink>
                    </ul>
                </div>
                <div className="set">
                    <div className="sidebar_title">
                        會議管理
                    </div>
                    <ul>
                        <NavLink to='/TeacherIntroduce' className={(navData) => navData.isActive ? "nowPage" : ""} >
                            <li>
                                會議列表
                            </li>
                        </NavLink>
                    </ul>
                </div>
                <div className="set">
                    <div className="sidebar_title">
                        競賽管理
                    </div>
                    <ul>
                        <NavLink to='/TeacherIntroduce' className={(navData) => navData.isActive ? "nowPage" : ""} >
                            <li>
                                競賽列表
                            </li>
                        </NavLink>
                        <NavLink to='/LabIntroduce' className={(navData) => navData.isActive ? "nowPage" : ""} >
                            <li>
                                分類管理
                            </li>
                        </NavLink>
                    </ul>
                </div>
                <div className="set">
                    <div className="sidebar_title">
                        專案管理
                    </div>
                    <ul>
                        <NavLink to='/TeacherIntroduce' className={(navData) => navData.isActive ? "nowPage" : ""} >
                            <li>
                                專案列表
                            </li>
                        </NavLink>
                        <NavLink to='/LabIntroduce' className={(navData) => navData.isActive ? "nowPage" : ""} >
                            <li>
                                小組列表
                            </li>
                        </NavLink>
                        <NavLink to='/LabIntroduce' className={(navData) => navData.isActive ? "nowPage" : ""} >
                            <li>
                                類型管理
                            </li>
                        </NavLink>
                        <NavLink to='/LabIntroduce' className={(navData) => navData.isActive ? "nowPage" : ""} >
                            <li>
                                分類管理
                            </li>
                        </NavLink>
                    </ul>
                </div>
                {/* <div className="set">
            <NavLink to='/PemissionManage' className={(navData) => navData.isActive ? "nowPage" : ""} >
            <div className="sidebar_title">
            權限管理
            </div>
            </NavLink>
            </div>
            <div className="set">
            <NavLink to='/Member' className={(navData) => navData.isActive ? "nowPage" : ""} >
            <div className="sidebar_title">
            成員管理
            </div>
            </NavLink>
            </div>
            <div className="set">
            <NavLink to='/MeetingManage' className={(navData) => navData.isActive ? "nowPage" : ""} >
            <div className="sidebar_title">
            會議管理
            </div>
            </NavLink>
            </div>
            <div className="set">
            <NavLink to='/GameManage' className={(navData) => navData.isActive ? "nowPage" : ""} >
            <div className="sidebar_title">
            競賽管理
            </div>
            </NavLink>
            </div>
            <div className="set">
            <div className="sidebar_title">
            專案管理
            </div>
            <ul>
            <NavLink to='/GroupManage' className={(navData) => navData.isActive ? "nowPage" : ""} >
            <li>
            <div className="svg">
            <svg width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_549_336)">
            <path d="M7.4375 8.5C9.78496 8.5 11.6875 6.59713 11.6875 4.25C11.6875 1.90287 9.78496 0 7.4375 0C5.09004 0 3.1875 1.90287 3.1875 4.25C3.1875 6.59713 5.09004 8.5 7.4375 8.5ZM9.1209 10.0938H5.7541C2.57557 10.0938 0 12.6703 0 15.8479C0 16.4854 0.515313 17 1.15082 17H13.7229C14.3604 17 14.875 16.4854 14.875 15.8479C14.875 12.6703 12.2984 10.0938 9.1209 10.0938ZM15.9076 10.625H13.4556C14.9813 11.8768 15.9375 13.7494 15.9375 15.8479C15.9375 16.2729 15.8113 16.6646 15.6055 17H20.1875C20.7752 17 21.25 16.5219 21.25 15.9076C21.25 13.0023 18.8727 10.625 15.9076 10.625ZM14.3438 8.5C16.399 8.5 18.0625 6.83652 18.0625 4.78125C18.0625 2.72598 16.399 1.0625 14.3438 1.0625C13.51 1.0625 12.7487 1.34655 12.1284 1.8099C12.5109 2.54436 12.75 3.3668 12.75 4.25C12.75 5.42938 12.3539 6.51246 11.7011 7.39467C12.3748 8.075 13.3078 8.5 14.3438 8.5Z" fill="#F8F8F8" />
            </g>
            <defs>
            <clipPath id="clip0_549_336">
            <rect width="21.25" height="17" fill="white" />
            </clipPath>
            </defs>
            </svg>
            </div>
            專題組管理
            </li>
            </NavLink>
            <NavLink to='/CaseMange' className={(navData) => navData.isActive ? "nowPage" : ""} >
            <li>
            <div className="svg">
            <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.1579 0H10.7368C11.2114 0 11.6666 0.188533 12.0022 0.524125C12.3378 0.859716 12.5263 1.31488 12.5263 1.78947V3.57895H16.1053C16.5799 3.57895 17.035 3.76748 17.3706 4.10307C17.7062 4.43866 17.8947 4.89382 17.8947 5.36842V15.2105C17.8947 15.6851 17.7062 16.1403 17.3706 16.4759C17.035 16.8115 16.5799 17 16.1053 17H1.78947C1.31488 17 0.859716 16.8115 0.524125 16.4759C0.188533 16.1403 0 15.6851 0 15.2105V5.36842C0 4.89382 0.188533 4.43866 0.524125 4.10307C0.859716 3.76748 1.31488 3.57895 1.78947 3.57895H5.36842V1.78947C5.36842 1.31488 5.55695 0.859716 5.89255 0.524125C6.22814 0.188533 6.6833 0 7.1579 0ZM10.7368 3.57895V1.78947H7.1579V3.57895H10.7368ZM7.60526 13.8684L13.5016 7.9721L12.24 6.71053L7.60526 11.3363L5.73526 9.47526L4.47368 10.7368L7.60526 13.8684Z" fill="white" />
            </svg>
            </div>
            專案管理
            </li>
            </NavLink>
            </ul>
        </div> */}
            </div>
        )
    }
}