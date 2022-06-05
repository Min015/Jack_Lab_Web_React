import React, { Component } from 'react';
import AdminHeader from '../../Header/back_end/AdminHeader';
import { Link, NavLink } from 'react-router-dom';
import Sidebar from '../../Sidebar/Sidebar';
import './backlayout.scss';
import logo from '../img/logo.png';
import menu from '../img/menu.png';
export default class BackLayout extends Component {
    state = {
        sidebarclick: false,
        logout: false,
        show: {
            sidebar: {
                "display": "block",
                "width": "250px",
            },
            content_in: {
                "width": "calc(100% - 250px)",
            }
        },
        hide: {
            sidebar: {
                "display": "none",
            },
            content_in: {
                "width": "100%",
            }
        },
    }
    LOGOUT = () => {
        localStorage.clear();
        window.location.replace('http://localhost:3000/index');
    }
    drop_down = (e) => {
        if (e === 'logout') {
            this.setState({
                logout: !this.state.logout,
            })
        }
        else if (e === 'sidebarclick') {
            this.setState({
                sidebarclick: !this.state.sidebarclick,
            })
        }
    }
    handleMouseDown = (e) => {
        if (e.target.className === "window") {
            this.setState({
                logout: false,
            })
        }
    }
    render() {
        const { children } = this.props;
        const { logout, sidebarclick,show,hide } = this.state;
        console.log(sidebarclick);
        return (
            <div>
                {/* <AdminHeader/> */}
                <div>
                    <header id="admin_header">
                        <div className='header_left'>
                            <div className='menu' onClick={() => this.drop_down('sidebarclick')}><img src={menu} alt="menu" /></div>
                            <Link to='/index' className="logo">
                                <img src={logo} alt="logo" />
                            </Link>
                        </div>
                        <nav>
                            <div className="logout">
                                <p>
                                    <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.5 2.25C7.28999 2.25 2.25 7.28999 2.25 13.5C2.25 19.71 7.28999 24.75 13.5 24.75C19.71 24.75 24.75 19.71 24.75 13.5C24.75 7.28999 19.71 2.25 13.5 2.25ZM13.5 5.625C15.3675 5.625 16.875 7.13249 16.875 8.99999C16.875 10.8675 15.3675 12.375 13.5 12.375C11.6325 12.375 10.125 10.8675 10.125 8.99999C10.125 7.13249 11.6325 5.625 13.5 5.625ZM13.5 21.6C12.1633 21.6 10.8474 21.2692 9.66968 20.6371C8.49191 20.0051 7.48887 19.0914 6.74999 17.9775C6.78374 15.7387 11.25 14.5125 13.5 14.5125C15.7387 14.5125 20.2162 15.7387 20.25 17.9775C19.5111 19.0914 18.5081 20.0051 17.3303 20.6371C16.1525 21.2692 14.8366 21.6 13.5 21.6Z" fill="white" />
                                    </svg>
                                    Admin
                                </p>
                            </div>
                            <div className="logout">
                                <p onClick={() => this.drop_down('logout')}>
                                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.6943 2.55566H4.47211C4.13323 2.55566 3.80822 2.69029 3.56859 2.92992C3.32896 3.16955 3.19434 3.49455 3.19434 3.83344V19.1668C3.19434 19.5057 3.32896 19.8307 3.56859 20.0703C3.80822 20.3099 4.13323 20.4446 4.47211 20.4446H14.6943C15.0332 20.4446 15.3582 20.3099 15.5979 20.0703C15.8375 19.8307 15.9721 19.5057 15.9721 19.1668V15.3334H9.98572C9.81628 15.3334 9.65378 15.2661 9.53396 15.1463C9.41415 15.0265 9.34683 14.864 9.34683 14.6946C9.34683 14.5251 9.41415 14.3626 9.53396 14.2428C9.65378 14.123 9.81628 14.0557 9.98572 14.0557H15.9721V3.83344C15.9721 3.49455 15.8375 3.16955 15.5979 2.92992C15.3582 2.69029 15.0332 2.55566 14.6943 2.55566V2.55566Z" fill="white" />
                                        <path d="M17.9915 11.0399C17.8693 10.9352 17.7121 10.8805 17.5513 10.8867C17.3905 10.8929 17.238 10.9596 17.1242 11.0734C17.0104 11.1871 16.9438 11.3397 16.9376 11.5005C16.9314 11.6613 16.986 11.8185 17.0907 11.9407L19.2502 14.0554H15.9727V15.3332H19.2502L17.0907 17.5437C17.0238 17.601 16.9695 17.6715 16.9312 17.7508C16.8928 17.83 16.8713 17.9164 16.8679 18.0043C16.8645 18.0923 16.8793 18.1801 16.9114 18.2621C16.9435 18.344 16.9923 18.4185 17.0545 18.4808C17.1168 18.543 17.1912 18.5918 17.2732 18.6239C17.3552 18.656 17.443 18.6708 17.5309 18.6674C17.6189 18.664 17.7053 18.6425 17.7845 18.6041C17.8638 18.5658 17.9343 18.5115 17.9915 18.4446L21.7227 14.739L17.9915 11.0399Z" fill="white" />
                                    </svg>
                                    登出
                                </p>
                            </div>
                        </nav>
                        <div
                            className={logout ? "popup_background active" : "popup_background"}
                            onClick={this.handleMouseDown}
                        >
                            <div className="window">
                                <div className="prompt">
                                    <h1 className="title">
                                        <div className="close">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M24 2.4L21.6 0L12 9.6L2.4 0L0 2.4L9.6 12L0 21.6L2.4 24L12 14.4L21.6 24L24 21.6L14.4 12L24 2.4Z" fill="#51718C" />
                                            </svg>
                                            <div className="close_btn" onClick={() => this.drop_down('logout')} />
                                        </div>
                                    </h1>
                                    <h2 className='message'>
                                        是否要登出
                                    </h2>
                                    <div className='btn_block'>
                                        <button
                                            className="submitBtn"
                                            onClick={this.LOGOUT}
                                        >
                                            確定
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                </div>
                <div className="content">
                    {/* <Sidebar /> */}
                    <div style={sidebarclick===true?(show.sidebar):(hide.sidebar)} className="sidebar">
                        <div className="set">
                            <div className="sidebar_title">
                                首頁
                            </div>
                            <ul>
                                <NavLink to='/adminalbum' activeClassName="nowPage">
                                    <li>
                                        <div className="svg">
                                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17 15.1111V1.88889C17 0.85 16.15 0 15.1111 0H1.88889C0.85 0 0 0.85 0 1.88889V15.1111C0 16.15 0.85 17 1.88889 17H15.1111C16.15 17 17 16.15 17 15.1111ZM5.19444 9.91667L7.55556 12.7594L10.8611 8.5L15.1111 14.1667H1.88889L5.19444 9.91667Z" fill="white" />
                                            </svg>
                                        </div>
                                        輪播圖
                                    </li>
                                </NavLink>
                                <NavLink to='/books' activeClassName="nowPage">
                                    <li>
                                        <div className="svg">
                                            <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M14.9746 2.1748H17.0996V19.1748H3.28711C1.52336 19.1748 0.0996094 17.7511 0.0996094 15.9873V3.23731C0.0996094 1.47355 1.52336 0.0498047 3.28711 0.0498047H12.8496V14.9248H3.28711C2.70273 14.9248 2.22461 15.4029 2.22461 15.9873C2.22461 16.5717 2.70273 17.0498 3.28711 17.0498H14.9746V2.1748Z" fill="white" />
                                            </svg>
                                        </div>
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
                                <NavLink to='/teacherintroduce' activeClassName="nowPage">
                                    <li>
                                        <div className="svg">
                                            <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5.52503 9.5625C5.46154 9.5625 5.39806 9.57201 5.3375 9.59211C4.99325 9.70648 4.6312 9.77983 4.25003 9.77983C3.86886 9.77983 3.50682 9.70648 3.1623 9.59211C3.10174 9.57201 3.03852 9.5625 2.97504 9.5625C1.32657 9.5625 -0.00872269 10.9338 4.29111e-05 12.622C0.00376165 13.3353 0.577245 13.9091 1.27504 13.9091H7.22503C7.92282 13.9091 8.4963 13.3353 8.50002 12.622C8.50879 10.9338 7.17349 9.5625 5.52503 9.5625ZM4.25003 8.69318C5.65837 8.69318 6.80003 7.52558 6.80003 6.08523C6.80003 4.64488 5.65837 3.47727 4.25003 3.47727C2.84169 3.47727 1.70004 4.64488 1.70004 6.08523C1.70004 7.52558 2.84169 8.69318 4.25003 8.69318ZM15.725 0H5.52503C4.82192 0 4.25003 0.604448 4.25003 1.34717V2.60795C4.87212 2.60795 5.448 2.79214 5.95003 3.09151V1.73864H15.3V9.5625H13.6V7.82386H10.2V9.5625H8.1749C8.68224 10.0159 9.05465 10.6146 9.22916 11.3011H15.725C16.4281 11.3011 17 10.6967 17 9.95397V1.34717C17 0.604448 16.4281 0 15.725 0Z" fill="white" />
                                            </svg>
                                        </div>
                                        教師介紹
                                    </li>
                                </NavLink>
                                <NavLink to='/labintroduce' activeClassName="nowPage">
                                    <li>
                                        <div className="svg">
                                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.04952 4.09521V7.31565C6.05022 7.37305 6.03959 7.43003 6.01823 7.48331C5.99688 7.5366 5.96523 7.58515 5.92508 7.62619C5.88494 7.66722 5.83709 7.69993 5.78428 7.72244C5.73148 7.74496 5.67475 7.75683 5.61734 7.75738C5.5006 7.75668 5.38887 7.70985 5.30652 7.6271C5.22416 7.54435 5.17787 7.4324 5.17773 7.31565V4.09521H4.3357V7.31565C4.3357 7.55896 4.14366 7.75632 3.903 7.75738C3.78626 7.75668 3.67453 7.70985 3.59217 7.6271C3.50982 7.54435 3.46353 7.4324 3.46339 7.31565V4.09521H2.6543V8.28226H6.84798V4.09521H6.04978H6.04952Z" fill="white" />
                                                <path d="M14.7226 0.112305H2.29532C1.07743 0.112305 0.0869141 1.10309 0.0869141 2.32098V14.7474C0.0869141 15.9656 1.07769 16.9561 2.29532 16.9561H14.7226C15.9402 16.9561 16.931 15.9656 16.931 14.7474V2.32098C16.931 1.10309 15.9405 0.112305 14.7226 0.112305V0.112305ZM2.22573 8.70926V3.66849H3.46221V2.6623H3.32913L3.32701 2.42112H4.45644L4.45777 2.6623H4.33452V3.66849H5.17655V2.6623H5.04348L5.04188 2.42112H6.17052L6.17238 2.6623H6.0486V3.66849H7.27393V8.70926H2.22573ZM6.85504 10.0865L9.94373 11.8707L9.63826 12.4004L6.54877 10.6162L6.85504 10.0865V10.0865ZM14.5287 14.6837H6.9334V13.4161H9.63162C11.4777 13.4161 12.9804 11.9143 12.9804 10.0682C12.9804 8.90104 12.3745 7.84651 11.4304 7.2446L9.8906 9.91148L9.57105 9.72687L9.11684 10.5129L8.31226 10.0483L8.76648 9.26282L8.44666 9.07821L12.1086 2.73482L12.3548 2.87693L12.7232 2.23916L13.6864 2.79538L13.319 3.43421L13.553 3.56915L12.0634 6.14757C13.3931 6.97233 14.2482 8.44071 14.2482 10.0687C14.2482 11.3902 13.6829 12.5741 12.7907 13.4167H14.5289V14.6842L14.5287 14.6837Z" fill="white" />
                                            </svg>
                                        </div>
                                        研究室介紹
                                    </li>
                                </NavLink>
                            </ul>
                        </div>
                        <div className="set">
                            <NavLink to='/pemissionmanage' activeClassName="nowPage">
                                <div className="sidebar_title">
                                    權限管理
                                </div>
                            </NavLink>
                        </div>
                        <div className="set">
                            <NavLink to='/member' activeClassName="nowPage">
                                <div className="sidebar_title">
                                    成員管理
                                </div>
                            </NavLink>
                        </div>
                        <div className="set">
                            <NavLink to='/meetingmanage' activeClassName="nowPage">
                                <div className="sidebar_title">
                                    會議管理
                                </div>
                            </NavLink>
                        </div>
                        <div className="set">
                            <div className="sidebar_title">
                                專案管理
                            </div>
                            <ul>
                                <NavLink to='/casemanage' activeClassName="nowPage">
                                    <li>
                                        <div className="svg">
                                            <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.1579 0H10.7368C11.2114 0 11.6666 0.188533 12.0022 0.524125C12.3378 0.859716 12.5263 1.31488 12.5263 1.78947V3.57895H16.1053C16.5799 3.57895 17.035 3.76748 17.3706 4.10307C17.7062 4.43866 17.8947 4.89382 17.8947 5.36842V15.2105C17.8947 15.6851 17.7062 16.1403 17.3706 16.4759C17.035 16.8115 16.5799 17 16.1053 17H1.78947C1.31488 17 0.859716 16.8115 0.524125 16.4759C0.188533 16.1403 0 15.6851 0 15.2105V5.36842C0 4.89382 0.188533 4.43866 0.524125 4.10307C0.859716 3.76748 1.31488 3.57895 1.78947 3.57895H5.36842V1.78947C5.36842 1.31488 5.55695 0.859716 5.89255 0.524125C6.22814 0.188533 6.6833 0 7.1579 0ZM10.7368 3.57895V1.78947H7.1579V3.57895H10.7368ZM7.60526 13.8684L13.5016 7.9721L12.24 6.71053L7.60526 11.3363L5.73526 9.47526L4.47368 10.7368L7.60526 13.8684Z" fill="white" />
                                            </svg>
                                        </div>
                                        專案管理
                                    </li>
                                </NavLink>
                                <NavLink to='/typemange' activeClassName="nowPage">
                                    <li>
                                        <div className="svg">
                                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.1905 0H0V3.77728H16.1905V0ZM3.2381 2.83296H1.61905V0.944319H3.2381V2.83296ZM15.0571 10.1986C14.9027 9.96865 14.7064 9.78157 14.4824 9.65092C14.2584 9.52027 14.0123 9.44931 13.7619 9.44319H8.09362C7.87935 9.44319 7.67386 9.54248 7.52234 9.71922C7.37083 9.89596 7.28571 10.1357 7.28571 10.3856V16.0553C7.28571 16.3053 7.37083 16.545 7.52234 16.7217C7.67386 16.8984 7.87935 16.9977 8.09362 16.9977H13.7619C14.0153 17.0129 14.2678 16.9513 14.4948 16.819C14.7218 16.6866 14.9155 16.4879 15.0571 16.2423L17 13.2205L15.0571 10.1986ZM8.09362 7.55455H13.7619C14.2229 7.56324 14.6771 7.68453 15.0954 7.91062C15.5137 8.1367 15.8868 8.46255 16.1905 8.86715V5.66591H0V9.44319H5.81562C5.98164 8.89251 6.28977 8.4153 6.69766 8.07712C7.10555 7.73895 7.5932 7.5564 8.09362 7.55455ZM1.61905 8.49887V6.61023H3.2381V8.49887H1.61905ZM5.66667 11.3318H0V15.1091H5.66667V11.3318ZM1.61905 14.1648V12.2761H3.2381V14.1648H1.61905Z" fill="white" />
                                            </svg>
                                        </div>
                                        專案類型管理
                                    </li>
                                </NavLink>
                            </ul>
                        </div>
                    </div>
                    <div style={sidebarclick===true?(show.content_in):(hide.content_in)} className="content_in">
                        <div className="in">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}