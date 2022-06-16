import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import BackLayout from '../../../../Components/Layout/back/BackLayout';
import '../../style/mainstyle.scss';
import { handleGetPage } from '../../../../Utils/MyClass';
import {
	GET_Project,
	DELETE_Project,
	GET_ProjectTypeAll
} from '../../../../Action/ProjectAction';

const mapStateToProps = state => {
	const { projectReducer } = state;
	return (
		projectReducer
	)
}

const mapDispatchToProps = dispatch => {
	return {
		GET_Project: (page, search, id, callback) => dispatch(GET_Project(page, search, id, callback)),
		GET_ProjectTypeAll: () => dispatch(GET_ProjectTypeAll()),
		DELETE_Project: (payload, callback) => dispatch(DELETE_Project(payload, callback)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(
	class CaseManage extends Component {
		state = {
			array: [],
			table_header: [
				"專案類型",
				"專案名",
				"相關標籤",
				"建立時間",
			],
			delO: false,
			delAll: false,
			now: {
				Id: "",
				Name: "",
				Record_count: "",
			}
		}
		//生命週期
		componentDidMount = () => {
			const { match } = this.props;
			const { params } = match;
			const nowpage = params.page;
			const nowsearch = params.search;
			const nowtype = params.ptype;
			this.setState({
				page: nowpage,
				search: nowsearch,
				ptype: nowtype,
			})
			const callback = (res) => {
				const pagearray = handleGetPage(nowpage, res.page);
				this.setState({
					pagearray,
					maxpage: res.page,
				})
			}
			this.props.GET_Project(nowpage, nowsearch, nowtype, callback);
			this.props.GET_ProjectTypeAll();
		}
		//換頁
		handleGoNextPage = (page, search = " ", ptype = " ") => {
			const callback = (res) => {
				const { match } = this.props;
				const { params } = match;
				const nowpage = params.page;
				const nowsearch = params.search;
				const nowtype = params.ptype;
				const pagearray = handleGetPage(nowpage, res.page);
				this.setState({
					pagearray,
					page: nowpage,
					search: nowsearch,
					ptype: nowtype,
					maxpage: res.page,
				})
			}
			this.props.history.push(`/casemanage/${page}/${search}/${ptype}`);
			this.props.GET_Project(page, search, ptype, callback);
		}
		//刪除
		Delete = (id) => {
			const { search, ptype } = this.state;
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
					array: [],
				})
				this.props.GET_Project(1, search, ptype);
				this.props.history.push(`/casemanage/1/${search}/${ptype}`);
			}
			this.props.DELETE_Project(id, callback);
		}
		//刪除多筆
		handleDeleteAll = () => {
			const { array } = this.state;
			let deletearray = "";
			for (let i = 0; i < array.length; i++) {
				deletearray += array[i] + ",";
			}
			this.Delete(deletearray);
		}
		//drop_down
		drop_down = (e) => {
			if (e === 'delO') {
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
		handleMouseDown = (e) => {
			if (e.target.className === "window") {
				this.setState({
					delO: false,
					delAll: false,
				})
			}
		}
		handleSetNow = (e) => {
			const { id } = e.target;
			const info = id.split(",")
			this.setState({
				now: {
					Id: info[0],
					Name: info[1],
					Record_count: info[2],
				},
			})
		}
		//不可以有空格
		handleInputChange = event => {
			const target = event.target;
			let { value, id } = target;
			if (id === 'search') {
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
				this.setState({
					[id]: value,
				});
			}
		}
		//全選
		handleAllChange = e => {
			const checkboxes = document.getElementsByName('Box');
			for (let i = 0; i < checkboxes.length; i++) {
				checkboxes[i].checked = e.target.checked;
				this.handleOnClick(checkboxes[i]);
			}
		}
		//單選
		handleOnClick = e => {
			const { Project } = this.props;
			let array = this.state.array;
			const num = Project.list.length;
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
		render() {
			const { table_header, array, delO, delAll, now, pagearray, page, search, maxpage, ptype } = this.state;
			const { Project, ProjectTypeAll } = this.props;
			return (
				<BackLayout>
					<div className='bg'>
						<div className="work">
							<div className="edit_button">
								<Link to='/casemanage/caseadd' className="work_btn add_btn">
									新增專案
								</Link>
								<button
									disabled={array.length === 0 ? true : false}
									className="work_btn delete_btn"
									onClick={() => this.drop_down('delAll')}>
									批量刪除
								</button>
							</div>
							<div className="searchform">
								<select
									id='ptype'
									value={ptype}
									onChange={this.handleInputChange.bind(this)}
								>
									<option value=" ">全部</option>
									{(ProjectTypeAll === undefined || ProjectTypeAll.length === 0) ? "" : ProjectTypeAll.map((item, index) =>
										<option key={`ptype${index}`} value={item.Id}>{item.Name}</option>
									)}
								</select>
								<input type="text" placeholder="搜尋" id="search" value={search} onChange={this.handleInputChange.bind(this)} />
								<input type="submit" value="送出" className="searchBtn" id="casesearch" onClick={() => this.handleGoNextPage(1, search.trim() === "" ? " " : search.trim(), ptype)} />
							</div>
						</div>
						<table className="col-12 admin_table">
							<thead>
								<tr>
									<th className="col-05 check">
										<input
											type="checkbox"
											name='AllChange'
											onChange={this.handleAllChange}
										/>
									</th>
									<th className="col-05">#</th>
									<th className="col-2">{table_header[0]}</th>
									<th className="">{table_header[1]}</th>
									<th className="col-3">{table_header[2]}</th>
									<th className="col-1_5">{table_header[3]}</th>
									<th className="col-1"></th>
								</tr>
							</thead>
							<tbody>
								{(Project === undefined || Project.list.length === 0) ?
									<tr>
										<td className='nocontent' colSpan={table_header === undefined ? "1" : table_header.length + 3}>
											暫無資料
										</td>
									</tr>
									: Project.list.map(
										(item, index) => {
											return (
												<tr key={`checkbox${index}`} className={array.includes(`${item.Id}`) ? "onchange" : ""}>
													<td className="check">
														<input type="checkbox"
															name="Box"
															value={item.Id}
															onChange={(e) => { this.handleOnClick(e.target) }}
														/>
													</td>
													<td>{index + 1}</td>
													<td>{item.Type_name}</td>
													<td>{item.Name}</td>
													<td>
														<div className='list_tag'>
															{item.Tag.map((item, index) => {
																return (
																	<div key={`listtag${index}`} className='tag'>
																		{item.Name}
																	</div>
																)
															})}
														</div>
													</td>
													<td>{item.CreateTime.substr(0, 10)}</td>
													<td>
														<div className="action">
															<Link to={`/casemanage/caseinfo/${item.Id}/1/ `} className="svg">
																<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
																	<path
																		d="M17.5375 2.83605L15.1747 0.463507C14.5232 -0.190681 13.4207 -0.147876 12.7142 0.563335C12.0076 1.27278 11.9615 2.3815 12.6148 3.03568L14.9776 5.40822C15.6291 6.06241 16.7315 6.01963 17.4398 5.3084C18.1464 4.59719 18.1908 3.49203 17.5375 2.83605ZM2.47467 10.8432L7.20033 15.5882L14.88 7.87883L10.1543 3.13374L2.47467 10.8432ZM0 18L6.23283 16.7469L1.24799 11.7415L0 18Z" fill="#51718C" />
																</svg>
																<div className="hover">
																	編輯
																</div>
															</Link>
															<div onClick={() => this.drop_down('delO')} className="svg">
																<svg id={`${item.Id},${item.Name},${item.Record_count}`} onClick={this.handleSetNow.bind()}
																	width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
																	<path id={`${item.Id},${item.Name},${item.Record_count}`} onClick={this.handleSetNow.bind()}
																		d="M1.01504 16.3125C1.01504 16.7601 1.17545 17.1893 1.46098 17.5058C1.74652 17.8222 2.13379 18 2.53759 18H11.6729C12.0767 18 12.464 17.8222 12.7495 17.5058C13.0351 17.1893 13.1955 16.7601 13.1955 16.3125V4.50001H1.01504V16.3125ZM9.64286 7.31251C9.64286 7.16332 9.69633 7.02025 9.79151 6.91476C9.88668 6.80927 10.0158 6.75001 10.1504 6.75001C10.285 6.75001 10.4141 6.80927 10.5092 6.91476C10.6044 7.02025 10.6579 7.16332 10.6579 7.31251V15.1875C10.6579 15.3367 10.6044 15.4798 10.5092 15.5853C10.4141 15.6908 10.285 15.75 10.1504 15.75C10.0158 15.75 9.88668 15.6908 9.79151 15.5853C9.69633 15.4798 9.64286 15.3367 9.64286 15.1875V7.31251ZM6.59774 7.31251C6.59774 7.16332 6.65122 7.02025 6.74639 6.91476C6.84157 6.80927 6.97066 6.75001 7.10526 6.75001C7.23987 6.75001 7.36896 6.80927 7.46413 6.91476C7.55931 7.02025 7.61278 7.16332 7.61278 7.31251V15.1875C7.61278 15.3367 7.55931 15.4798 7.46413 15.5853C7.36896 15.6908 7.23987 15.75 7.10526 15.75C6.97066 15.75 6.84157 15.6908 6.74639 15.5853C6.65122 15.4798 6.59774 15.3367 6.59774 15.1875V7.31251ZM3.55263 7.31251C3.55263 7.16332 3.6061 7.02025 3.70128 6.91476C3.79646 6.80927 3.92555 6.75001 4.06015 6.75001C4.19475 6.75001 4.32384 6.80927 4.41902 6.91476C4.5142 7.02025 4.56767 7.16332 4.56767 7.31251V15.1875C4.56767 15.3367 4.5142 15.4798 4.41902 15.5853C4.32384 15.6908 4.19475 15.75 4.06015 15.75C3.92555 15.75 3.79646 15.6908 3.70128 15.5853C3.6061 15.4798 3.55263 15.3367 3.55263 15.1875V7.31251ZM13.703 1.12501H9.89662L9.59845 0.467584C9.53529 0.327035 9.43799 0.208807 9.31751 0.126203C9.19703 0.0435979 9.05814 -0.000106452 8.91647 6.16385e-06H5.29088C5.14953 -0.000596082 5.01089 0.0429453 4.89083 0.125642C4.77078 0.208338 4.67417 0.326845 4.61208 0.467584L4.31391 1.12501H0.507519C0.372916 1.12501 0.243827 1.18427 0.148649 1.28976C0.0534706 1.39525 0 1.53832 0 1.68751L0 2.81251C0 2.96169 0.0534706 3.10477 0.148649 3.21025C0.243827 3.31574 0.372916 3.37501 0.507519 3.37501H13.703C13.8376 3.37501 13.9667 3.31574 14.0619 3.21025C14.1571 3.10477 14.2105 2.96169 14.2105 2.81251V1.68751C14.2105 1.53832 14.1571 1.39525 14.0619 1.28976C13.9667 1.18427 13.8376 1.12501 13.703 1.12501Z" fill="#51718C" />
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
								<button onClick={() => this.handleGoNextPage(1, search)} className='one_page'>
									<svg width="14" height="18" viewBox="0 0 14 18" fill="#51718C" xmlns="http://www.w3.org/2000/svg">
										<path d="M12.6006 17.9991L14.0005 16.499L6.59997 8.99955L13.9994 1.49902L12.5993 -0.000877613L3.59997 8.99976L12.6006 17.9991Z" fill="#51718C" />
										<rect x="2.00061" y="18" width="2" height="18" transform="rotate(179.996 2.00061 18)" fill="#51718C" />
									</svg>
								</button>
								<div className='page_group'>
									{pagearray?.map((item, index) =>
										(<div key={`page${index}`} onClick={() => this.handleGoNextPage(item, search)} className={page === `${item}` ? 'features' : 'one_page'}>{item}</div>)
									)}
								</div>
								<button onClick={() => this.handleGoNextPage(maxpage, search)} className='one_page'>
									<svg width="14" height="18" viewBox="0 0 14 18" fill="#51718C" xmlns="http://www.w3.org/2000/svg">
										<path d="M1.4 0L0 1.5L7.4 9L0 16.5L1.4 18L10.4 9L1.4 0Z" fill="#51718C" />
										<rect x="12" width="2" height="18" fill="#51718C" />
									</svg>
								</button>
							</div>
						</div>
					</div>
					{/* 刪除單筆 */}
					<div
						className={delO ? "popup_background active" : "popup_background"}
						onClick={this.handleMouseDown}
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
									「{now === undefined ? "" : now.Name}」已有 {now === undefined ? "" : now.Record_count} 筆記錄<br />
									是否刪除
								</h2>
								<div className='btn_block'>
									<button
										className="submitBtn"
										onClick={(e) => this.Delete(now === undefined ? "" : now.Id, e)}
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
						onClick={this.handleMouseDown}
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
										onClick={() => this.handleDeleteAll()}
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