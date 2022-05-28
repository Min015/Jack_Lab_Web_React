import { Component } from 'react';
import { connect } from "react-redux";
import { Link, NavLink } from 'react-router-dom';
import './header1.scss';
import "./popup_window.scss";
import '../../../Mixin/popup_window.scss';
import logo from '../img/logo.png';

import {PUT_UpdateMyPassword} from '../../../Action/MemberAction';

const mapStateToProps = state => {
	const { memberReducer } = state;
	return (
		memberReducer
	)
}

const mapDispatchToProps = dispatch => {
	return {
		PUT_UpdateMyPassword: (payload, callback) => dispatch(PUT_UpdateMyPassword(payload, callback)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(
	class Header extends Component {
		state = {
			drop: false,
			revise: false,
			logout: false,
			oldpassword: "",
			password: "",
			password_confirm: "",
		}
		//生命週期


		LOGOUT = () => {
			localStorage.removeItem('user_token');
			window.location.replace('http://localhost:3000/index');
		}

		UpdateMyPassword = () => {
			const { oldpassword, password, password_confirm } = this.state
			if (oldpassword !== "" && password !== "" && password_confirm !== "") {
				if (password === password_confirm) {
					const payload = {
						oldpassword: oldpassword,
						password: password,
						password_confirm: password_confirm,
					}
					const callback = () => {
						this.setState({
							revise: false,
							oldpassword: "",
							password: "",
							password_confirm: "",
						})
					}
					this.props.PUT_UpdateMyPassword(payload, callback)
				}
				else {
					this.setState({
						password: "",
						password_confirm: "",
					})
					alert("密碼及確認密碼不一致")
				}
			}
			else {
				alert("您有必填欄位尚未填寫，請確認")
			}
		}
		//不可以有空格
		handleInputChange = event => {
			const target = event.target;
			let { value, id } = target;
			value = value.trim();
			this.setState({
				[id]: value,
			});
		}

		drop_down = (e) => {
			if (e === 'preson') {
				this.setState({
					drop: !this.state.drop,
				})
			}
			else if (e === 'revise') {
				this.setState({
					revise: !this.state.revise,
				})
			}
			else if (e === 'logout') {
				this.setState({
					logout: !this.state.logout,
				})
			}
		}
		handelMouseDown = (e) => {
			if (e.target.className === "window") {
				this.setState({
					revise: false,
					logout: false,
				})
			}
		}

		render() {
			const { drop, revise, logout, oldpassword, password, password_confirm } = this.state;
			return (
				<header className="header">
					<Link to='/index' className="logo">
						<img src={logo} alt="" />
					</Link>
					<nav className="nav">
						<ul className="header_ul">
							{/* <Link to='/index'><li>去訪客</li></Link>
                        <Link to='/adminalbum'><li>去後台</li></Link> */}
							{/* <NavLink to='/game' activeClassName="nowP"><li>競賽專區</li></NavLink> */}
							<NavLink to='/project' activeClassName="nowP"><li>LAB專案</li></NavLink>
							<NavLink to='/meeting' activeClassName="nowP"><li>會議記錄</li></NavLink>
							<div className="preson_info"
								onClick={() => this.drop_down('preson')}
							>
								<svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M13.5 2.25C7.28999 2.25 2.25 7.28999 2.25 13.5C2.25 19.71 7.28999 24.75 13.5 24.75C19.71 24.75 24.75 19.71 24.75 13.5C24.75 7.28999 19.71 2.25 13.5 2.25ZM13.5 5.625C15.3675 5.625 16.875 7.13249 16.875 8.99999C16.875 10.8675 15.3675 12.375 13.5 12.375C11.6325 12.375 10.125 10.8675 10.125 8.99999C10.125 7.13249 11.6325 5.625 13.5 5.625ZM13.5 21.6C12.1633 21.6 10.8474 21.2692 9.66968 20.6371C8.49191 20.0051 7.48887 19.0914 6.74999 17.9775C6.78374 15.7387 11.25 14.5125 13.5 14.5125C15.7387 14.5125 20.2162 15.7387 20.25 17.9775C19.5111 19.0914 18.5081 20.0051 17.3303 20.6371C16.1525 21.2692 14.8366 21.6 13.5 21.6Z" fill="white" />
								</svg>
								<svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M7 8L13.0622 0.5H0.937822L7 8Z" fill="white" />
								</svg>
								<div className='cover' id='drop'></div>
							</div>
							<div className={drop ? "person_info_dropdown active" : "person_info_dropdown"}>
								<ul>
									<li><Link to='/setinfo'>個人資料</Link></li>
									<li><p onClick={() => this.drop_down('revise')}>修改密碼</p></li>
									<li><p onClick={() => this.drop_down('logout')}>登出</p></li>
								</ul>
							</div>
						</ul>
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
					<div
						className={revise ? "popup_background active" : "popup_background"}
						onClick={this.handelMouseDown}
					>
						<div className="window">
							<div className="form">
								<h1 className="title">
									修改密碼
									<div className="close">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M24 2.4L21.6 0L12 9.6L2.4 0L0 2.4L9.6 12L0 21.6L2.4 24L12 14.4L21.6 24L24 21.6L14.4 12L24 2.4Z" fill="#51718C" />
										</svg>
										<div className="close_btn" onClick={() => this.drop_down('revise')} />
									</div>
								</h1>
								<div className="inputContainer">
									<input
										type="password"
										className="input"
										placeholder=" "
										id='oldpassword'
										value={oldpassword}
										onChange={this.handleInputChange.bind(this)}
									/>
									<label for="Email" className="label">
										舊密碼
									</label>
								</div>
								<div className="inputContainer">
									<input
										type="password"
										className="input"
										placeholder=" "
										id='password'
										value={password}
										onChange={this.handleInputChange.bind(this)}
									/>
									<label for="Password" className="label">
										新密碼
									</label>
								</div>
								<div className="inputContainer">
									<input
										type="password"
										className="input"
										placeholder=" "
										id='password_confirm'
										value={password_confirm}
										onChange={this.handleInputChange.bind(this)}
									/>
									<label for="Password" className="label">
										確認密碼
									</label>
								</div>
								<div className='btn_block'>
									<button
										className="submitBtn"
										onClick={() => this.UpdateMyPassword()}
									>
										確定
									</button>
								</div>
							</div>
						</div>
					</div>
				</header>
			)
		}
	}
)