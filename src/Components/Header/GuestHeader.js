import { Component } from "react";
import { POST_login,set_token } from '../../Service/login/Login.js';
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

    POST = async() => {
        const payload = this.state.payload
        console.log(payload);
        console.log(payload);

        const req = await POST_login(payload);
        console.log("data", req);
        console.log(req.status);
        alert(req.status);

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
        // console.log(e.target)
        if (e.target.className === "signupFrm") {
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
        console.log(this.state.payload);
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
                            className={(navData) => (navData.isActive ? "nowP" : "")}
                        >
                            <li>實驗室介紹</li>
                        </div>
                        <Link
                            to="/student"
                            className={(navData) => (navData.isActive ? "nowP" : "")}
                        >
                            <li>歷屆成員</li>
                        </Link>
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
                        <form className="form">
                            <h1 className="title">登入</h1>
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
                                // name="Login"
                                onClick={this.POST.bind(this)}
                            >
                                登入
                            </button>
                        </form>
                    </div>
                </div>
            </header>
        );
    }
}
