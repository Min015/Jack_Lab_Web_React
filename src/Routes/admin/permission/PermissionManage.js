import { Component } from 'react';
import { connect } from "react-redux";
import BackLayout from '../../../Components/Layout/back/BackLayout';
import '../style/mainstyle.scss';
import '../../../Mixin/popup_window.scss'
import searchbtn from '../style/img/searchButton.png';
import { GET_Role, GET_PermissionList, GET_RolePermission, PUT_ChangeRolePermission, POST_RoleAdd, DELETE_Role, } from '../../../Action/MemberAction';
const mapStateToProps = state => {
	const { memberReducer } = state;
	return (
		memberReducer
	)
}

const mapDispatchToProps = dispatch => {
	return {
		GET_Role: (page, search, callback) => dispatch(GET_Role(page, search, callback)),
		GET_Permission: () => dispatch(GET_PermissionList()),
		GET_RolePermission: (payload, callback) => dispatch(GET_RolePermission(payload, callback)),
		PUT_ChangeRolePermission: (payload, callback) => dispatch(PUT_ChangeRolePermission(payload, callback)),
		POST_RoleAdd: (payload, callback) => dispatch(POST_RoleAdd(payload, callback)),
		DELETE_Role: (payload, callback) => dispatch(DELETE_Role(payload, callback)),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(
	class PermissionManage extends Component {
		state = {
			array: [],
			add: false,
			edit: false,
			table_header: [
				"角色名稱",
			],
			role_permission: [],
			nowRole: "",
			newRoleName: "",
			deleteOne: "",
			delO: false,
			delAll: false,
		}
		//生命週期
		componentDidMount = () => {
			const { match } = this.props;
			const { params } = match;
			const nowpage = params.page;
			const nowsearch = params.search;
			this.setState({
				page: nowpage,
				search: nowsearch,
			})
			const callback = (res) => {
				this.setState({
					maxpage: res.page,
				})
				this.handelGetPage(nowpage, res.page);
			}
			this.props.GET_Role(nowpage, nowsearch, callback);
			this.props.GET_Permission();
		}
		//取得頁面
		handelGetPage = (nowpage, maxpage) => {
			let pagearray = [];
			for (let i = (Number(nowpage) - 2); i <= (Number(nowpage) + 2); i++) {
				if (i > 0 && i <= Number(maxpage)) {
					pagearray.push(i)
				}
			}
			this.setState({
				pagearray
			})
		}
		//換頁
		handelGoNextPage = (page, search = " ") => {
			const callback = (res) => {
				const { match } = this.props;
				const { params } = match;
				const nowpage = params.page;
				const nowsearch = params.search;
				this.setState({
					page: nowpage,
					search: nowsearch,
					maxpage: res.page,
					pagearray: [],
				})
				this.handelGetPage(nowpage, res.page);
			}
			this.props.history.push(`/pemissionmanage/${page}/${search}`);
			this.props.GET_Role(page, search, callback);
		}
		//新增
		RoleAdd = () => {
			const { page, search } = this.state;
			const { newRoleName, role_permission } = this.state;
			if (newRoleName === "") {
				alert("您有必填欄位尚未填寫，請確認");
			}
			else {
				if (role_permission.length !== 0) {
					const payload = {
						Name: newRoleName,
						Permission: role_permission,
					}
					const callback = () => {
						this.props.GET_Role(page, search);
						this.setState({
							add: false,
							newRoleName: "",
							role_permission: [],
						})
						this.handelClearPermissionCheckbox();
					}
					this.props.POST_RoleAdd(payload, callback);
				}
				else {
					alert("角色權限不可為空，請選擇權限");
				}
			}
		}
		//修改(取得原權限&設定新權限)
		handelEditPermission = e => {
			this.setState({
				edit: !this.state.edit,
			})
			const info = e.split(",");
			const callback = (res) => {
				const role_permission = res.map(item => `${item.Id}`)
				this.setState({
					role_permission,
				})
			}
			this.props.GET_RolePermission(info[0], callback);
			this.setState({
				nowRole: {
					Id: info[0],
					Name: info[1]
				},
			})
		}
		//修改(API)
		ChangeRolePermission = () => {
			const { page, search } = this.state;
			const { nowRole, role_permission } = this.state;
			if (role_permission.length === 0) {
				alert("角色權限不可為空，請選擇權限");
			}
			else {
				const payload = {
					Id: nowRole.Id,
					Permission: role_permission,
				}
				const callback = () => {
					this.props.GET_Role(page, search);
					this.setState({
						edit: false,
						newRoleName: "",
						role_permission: [],
					})
					this.handelClearPermissionCheckbox();
				}
				this.props.PUT_ChangeRolePermission(payload, callback);
			}
		}
		//不可以有空格
		handleInputChange = event => {
			const target = event.target;
			let { value, id } = target;
			if (id === 'search') {
				value = value.trim();
				if (value !== "") {
					this.setState({
						[id]: value,
					});
				}
				else {
					this.setState({
						[id]: " ",
					});
				}
			}
			else {
				value = value.trim();
				this.setState({
					[id]: value,
				});
			}
		}
		//取得現在Item
		handelSetDelete = (e) => {
			const { id } = e.target;
			this.setState({
				deleteOne: id,
			})
		}
		//清除權限check
		handelClearPermissionCheckbox = () => {
			const permission = document.getElementsByName('permission');
			for (let i = 0; i < permission.length; i++) {
				permission[i].checked = false;
			}
		}
		//刪除
		Delete = (id) => {
			const { search, } = this.state;
			const callback = () => {
				const AllChange = document.getElementsByName('AllChange');
				AllChange[0].checked = false;
				const checkboxes = document.getElementsByName('Box');
				for (let i = 0; i < checkboxes.length; i++) {
					checkboxes[i].checked = false;
				}
				this.setState({
					delO: false,
					delAll: false,
				})
				this.handelGoNextPage(1,);
				this.props.history.push(`/pemissionmanage/1/${search}`);
			}
			this.props.DELETE_Role(id, callback);
		}
		//刪除多筆
		handelDeleteAll = () => {
			const { array } = this.state;
			let deletearray = "";
			for (let i = 0; i < array.length; i++) {
				deletearray += array[i] + ",";
			}
			this.Delete(deletearray);
		}
		//下拉
		drop_down = (e) => {
			if (e === 'add') {
				this.setState({
					add: !this.state.add,
					role_permission: [],
				})
			}
			else if (e === 'edit') {
				this.setState({
					edit: !this.state.edit,
					role_permission: [],
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
		//點視窗外關閉
		handelMouseDown = (e) => {
			if (e.target.className === "window") {
				this.setState({
					edit: false,
					add: false,
					delO: false,
					delAll: false,
					role_permission: [],
				})
			}
		}
		//全選
		handelAllChange = e => {
			const checkboxes = document.getElementsByName('Box');
			for (let i = 0; i < checkboxes.length; i++) {
				checkboxes[i].checked = e.target.checked;
				this.handelOnClick(checkboxes[i]);
			}
		}
		//單選
		handelOnClick = e => {
			let array = this.state.array;
			const { RoleList } = this.props;
			const num = RoleList.list.length;
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
		}
		//選擇權限
		handelSelectPermission = e => {
			let role_permission = this.state.role_permission;
			const check = e.target.id;
			if (e.target.checked === true) {
				if (!role_permission.includes(check)) {
					role_permission.push(check);
				}
			}
			else {
				role_permission.forEach((item, index) => {
					if (item === check) {
						role_permission.splice(index, 1)
					}
				})
			}
			this.setState({
				role_permission
			})

		}
		render() {
			const { edit, add, delO, delAll, deleteOne, table_header, nowRole, role_permission, array, newRoleName } = this.state;
			const { RoleList, PermissionList } = this.props;
			const { pagearray, page, search, maxpage } = this.state;
			const Title = deleteOne.split(",");
			return (
				<div id='permission'>
					<BackLayout>
						<div className='bg'>
							<div className="work">
								<div className="edit_button">
									<button onClick={() => this.drop_down('add')} className="work_btn add_btn" >
										新增角色
									</button>
									<button
										disabled={array.length === 0 ? true : false}
										className="work_btn delete_btn"
										onClick={() => this.drop_down('delAll')} >
										批量刪除
									</button>
								</div>
								<div className="searchbar">
									<input type="text" placeholder="搜尋" id="search" value={search} onChange={this.handleInputChange.bind(this)} />
									<div className="submit">
										<input type="image" src={searchbtn} alt="送出" onClick={() => this.handelGoNextPage(1, search)} />
									</div>
								</div>
							</div>
							<table className="col-12 admin_table">
								<thead>
									<tr>
										<th className="col-05 check">
											<input
												type="checkbox"
												name='AllChange'
												onChange={this.handelAllChange}
											/>
										</th>
										<th className="col-05">#</th>
										<th>{table_header[0]}</th>
										<th className="col-1"></th>
									</tr>
								</thead>
								<tbody>
									{(RoleList === undefined || RoleList.list.length === 0) ? [] : RoleList.list?.map(
										(item, index) => {
											return (
												<tr key={`role${index}`} className={array.includes(`${item.Id}`) ? "onchange" : ""}>
													<td className="check">
														<input
															type="checkbox"
															name="Box"
															value={item.Id}
															onChange={(e) => { this.handelOnClick(e.target) }}
														/>
													</td>
													<td>{((page - 1) * 10) + index + 1}</td>
													<td>{item.Name}</td>
													<td>
														<div className="action">
															<div onClick={(e) => this.handelEditPermission(`${item.Id},${item.Name}`)} className="svg">
																<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
																	<path d="M17.5375 2.83605L15.1747 0.463507C14.5232 -0.190681 13.4207 -0.147876 12.7142 0.563335C12.0076 1.27278 11.9615 2.3815 12.6148 3.03568L14.9776 5.40822C15.6291 6.06241 16.7315 6.01963 17.4398 5.3084C18.1464 4.59719 18.1908 3.49203 17.5375 2.83605ZM2.47467 10.8432L7.20033 15.5882L14.88 7.87883L10.1543 3.13374L2.47467 10.8432ZM0 18L6.23283 16.7469L1.24799 11.7415L0 18Z" fill="#51718C" />
																</svg>
																<div className="hover">
																	編輯權限
																</div>
															</div>
															<div onClick={() => this.drop_down('delO')} className="svg">
																<svg id={`${item.Id},${item.Name}`} onClick={this.handelSetDelete.bind()} width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
																	<path id={`${item.Id},${item.Name}`} onClick={this.handelSetDelete.bind()} d="M1.01504 16.3125C1.01504 16.7601 1.17545 17.1893 1.46098 17.5058C1.74652 17.8222 2.13379 18 2.53759 18H11.6729C12.0767 18 12.464 17.8222 12.7495 17.5058C13.0351 17.1893 13.1955 16.7601 13.1955 16.3125V4.50001H1.01504V16.3125ZM9.64286 7.31251C9.64286 7.16332 9.69633 7.02025 9.79151 6.91476C9.88668 6.80927 10.0158 6.75001 10.1504 6.75001C10.285 6.75001 10.4141 6.80927 10.5092 6.91476C10.6044 7.02025 10.6579 7.16332 10.6579 7.31251V15.1875C10.6579 15.3367 10.6044 15.4798 10.5092 15.5853C10.4141 15.6908 10.285 15.75 10.1504 15.75C10.0158 15.75 9.88668 15.6908 9.79151 15.5853C9.69633 15.4798 9.64286 15.3367 9.64286 15.1875V7.31251ZM6.59774 7.31251C6.59774 7.16332 6.65122 7.02025 6.74639 6.91476C6.84157 6.80927 6.97066 6.75001 7.10526 6.75001C7.23987 6.75001 7.36896 6.80927 7.46413 6.91476C7.55931 7.02025 7.61278 7.16332 7.61278 7.31251V15.1875C7.61278 15.3367 7.55931 15.4798 7.46413 15.5853C7.36896 15.6908 7.23987 15.75 7.10526 15.75C6.97066 15.75 6.84157 15.6908 6.74639 15.5853C6.65122 15.4798 6.59774 15.3367 6.59774 15.1875V7.31251ZM3.55263 7.31251C3.55263 7.16332 3.6061 7.02025 3.70128 6.91476C3.79646 6.80927 3.92555 6.75001 4.06015 6.75001C4.19475 6.75001 4.32384 6.80927 4.41902 6.91476C4.5142 7.02025 4.56767 7.16332 4.56767 7.31251V15.1875C4.56767 15.3367 4.5142 15.4798 4.41902 15.5853C4.32384 15.6908 4.19475 15.75 4.06015 15.75C3.92555 15.75 3.79646 15.6908 3.70128 15.5853C3.6061 15.4798 3.55263 15.3367 3.55263 15.1875V7.31251ZM13.703 1.12501H9.89662L9.59845 0.467584C9.53529 0.327035 9.43799 0.208807 9.31751 0.126203C9.19703 0.0435979 9.05814 -0.000106452 8.91647 6.16385e-06H5.29088C5.14953 -0.000596082 5.01089 0.0429453 4.89083 0.125642C4.77078 0.208338 4.67417 0.326845 4.61208 0.467584L4.31391 1.12501H0.507519C0.372916 1.12501 0.243827 1.18427 0.148649 1.28976C0.0534706 1.39525 0 1.53832 0 1.68751L0 2.81251C0 2.96169 0.0534706 3.10477 0.148649 3.21025C0.243827 3.31574 0.372916 3.37501 0.507519 3.37501H13.703C13.8376 3.37501 13.9667 3.31574 14.0619 3.21025C14.1571 3.10477 14.2105 2.96169 14.2105 2.81251V1.68751C14.2105 1.53832 14.1571 1.39525 14.0619 1.28976C13.9667 1.18427 13.8376 1.12501 13.703 1.12501Z" fill="#51718C" />
																</svg>
																<div className="hover">
																	刪除
																</div>
															</div>
														</div>
													</td>
												</tr>
											)
										})
									}
								</tbody>
							</table >
						</div>
						{/* 分頁 */}
						<div className={(pagearray === undefined) ? "none" : "active"}>
							<div className='center'>
								<div className='page'>
									<button onClick={() => this.handelGoNextPage(1, search)} className='one_page'>
										<svg width="14" height="18" viewBox="0 0 14 18" fill="#51718C" xmlns="http://www.w3.org/2000/svg">
											<path d="M12.6006 17.9991L14.0005 16.499L6.59997 8.99955L13.9994 1.49902L12.5993 -0.000877613L3.59997 8.99976L12.6006 17.9991Z" fill="#51718C" />
											<rect x="2.00061" y="18" width="2" height="18" transform="rotate(179.996 2.00061 18)" fill="#51718C" />
										</svg>
									</button>
									<div className='page_group'>
										{pagearray?.map((item, index) =>
											(<div key={`page${index}`} onClick={() => this.handelGoNextPage(item, search)} className={page === `${item}` ? 'features' : 'one_page'}>{item}</div>)
										)}
									</div>
									<button onClick={() => this.handelGoNextPage(maxpage, search)} className='one_page'>
										<svg width="14" height="18" viewBox="0 0 14 18" fill="#51718C" xmlns="http://www.w3.org/2000/svg">
											<path d="M1.4 0L0 1.5L7.4 9L0 16.5L1.4 18L10.4 9L1.4 0Z" fill="#51718C" />
											<rect x="12" width="2" height="18" fill="#51718C" />
										</svg>
									</button>
								</div>
							</div>
						</div>
					</BackLayout>
					{/* 彈跳視窗 */}
					{/* 新增 */}
					<div
						id='add'
						className={add ? "popup_background active" : "popup_background"}
						onClick={this.handelMouseDown}
					>
						<div className="window">
							<div className="form permission_form">
								<h1 className="title">
									新增角色
									<div className="close">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M24 2.4L21.6 0L12 9.6L2.4 0L0 2.4L9.6 12L0 21.6L2.4 24L12 14.4L21.6 24L24 21.6L14.4 12L24 2.4Z" fill="#51718C" />
										</svg>
										<div className="close_btn" onClick={(e) => this.drop_down('add')} />
									</div>
								</h1>
								<div className="inputContainer">
									<input
										type="text"
										className="input"
										placeholder=" "
										required="required"
										maxLength={20}
										id="newRoleName"
										value={newRoleName}
										onChange={this.handleInputChange.bind(this)}
									/>
									<label className="label">
										角色名
									</label>
								</div>
								<div className='permission_table'>
									<div className='small_title'>選擇權限</div>
									{PermissionList === undefined ? [] : PermissionList.map((item, index) =>
										<div key={`per${index}`} className='t'>
											<input
												id={item.Id}
												name='permission'
												type='checkbox'
												onChange={(e) => { this.handelSelectPermission(e) }}
											/>
											<span>{item.Name}</span>
										</div>
									)}
								</div>
								<div className='btn_block'>
									<button
										className="submitBtn"
										onClick={this.RoleAdd}
									>
										確定
									</button>
								</div>
							</div>
						</div>
					</div>
					{/* 修改 */}
					<div
						className={edit ? "popup_background active" : "popup_background"}
						onClick={this.handelMouseDown}
					>
						<div className="window">
							<div className="form permission_form">
								<h1 className="title">
									修改「{nowRole.Name}」權限
									<div className="close">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M24 2.4L21.6 0L12 9.6L2.4 0L0 2.4L9.6 12L0 21.6L2.4 24L12 14.4L21.6 24L24 21.6L14.4 12L24 2.4Z" fill="#51718C" />
										</svg>
										<div className="close_btn" onClick={(e) => this.drop_down('edit')} />
									</div>
								</h1>
								<div className='permission_table'>
									{PermissionList === undefined ? [] : PermissionList.map((item, index) =>
										<div key={`permission${index}`} className='t'>
											<input
												name='permission'
												id={item.Id}
												type='checkbox'
												checked={role_permission.includes(`${item.Id}`)}
												onChange={(e) => { this.handelSelectPermission(e) }} />
											<span>{item.Name}</span>
										</div>
									)}
								</div>
								<div className='btn_block'>
									<button
										className="submitBtn"
										onClick={this.ChangeRolePermission}
									>
										確定
									</button>
								</div>
							</div>
						</div>
					</div>
					{/* 刪除單筆 */}
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
									是否要刪除角色<br />
									「{Title[1]}」
								</h2>
								<div className='btn_block'>
									<button
										className="submitBtn"
										onClick={(e) => this.Delete(Title[0], e)}
									>
										確定
									</button>
								</div>
							</div>
						</div>
					</div>
					{/* 刪除多筆 */}
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
				</div>
			)
		}
	}
)