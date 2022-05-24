import { Component } from 'react';
import { Link } from 'react-router-dom';
import './admin_header.scss';
import logo from '../img/logo.png';
export default class AdminHeader extends Component {
    state = {
        logout: false,
    }
    LOGOUT = () => {
        localStorage.removeItem('user_token');
        window.location.replace('http://localhost:3000/index');
    }
    drop_down = (e) => {
        if(e==='logout'){
            this.setState({
                logout: !this.state.logout,
            })
        }
    }
    handelMouseDown = (e) => {
        if (e.target.className === "window") {
            this.setState({
                logout: false,
            })
        }
    }
    render() {
        const {logout}=this.state;
        return (
            <div>
                <header id="admin_header">
                    <Link to='/index' className="logo">
                        <img src={logo} />
                    </Link>
                    <nav>
                        {/* <div className="logout">
                            <Link to='/index'>去訪客</Link>
                        </div>
                        <div className="logout">
                            <Link to='/setinfo'>去前台</Link>
                        </div> */}
                        <div className="logout">
                            <p>
                                <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.5 2.25C7.28999 2.25 2.25 7.28999 2.25 13.5C2.25 19.71 7.28999 24.75 13.5 24.75C19.71 24.75 24.75 19.71 24.75 13.5C24.75 7.28999 19.71 2.25 13.5 2.25ZM13.5 5.625C15.3675 5.625 16.875 7.13249 16.875 8.99999C16.875 10.8675 15.3675 12.375 13.5 12.375C11.6325 12.375 10.125 10.8675 10.125 8.99999C10.125 7.13249 11.6325 5.625 13.5 5.625ZM13.5 21.6C12.1633 21.6 10.8474 21.2692 9.66968 20.6371C8.49191 20.0051 7.48887 19.0914 6.74999 17.9775C6.78374 15.7387 11.25 14.5125 13.5 14.5125C15.7387 14.5125 20.2162 15.7387 20.25 17.9775C19.5111 19.0914 18.5081 20.0051 17.3303 20.6371C16.1525 21.2692 14.8366 21.6 13.5 21.6Z" fill="white" />
                                </svg>
                                Admin
                            </p>
                        </div>
                        <div className="logout">
                            <p onClick={()=>this.drop_down('logout')}>
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
                        onClick={this.handelMouseDown}
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
        )
    }
}