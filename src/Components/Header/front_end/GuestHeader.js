import { Component } from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import "./header1.scss";
import "./popup_window.scss";
import logo from '../img/logo.png';
import { POST_Login, GET_IsLogin } from "../../../Action/MemberAction";

const mapStateToProps = state => {

}

const mapDispatchToProps = dispatch => {
	return {
		POST_Login: (payload) => dispatch(POST_Login(payload)),
		GET_IsLogin: (callback) => dispatch(GET_IsLogin(callback)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(
	class GuestHeader extends Component {
		state = {
			drop: false,
			post: [],
			payload: {
				Account: "",
				Password: "",
			}
		}
		LOGIN = () => {
			this.props.POST_Login(this.state.payload);
		}
		IsLogin = () => {
			const callback = (res) => {
				if(res!==undefined&&res.status===200){
					this.setState({
						drop:false
					})
				}
				else{
					this.setState({
						drop:true
					})
				}
			}
			this.props.GET_IsLogin(callback);
		}
		drop_down = () => {
			this.setState({
				drop: !this.state.drop,
			})
		}
		handelMouseDown = (e) => {
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
						Account: e.target.value,
						Password: payload.Password,
					}
				})
			}
			else if (e.target.name === "password") {
				this.setState({
					payload: {
						Account: payload.Account,
						Password: e.target.value,
					}
				})
			}
		}
		render() {
			const { drop } = this.state;
			const token = localStorage.getItem("user_token");
			console.log(84, token);
			return (
				<header className="header">
					<Link to="/index" className="logo">
						<img src={logo} alt="" />
					</Link>
					<nav className="nav">
						<ul className="header_ul">
							<NavLink
								to="/student"
								activeClassName="nowP"
							>
								<li>歷屆成員</li>
							</NavLink>
							<div
								onClick={(token===null||token===undefined)?this.drop_down.bind():this.IsLogin.bind()}
							>
								<li>進入研究室</li>
							</div>
						</ul>
					</nav>
					<div
						className={drop ? "popup_background active" : "popup_background"}
						onClick={this.handelMouseDown}
					>
						<div className="window">
							<div className="form">
								<h1 className="title Login_title">
									登入
									<div className="close">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M24 2.4L21.6 0L12 9.6L2.4 0L0 2.4L9.6 12L0 21.6L2.4 24L12 14.4L21.6 24L24 21.6L14.4 12L24 2.4Z" fill="#51718C" />
										</svg>
										<div className="close_btn" onClick={this.drop_down} />
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
									<label htmlFor="Email" className="label">
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
									<label htmlFor="Password" className="label">
										密碼
									</label>
								</div>
								<div className='one_btn'>
									<button
										className="submitBtn"
										onClick={this.LOGIN.bind(this)}
									>
										登入
									</button>
								</div>
							</div>
						</div>
					</div>
				</header>
			);
		}
	}
)