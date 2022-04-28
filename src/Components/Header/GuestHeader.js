import { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import "./header1.scss";
import "./login.scss";
import logo from "./img/logo.png";
export default class GuestHeader extends Component {
    state = {
        drop: false,
    }
    //生命週期

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
        if(e.target.className==="signupFrm"){
            this.setState({
                drop: false,
            })
        }
    }
    render() {
        const{drop}=this.state
        return (
            <header className="header">
                <Link to="/Index" className="logo">
                    <img src={logo} alt="" />
                </Link>
                <nav className="nav">
                    <ul className="header_ul">
                        <Link to="/SetInfo">
                            <li>去前台</li>
                        </Link>
                        <Link to="/AdminAlbum">
                            <li>去後台</li>
                        </Link>
                        <div
                            to="/Student"
                            className={(navData) => (navData.isActive ? "nowP" : "")}
                        >
                            <li>實驗室介紹</li>
                        </div>
                        <Link
                            to="/Student"
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
                className={drop?"login_background active":"login_background" }
                onClick={this.handelMouseDown}
                >
                    <div className="signupFrm">
                        <form action="" method="post" className="form">
                            <h1 className="title">登入</h1>
                            <div className="inputContainer">
                                <input
                                    type="email"
                                    className="input"
                                    placeholder=" "
                                    required="required"
                                    name="Email"
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
                                    name="Password"
                                />
                                <label for="Password" className="label">
                                    密碼
                                </label>
                            </div>
                            <input
                                type="submit"
                                className="submitBtn"
                                value="登入"
                                name="Login"
                            />
                        </form>
                    </div>
                </div>
            </header>
        );
    }
}
