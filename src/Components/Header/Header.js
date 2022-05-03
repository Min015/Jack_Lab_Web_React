import { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './header1.scss';
import logo from './img/logo.png';
export default class Header extends Component {
    state = {
        drop: false,
        newclass: 'person_info_dropdown',
    }
    //生命週期

    //func
    drop_down = () => {
        if (this.state.drop === false) {
            this.setState({
                drop: true,
                newclass: 'person_info_dropdown active',
            })
        }
        else {
            this.setState({
                drop: false,
                newclass: 'person_info_dropdown',
            })
        }
    }

    render() {
        const { newclass } = this.state;
        return (
            <header className="header">
                <Link to='/index' className="logo">
                    <img src={logo} alt="" />
                </Link>
                <nav className="nav">
                    <ul className="header_ul">
                        <Link to='/index'><li>去訪客</li></Link>
                        <Link to='/adminalbum'><li>去後台</li></Link>
                        <NavLink to='/game' activeClassName="nowP"><li>競賽專區</li></NavLink>
                        <NavLink to='/project' activeClassName="nowP"><li>LAB專案</li></NavLink>
                        <NavLink to='/meeting' activeClassName="nowP"><li>會議記錄</li></NavLink>
                        <div className="preson_info"
                            onClick={this.drop_down}
                        >
                            <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.5 2.25C7.28999 2.25 2.25 7.28999 2.25 13.5C2.25 19.71 7.28999 24.75 13.5 24.75C19.71 24.75 24.75 19.71 24.75 13.5C24.75 7.28999 19.71 2.25 13.5 2.25ZM13.5 5.625C15.3675 5.625 16.875 7.13249 16.875 8.99999C16.875 10.8675 15.3675 12.375 13.5 12.375C11.6325 12.375 10.125 10.8675 10.125 8.99999C10.125 7.13249 11.6325 5.625 13.5 5.625ZM13.5 21.6C12.1633 21.6 10.8474 21.2692 9.66968 20.6371C8.49191 20.0051 7.48887 19.0914 6.74999 17.9775C6.78374 15.7387 11.25 14.5125 13.5 14.5125C15.7387 14.5125 20.2162 15.7387 20.25 17.9775C19.5111 19.0914 18.5081 20.0051 17.3303 20.6371C16.1525 21.2692 14.8366 21.6 13.5 21.6Z" fill="white" />
                            </svg>
                            <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 8L13.0622 0.5H0.937822L7 8Z" fill="white" />
                            </svg>
                        </div>
                        <div className={newclass}>
                            <ul>
                                <li id="set_info"><Link to='/setinfo'>個人資料</Link></li>
                                <li id="set_info"><Link to='/setinfo'>我的小組</Link></li>
                                <li id="set_info"><Link to='/setinfo'>修改密碼</Link></li>
                                <li id="logout"><a href="#">登出</a></li>
                            </ul>
                        </div>
                    </ul>
                </nav>
            </header>
        )
    }
}