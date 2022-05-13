import { Component } from 'react';
import { connect } from "react-redux";
import BackLayout from '../../../Components/Layout/back/BackLayout';
import '../style/mainstyle.scss';
import '../../../Mixin/popup_window.scss';
import { GET_Role, GET_Class, GET_PrivateMember, POST_UserAdd, PUT_ChangeRole, PUT_ChangeClass, PUT_ChangePassword, DELETE_Member } from '../../../Action/MemberAction';
const mapStateToProps = state => {
	const { memberReducer } = state;
	return (
		memberReducer
	)
}

const mapDispatchToProps = dispatch => {
	return {
		GET_Role: () => dispatch(GET_Role()),
		GET_Class: () => dispatch(GET_Class()),
		GET_PrivateMember: () => dispatch(GET_PrivateMember()),
		POST_UserAdd: (payload) => dispatch(POST_UserAdd(payload)),
		PUT_ChangeRole: (payload) => dispatch(PUT_ChangeRole(payload)),
		PUT_ChangeClass: (payload) => dispatch(PUT_ChangeClass(payload)),
		PUT_ChangePassword: (payload) => dispatch(PUT_ChangePassword(payload)),
		DELETE_Member: (payload) => dispatch(DELETE_Member(payload)),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(
	class Member extends Component {
		state = {
			add: false,
			edit: false,
			delete: false,

			array: [],
			table_header: [
				"學生編號",
				"帳號",
				"姓名",
				"班級",
				"角色",
				"帳號創建日期",
			],
			academic_sys: ["研究所", "四技", "二技", "五專",],

			newAccount: {
				value: "",
				errormsg: "必填",
			},
			newName: {
				value: "",
				errormsg: "必填",
			},
			newClass: {
				value: "",
				errormsg: "必填",
			},
			newRole: {
				value: "",
				errormsg: "必填",
			},
			password: {
				value: "",
			},
			password2: {
				value: "",
			},
			now: {}
		}


		componentDidMount = () => {
			this.props.GET_Role();
			this.props.GET_Class();
			this.props.GET_PrivateMember();
		}

		AddMember = () => {
			const { newAccount, newName, newClass, newRole } = this.state;
			const payload = {
				Account: newAccount.value,
				Name: newName.value,
				Class_Id: newClass.value,
				Role_Id: newRole.value,
			}
			this.props.POST_UserAdd(payload);
		}
		ChangeRole = (e) => {
			const target = e.target;
			let { value, id } = target;
			const payload = {
				Account: id,
				Role: value,
			}
			this.props.PUT_ChangeRole(payload);
		}
		ChangeClass = (e) => {
			const target = e.target;
			let { value, id } = target;
			const payload = {
				Account: id,
				Class: value,
			}
			this.props.PUT_ChangeClass(payload);
		}
		ChangePasswordAd = (e) => {
			const { password, password2, now } = this.state;
			if (password.value !== "" && password2.value !== "") {
				if (password.value === password2.value) {
					const payload = {
						account: now.Account,
						password: password.value,
						password_confirm: password2.value,
					}
					this.props.PUT_ChangePassword(payload);
				}
				else {
					alert("兩次密碼輸入不一致");
					password.value = "";
					password2.value = "";
					this.setState({
						password: {
							value: ""
						},
						password2: {
							value: ""
						}
					})
				}
			}
			else {
				alert("有欄位尚未填寫");
			}
		}
		Delete = (id) => {
			this.props.DELETE_Member(id);
		}
		handelDeleteAll = () => {
			const { array } = this.state;
			console.log(array);
			let deletearray = "";
			for (let i = 0; i < array.length; i++) {
				deletearray += array[i] + ",";
			}
			console.log(deletearray);
			this.Delete(deletearray);
		}
		drop_down = (e) => {
			if (e === 'add') {
				this.setState({
					add: !this.state.add,
				})
			}
			else if (e === 'edit') {
				this.setState({
					edit: !this.state.edit,
				})
			}
			else if (e === 'del') {
				this.setState({
					del: !this.state.del,
				})
			}
			else if (e === 'delO') {
				this.setState({
					delO: !this.state.delO,
				})
			}
			else if (e === 'delAll') {
				this.setState({
					delAll: !this.state.delAll,
				})
			}
		}
		handelGetNowinfo = e => {
			this.setState({
				edit: !this.state.edit,
			})
			const info = e.split(",");
			this.setState({
				now: {
					Account: info[0],
					Name: info[1]
				},
			})
		}
		handelSetDelete = (e) => {
			const { id } = e.target;
			const info = id.split(",");
			this.setState({
				now: {
					Name: info[1],
					Id: info[0],
				}
			})
		}

		handelMouseDown = (e) => {
			if (e.target.className === "window") {
				this.setState({
					add: false,
					edit: false,
					del: false,
					delO: false,
					delAll: false,
				})
			}
		}
		//確定是否填寫
		handleInputChange(event) {
			const target = event.target;
			let { value, id } = target;
			value = value.trim();
			if (value !== "") {
				this.setState({
					[id]: {
						value,
						errormsg: "",
					}
				});
			}
			else {
				this.setState({
					[id]: {
						value,
						errormsg: "*",
					}
				});
			}
		}
		handelAllChange = e => {
			const checkboxes = document.getElementsByName('Box');
			for (let i = 0; i < checkboxes.length; i++) {
				checkboxes[i].checked = e.target.checked;
				this.handelOnClick(checkboxes[i]);
			}
		}
		handelOnClick = e => {
			let array = this.state.array;
			const { PrivateMember } = this.props;
			const num = PrivateMember.length;
			const AllChange = document.getElementsByName('AllChange');
			if (e.checked === true) {
				if (!array.includes(e.value)) {
					array.push(e.value);
				}
				if (array.length === num) {
					AllChange[0].checked = true;
				}
			}
			else {
				array.forEach((item, index) => {
					if (item === e.value) {
						array.splice(index, 1)
					}
				})
				if (array.length !== num) {
					AllChange[0].checked = false;
				}
			}
			this.setState({
				array
			})
			console.log(array);
		}

		render() {
			const { table_header, academic_sys, array, add, edit, del, delO, delAll, newAccount, newName, newClass, newRole, password, password2, now } = this.state;
			const { ClassList, RoleList, PrivateMember } = this.props;
			// console.log(PrivateMember);
			// console.log(password.value);
			// console.log(password2.value);
			return (
				<BackLayout>
					<div className="work">
						<div className="edit_button">
							<div onClick={() => this.drop_down('add')} className="work_btn add_btn">
								新增成員
							</div>
							<button
								disabled={array.length === 0 ? true : false}
								className="work_btn delete_btn"
								onClick={() => this.drop_down('delAll')} >
								批量刪除
							</button>
						</div>
						<form className="searchform">
							<select name="" defaultValue={academic_sys[0]}>
								{academic_sys === undefined ? [] : academic_sys.map(item =>
									<option value={item}>{item}</option>
								)}
							</select>
							<input type="text" placeholder="搜尋" />
							<input type="submit" value="送出" className="searchBtn" />
						</form>
					</div>
					<table className="col-12 admin_table">
						<thead>
							<tr>
								<td className="col-05 check">
									<input
										type="checkbox"
										name='AllChange'
										onChange={this.handelAllChange}
									/>
								</td>
								<td className="col-05">#</td>
								<td className="col-1">{table_header[0]}</td>
								<td>{table_header[1]}</td>
								<td className="col-1">{table_header[2]}</td>
								<td className="col-1">{table_header[4]}</td>
								<td className="col-3">{table_header[3]}</td>

								<td className="col-1_5">{table_header[5]}</td>
								<td className="col-1"></td>
							</tr>
						</thead>
						<tbody>
							{PrivateMember === undefined ? "" : PrivateMember.map(
								(item, index) => {
									return (
										<tr key={index} className={array.includes(`${item.Id}`) ? "onchange" : ""} >
											<td className="check">
												<input type="checkbox"
													id=""
													name="Box"
													value={item.Id}
													onChange={(e) => { this.handelOnClick(e.target) }}
												/>
											</td>
											<td>{index + 1}</td>
											<td>{item.Id}</td>
											<td>{item.Account}</td>
											<td>
												{item.Name}
											</td>
											<td>
												<select
													id={item.Account}
													defaultValue={item.Role_Id}
													onChange={this.ChangeRole.bind(this)}
												>
													{RoleList === undefined ? [] : RoleList.map(item =>
														<option value={item.Id}>{item.Name}</option>
													)}
												</select>
											</td>
											<td>
												<select
													id={item.Account}
													defaultValue={item.Class_Id}
													onChange={this.ChangeClass.bind(this)}
												>
													{ClassList === undefined ? [] : ClassList.map(item =>
														<option value={item.Id}>{item.Name}</option>
													)}
												</select>
											</td>

											<td>{item.CreateTime.substr(0, 10)}</td>
											<td>
												<div className="action">
													<div onClick={(e) => this.handelGetNowinfo(`${item.Account},${item.Name}`)} className="svg">
														<svg width="18" height="18" viewBox="0 0 18 18" fill="none"
															xmlns="http://www.w3.org/2000/svg">
															<path
																d="M17.5375 2.83605L15.1747 0.463507C14.5232 -0.190681 13.4207 -0.147876 12.7142 0.563335C12.0076 1.27278 11.9615 2.3815 12.6148 3.03568L14.9776 5.40822C15.6291 6.06241 16.7315 6.01963 17.4398 5.3084C18.1464 4.59719 18.1908 3.49203 17.5375 2.83605ZM2.47467 10.8432L7.20033 15.5882L14.88 7.87883L10.1543 3.13374L2.47467 10.8432ZM0 18L6.23283 16.7469L1.24799 11.7415L0 18Z"
																fill="#51718C" />
														</svg>
														<div className="hover">修改密碼</div>
													</div>
													<div onClick={() => this.drop_down('delO')} className="svg">
														<svg id={`${item.Id},${item.Name}`} onClick={this.handelSetDelete.bind()}
															width="15" height="18" viewBox="0 0 15 18" fill="none"
															xmlns="http://www.w3.org/2000/svg">
															<path id={`${item.Id},${item.Name}`} onClick={this.handelSetDelete.bind()}
																d="M1.01504 16.3125C1.01504 16.7601 1.17545 17.1893 1.46098 17.5058C1.74652 17.8222 2.13379 18 2.53759 18H11.6729C12.0767 18 12.464 17.8222 12.7495 17.5058C13.0351 17.1893 13.1955 16.7601 13.1955 16.3125V4.50001H1.01504V16.3125ZM9.64286 7.31251C9.64286 7.16332 9.69633 7.02025 9.79151 6.91476C9.88668 6.80927 10.0158 6.75001 10.1504 6.75001C10.285 6.75001 10.4141 6.80927 10.5092 6.91476C10.6044 7.02025 10.6579 7.16332 10.6579 7.31251V15.1875C10.6579 15.3367 10.6044 15.4798 10.5092 15.5853C10.4141 15.6908 10.285 15.75 10.1504 15.75C10.0158 15.75 9.88668 15.6908 9.79151 15.5853C9.69633 15.4798 9.64286 15.3367 9.64286 15.1875V7.31251ZM6.59774 7.31251C6.59774 7.16332 6.65122 7.02025 6.74639 6.91476C6.84157 6.80927 6.97066 6.75001 7.10526 6.75001C7.23987 6.75001 7.36896 6.80927 7.46413 6.91476C7.55931 7.02025 7.61278 7.16332 7.61278 7.31251V15.1875C7.61278 15.3367 7.55931 15.4798 7.46413 15.5853C7.36896 15.6908 7.23987 15.75 7.10526 15.75C6.97066 15.75 6.84157 15.6908 6.74639 15.5853C6.65122 15.4798 6.59774 15.3367 6.59774 15.1875V7.31251ZM3.55263 7.31251C3.55263 7.16332 3.6061 7.02025 3.70128 6.91476C3.79646 6.80927 3.92555 6.75001 4.06015 6.75001C4.19475 6.75001 4.32384 6.80927 4.41902 6.91476C4.5142 7.02025 4.56767 7.16332 4.56767 7.31251V15.1875C4.56767 15.3367 4.5142 15.4798 4.41902 15.5853C4.32384 15.6908 4.19475 15.75 4.06015 15.75C3.92555 15.75 3.79646 15.6908 3.70128 15.5853C3.6061 15.4798 3.55263 15.3367 3.55263 15.1875V7.31251ZM13.703 1.12501H9.89662L9.59845 0.467584C9.53529 0.327035 9.43799 0.208807 9.31751 0.126203C9.19703 0.0435979 9.05814 -0.000106452 8.91647 6.16385e-06H5.29088C5.14953 -0.000596082 5.01089 0.0429453 4.89083 0.125642C4.77078 0.208338 4.67417 0.326845 4.61208 0.467584L4.31391 1.12501H0.507519C0.372916 1.12501 0.243827 1.18427 0.148649 1.28976C0.0534706 1.39525 0 1.53832 0 1.68751L0 2.81251C0 2.96169 0.0534706 3.10477 0.148649 3.21025C0.243827 3.31574 0.372916 3.37501 0.507519 3.37501H13.703C13.8376 3.37501 13.9667 3.31574 14.0619 3.21025C14.1571 3.10477 14.2105 2.96169 14.2105 2.81251V1.68751C14.2105 1.53832 14.1571 1.39525 14.0619 1.28976C13.9667 1.18427 13.8376 1.12501 13.703 1.12501Z"
																fill="#51718C" />
														</svg>
														<div className="hover">刪除</div>
													</div>
												</div>
											</td>
										</tr>
									)
								})
							}
						</tbody>
					</table >
					<div
						className={add ? "popup_background active" : "popup_background"}
						onClick={this.handelMouseDown}
					>
						<div className="window">
							<div className="form">
								<h1 className="title">
									新增成員
									<div className="close">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M24 2.4L21.6 0L12 9.6L2.4 0L0 2.4L9.6 12L0 21.6L2.4 24L12 14.4L21.6 24L24 21.6L14.4 12L24 2.4Z" fill="#51718C" />
										</svg>
										<div className="close_btn" onClick={() => this.drop_down('add')} />
									</div>
								</h1>
								<div className="inputContainer">
									<input
										type="email"
										className="input"
										placeholder=" "
										required="required"
										id='newAccount'
										onChange={this.handleInputChange.bind(this)}
									/>
									<label for="Email" className="label">
										成員帳號(電子郵件)
									</label>
								</div>
								<div className="inputContainer">
									<input
										type="text"
										className="input"
										placeholder=" "
										required="required"
										id='newName'
										onChange={this.handleInputChange.bind(this)}
									/>
									<label for="Password" className="label">
										成員名稱
									</label>
								</div>
								<div className="inputContainer">
									<select id='newClass' onChange={this.handleInputChange.bind(this)}>
										{ClassList === undefined ? [] : ClassList.map((item, index) => {
											return (
												<option key={`class${index}`} value={item.Id}>{item.Name}</option>
											)
										})}
									</select>
								</div>
								<div className="inputContainer">
									<select id='newRole' onChange={this.handleInputChange.bind(this)}>
										{RoleList === undefined ? [] : RoleList.map((item, index) => {
											return (
												<option key={`role${index}`} value={item.Id}>{item.Name}</option>
											)
										})}

									</select>
								</div>
								<div className='btn_block'>
									<button
										className="submitBtn"
										onClick={this.AddMember}
									>
										確定
									</button>
								</div>
							</div>
						</div>
					</div>
					<div
						className={edit ? "popup_background active" : "popup_background"}
						onClick={this.handelMouseDown}
					>
						<div className="window">
							<div className="form">
								<h1 className="title">
									修改「{now.Name}」密碼
									<div className="close">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M24 2.4L21.6 0L12 9.6L2.4 0L0 2.4L9.6 12L0 21.6L2.4 24L12 14.4L21.6 24L24 21.6L14.4 12L24 2.4Z" fill="#51718C" />
										</svg>
										<div className="close_btn" onClick={(e) => this.drop_down('edit')} />
									</div>
								</h1>
								<div className="inputContainer">
									<input
										id="password"
										type="password"
										className="input"
										placeholder=" "
										required="required"
										defaultValue={password.value}
										onChange={this.handleInputChange.bind(this)}
									/>
									<label for="Password" className="label">
										新密碼
									</label>
								</div>
								<div className="inputContainer">
									<input
										id="password2"
										type="password"
										className="input"
										placeholder=" "
										required="required"
										defaultValue={password2.value}
										onChange={this.handleInputChange.bind(this)}
									/>
									<label for="Password" className="label">
										確認密碼
									</label>
								</div>
								<div className='btn_block'>
									<button
										className="submitBtn"
										onClick={this.ChangePasswordAd}
									>
										確定
									</button>
								</div>
							</div>
						</div>
					</div>
					<div
						className={delO ? "popup_background active" : "popup_background"}
						onClick={this.handelMouseDown}
					>
						<div className="window">
							<div className="form">
								<h1 className="title">
									<div className="close">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M24 2.4L21.6 0L12 9.6L2.4 0L0 2.4L9.6 12L0 21.6L2.4 24L12 14.4L21.6 24L24 21.6L14.4 12L24 2.4Z" fill="#51718C" />
										</svg>
										<div className="close_btn" onClick={() => this.drop_down('delO')} />
									</div>
								</h1>

								<h2 className='message'>
									是否要刪除成員<br />
									「{now.Name}」
								</h2>
								<div className='btn_block'>
									<button
										className="submitBtn"
										onClick={(e) => this.Delete(now.Id, e)}
									>
										確定
									</button>
								</div>
							</div>
						</div>
					</div>
					<div
						className={delAll ? "popup_background active" : "popup_background"}
						onClick={this.handelMouseDown}
					>
						<div className="window">
							<div className="form">
								<h1 className="title">
									<div className="close">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M24 2.4L21.6 0L12 9.6L2.4 0L0 2.4L9.6 12L0 21.6L2.4 24L12 14.4L21.6 24L24 21.6L14.4 12L24 2.4Z" fill="#51718C" />
										</svg>
										<div className="close_btn" onClick={() => this.drop_down('delAll')} />
									</div>
								</h1>

								<h2 className='message'>
									是否要刪除「{array.length}」筆紀錄
								</h2>
								<div className='btn_block'>
									<button
										className="submitBtn"
										onClick={() => this.handelDeleteAll()}
									>
										確定
									</button>
								</div>
							</div>
						</div>
					</div>
				</BackLayout>

			)
		}
	}
)