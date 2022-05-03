import { Component } from "react";
import { POST_login, set_token } from '../../Service/login/Login.js';
import { Link, NavLink } from "react-router-dom";
import "./header1.scss";
import "./login.scss";
import logo from "./img/logo.png";
export default class GuestHeader extends Component {
    state = {
        drop: false,
        post: [],
        payload: {
            account: "",
            password: "",
        }
    }
    //生命週期

    POST = async () => {
        const payload = this.state.payload
        try {
            const req = await POST_login(payload);
            console.log(req);
            set_token(req.data.data);
            // window.location.replace('http://localhost:3000/meeting');
        }
        catch (err) {
            alert(err.response.data.message);
        }
    }
    //func
    drop_down = () => {
        if (this.state.drop === false) {
            this.setState({
                drop: true,
            })
        }
        else {
            this.setState({
                drop: false,
            })
        }
    }
    handelMouseDown = (e) => {
        if (e.target.className === "signupFrm" ||e.target.className === "close_btn") {
            this.setState({
                drop: false,
            })
        }
    }
    handelInput = (e) => {
        const payload = this.state.payload;
        if (e.target.name === "account") {
            this.setState({
                payload: {
                    account: e.target.value,
                    password: payload.password,
                }
            })
        }
        else if (e.target.name === "password") {
            this.setState({
                payload: {
                    account: payload.account,
                    password: e.target.value,
                }
            })
        }
        // console.log(this.state.payload);
    }
    render() {
        const { drop } = this.state
        return (
            <header className="header">
                <Link to="/index" className="logo">
                    <img src={logo} alt="" />
                </Link>
                <nav className="nav">
                    <ul className="header_ul">
                        <Link to="/setinfo">
                            <li>去前台</li>
                        </Link>
                        <Link to="/adminalbum">
                            <li>去後台</li>
                        </Link>
                        <div
                            to="/student"
                            className={isActive => (!isActive ? " nowP" : "")}
                        >
                            <li>實驗室介紹</li>
                        </div>
                        <div
                            to="/student"
                            className={(navData) => (navData.isActive ? "nowP" : "")}
                        >
                            <li>歷屆成員</li>
                        </div>
                        <div
                            onClick={this.drop_down}
                        >
                            <li>進入研究室</li>
                        </div>
                    </ul>
                </nav>
                <div
                    className={drop ? "login_background active" : "login_background"}
                    onClick={this.handelMouseDown}
                >
                    <div className="signupFrm">
                        <div className="form">
                            <h1 className="title">
                                登入
                                <div className="close">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M24 2.4L21.6 0L12 9.6L2.4 0L0 2.4L9.6 12L0 21.6L2.4 24L12 14.4L21.6 24L24 21.6L14.4 12L24 2.4Z" fill="#51718C" />
                                    </svg>
                                    <div className="close_btn"/>
                                </div>
                            </h1>
                            <div className="inputContainer">
                                <input
                                    type="text"
                                    className="input"
                                    placeholder=" "
                                    required="required"
                                    name="account"
                                    onChange={this.handelInput}
                                />
                                <label for="Email" className="label">
                                    帳號
                                </label>
                            </div>
                            <div className="inputContainer">
                                <input
                                    type="password"
                                    className="input"
                                    placeholder=" "
                                    required="required"
                                    name="password"
                                    onChange={this.handelInput}
                                />
                                <label for="Password" className="label">
                                    密碼
                                </label>
                            </div>
                            <button
                                className="submitBtn"
                                onClick={this.POST.bind(this)}
                            >
                                登入
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}
