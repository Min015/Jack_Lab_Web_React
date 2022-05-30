import { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import MemberLayout from '../../../../Components/Layout/front/member/MemberLayout';
import './projectInfo.scss';
import '../../../../Mixin/popup_window.scss';

import {
	GET_Project,
	DELETE_Project,
	GET_ProjectInfo,
	GET_ProjectRecord,
	POST_AddProjectRecord,
	GET_RecordFile,
	DELETE_ProjectRecord,
	POST_UpdateProjectRecord,
} from '../../../../Action/ProjectAction';

const mapStateToProps = state => {
	return {
		PublicMemberList: state.memberReducer.PublicMemberList,
		ProjectTypeAll: state.projectReducer.ProjectTypeAll,
		ProjectInfo: state.projectReducer.ProjectInfo,
		ProjectRecord: state.projectReducer.ProjectRecord,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		GET_Project: (page, search, id, callback) => dispatch(GET_Project(page, search, id, callback)),
		DELETE_Project: (payload, callback) => dispatch(DELETE_Project(payload, callback)),
		GET_ProjectInfo: (payload, callback) => dispatch(GET_ProjectInfo(payload, callback)),
		GET_ProjectRecord: (payload, page, search, callback) => dispatch(GET_ProjectRecord(payload, page, search, callback)),
		POST_AddProjectRecord: (payload, callback) => dispatch(POST_AddProjectRecord(payload, callback)),
		GET_RecordFile: (payload) => dispatch(GET_RecordFile(payload)),
		DELETE_ProjectRecord: (payload, callback) => dispatch(DELETE_ProjectRecord(payload, callback)),
		POST_UpdateProjectRecord: (payload, callback) => dispatch(POST_UpdateProjectRecord(payload, callback)),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(
	class ProjectInfo extends Component {
		state = {
			drop: false,
			add: false,
			edit: false,
			delO: false,
			delAll: false,
			disabled: false,
			upload: {},
			table_header: [
				"備註",
				"上傳者",
				"上傳時間",
				"操作"
			],

			participate: [],//已選擇
			long: 0,//一個tag的長度
			tag: [],//已輸入的tag
			all_file_max_size: 1024 * 1024 * 50,//50M
			one_file_max_size: 1024 * 1024 * 30,//30M
			mimes_type: ['zip', '7z', 'rar', 'svg', 'png', 'jpg', 'jpeg', 'csv', 'txt', 'xlx', 'xls', 'xlsx', 'pdf', 'doc', 'docx', 'ppt', 'pptx'],//媒體類型
			title: "",
			content: "",
			type: "",
			Id: "",
			array: [],
			download: false,
			remark: "",
		}
		//生命週期
		componentDidMount = async () => {
			const { match } = this.props;
			const { params } = match;
			const nowid = params.id;
			const nowpage = params.page;
			const nowsearch = params.search;
			this.setState({
				Id: nowid,
				page: nowpage,
				search: nowsearch,
			})
			const callbackRecord = (res) => {
				this.setState({
					maxpage: res.page,
				})
				this.handleGetPage(nowpage, res.page);
			}
			this.props.GET_ProjectInfo(nowid);
			this.props.GET_ProjectRecord(nowid, nowpage, nowsearch, callbackRecord);
		}
		//取得頁面
		handleGetPage = (nowpage, maxpage) => {
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
		handleGoNextPage = (page, search = " ") => {
			const { Id } = this.state;
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
				this.handleGetPage(nowpage, res.page);
			}
			this.props.history.push(`/project/projectinfo/${Id}/${page}/${search}`);
			this.props.GET_ProjectRecord(Id, page, search, callback);
		}
		//新增專案記錄
		AddProjectRecord = () => {
			const { Id, page, search } = this.state;
			const { upload, remark } = this.state;
			if (remark !== "" && upload.name !== undefined) {
				let data = new FormData();
				data.append('Project_Id', Id);
				data.append('Remark', remark);
				data.append('File', upload);
				const callback = () => {
					this.props.GET_ProjectRecord(Id, page, search);
					this.setState({
						add: false,
						remark: "",
						upload: {},
					})
				}
				this.props.POST_AddProjectRecord(data, callback);
			}
			else {
				alert("請輸入備註及選擇檔案");
			}
		}
		//下載專案記錄
		DownloadFile = () => {
			const { nowRecord } = this.state;
			this.props.GET_RecordFile(nowRecord.File.Id);
		}
		//更新專案記錄
		UpdateProjectRecord = () => {
			const { Id, page, search } = this.state;
			const { upload, remark, nowRecord } = this.state;
			if (remark !== "") {
				let data = new FormData();
				data.append('_method', 'PUT');
				data.append('Id', nowRecord.Id);
				data.append('Remark', remark);
				if (upload.name !== undefined) {
					data.append('File', upload);
				}
				const callback = () => {
					this.setState({
						edit: false,
						remark: "",
						upload: {},
					})
					this.props.GET_ProjectRecord(Id, page, search);
				}
				this.props.POST_UpdateProjectRecord(data, callback);
			}
			else {
				alert("請輸入備註");
			}
		}
		//刪除專案紀錄
		Delete = (id) => {
			const { Id, search } = this.state;
			const callback = () => {
				this.setState({
					delO: false,
					delAll: false,
					array: [],
				})
				this.handleGoNextPage(1,);
				this.props.history.push(`/project/projectinfo/${Id}/1/${search} `);
			}
			this.props.DELETE_ProjectRecord(id, callback);
		}
		//刪除專案
		DeleteProject = (id) => {
			const { search } = this.state;
			const callback = () => {
				this.setState({
					delO: false,
					delAll: false,
					array: [],
				})
				this.props.GET_Project(1, search);
				this.props.history.push(`/project/1/${search}/ `);
			}
			this.props.DELETE_Project(id, callback);
		}
		//選檔案
		handleSelectFile = (files) => {
			let nowsize = 0;
			const { all_file_max_size, one_file_max_size, mimes_type } = this.state;
			let array = [];
			for (let index = 0; index < files.length; index++) {
				const file_type = files[index].name.split(".").pop();
				if (!mimes_type.includes(file_type)) {
					const media_type = mimes_type.map((item) => ` ${item}`);
					alert(`上傳檔案類型錯誤,請選擇${media_type}類型的檔案`);
				}
				else {
					const thissize = files[index].size;
					nowsize += thissize;
					if (thissize > one_file_max_size || nowsize > all_file_max_size) {
						alert("檔案過大，請重新選擇(單個檔案勿超過30M，總大小物超過50M");
					}
					else {
						array.push(files[index]);
					}
				}
			}
			this.setState({
				upload: array[0]
			})
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
		//可以空格
		handleCanEnter = event => {
			const target = event.target;
			let { value, id } = target;
			this.setState({
				[id]: value,
			});
		}
		//drop_down
		drop_down = (e) => {
			if (e === 'add') {
				this.setState({
					add: !this.state.add,
					remark: "",
					upload: {},
				})
			}
			else if (e === 'edit') {
				this.setState({
					edit: !this.state.edit,
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
			else if (e === 'download') {
				this.setState({
					download: !this.state.download,
				})
			}
		}
		//下拉式選人關閉&關閉視窗
		handleMouseDown = (e) => {
			if (e.target.className === "window") {
				this.setState({
					edit: false,
					add: false,
					delO: false,
					delAll: false,
					download: false,
					remark: "",
					upload: {},
				})
			}
		}
		handleSetNow = (e) => {
			const { id } = e.target;
			const info = id.split(",")
			this.setState({
				nowRecord: {
					Id: info[0],
					Remark: info[1],
					File: {
						Id: info[2],
						Name: info[3]
					},
					Uploader_name: info[4],
				},
				remark: info[1],
			});
		}
		render() {
			const { Id, table_header, add, edit, delO, delAll, download, upload, remark, nowRecord } = this.state;
			const { pagearray, page, search, maxpage } = this.state;
			const { ProjectRecord, ProjectInfo } = this.props;
			return (
				<div id='project_info'>
					<MemberLayout>
						<div className="add_title">
							<div className="title_name">
								<h2>{ProjectInfo === undefined ? "" : ProjectInfo.Name}
									<div className="tag">
										{ProjectInfo === undefined ? "" : ProjectInfo.Tag?.map((item, index) => {
											return (
												<div key={index} className="small_tag">
													{item.Name}
												</div>
											)
										})}
									</div></h2>
							</div>
							<div className="edit_button">
								<div className="add">
									<div
										className='func_btn'
										onClick={() => this.drop_down('add')}
									>
										<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M9.84375 11.8945H7.62891C7.58539 11.8945 7.54366 11.9118 7.5129 11.9426C7.48213 11.9734 7.46484 12.0151 7.46484 12.0586V13.043C7.46484 13.0865 7.48213 13.1282 7.5129 13.159C7.54366 13.1897 7.58539 13.207 7.62891 13.207H9.84375V15.4219C9.84375 15.4654 9.86103 15.5071 9.8918 15.5379C9.92257 15.5687 9.9643 15.5859 10.0078 15.5859H10.9922C11.0357 15.5859 11.0774 15.5687 11.1082 15.5379C11.139 15.5071 11.1562 15.4654 11.1562 15.4219V13.207H13.3711C13.4146 13.207 13.4563 13.1897 13.4871 13.159C13.5179 13.1282 13.5352 13.0865 13.5352 13.043V12.0586C13.5352 12.0151 13.5179 11.9734 13.4871 11.9426C13.4563 11.9118 13.4146 11.8945 13.3711 11.8945H11.1562V9.67969C11.1562 9.63618 11.139 9.59445 11.1082 9.56368C11.0774 9.53291 11.0357 9.51562 10.9922 9.51562H10.0078C9.9643 9.51562 9.92257 9.53291 9.8918 9.56368C9.86103 9.59445 9.84375 9.63618 9.84375 9.67969V11.8945ZM17.526 5.92061C17.649 6.04365 17.7188 6.20977 17.7188 6.38408V19.0312C17.7188 19.3942 17.4255 19.6875 17.0625 19.6875H3.9375C3.57451 19.6875 3.28125 19.3942 3.28125 19.0312V1.96875C3.28125 1.60576 3.57451 1.3125 3.9375 1.3125H12.6472C12.8215 1.3125 12.9896 1.38223 13.1127 1.50527L17.526 5.92061ZM16.2053 6.68555L12.3457 2.82598V6.68555H16.2053Z" fill="white" />
										</svg>
										<p>新增記錄</p>
									</div>
								</div>
								<div className="add">
									<Link to={`/project/updateproject/${Id}`}>
										<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M18.5118 2.99361L16.0177 0.489257C15.33 -0.201275 14.1663 -0.156091 13.4205 0.594632C12.6747 1.34349 12.626 2.51381 13.3156 3.20432L15.8097 5.70867C16.4974 6.39921 17.661 6.35405 18.4087 5.60331C19.1545 4.85259 19.2014 3.68603 18.5118 2.99361ZM2.61215 11.4456L7.60035 16.4543L15.7066 8.31654L10.7184 3.30784L2.61215 11.4456ZM0 19L6.5791 17.6773L1.31732 12.3938L0 19Z" fill="white" />
										</svg>
										<p>修改專案</p>
									</Link>
								</div>
								<div className="add">
									<div
										className='func_btn'
										onClick={() => this.drop_down('delAll')}
									>
										<svg width="15" height="19" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
											<g clip-path="url(#clip0_450_27)">
												<path d="M1.07143 17.2188C1.07143 17.6912 1.24075 18.1442 1.54215 18.4783C1.84355 18.8123 2.25233 19 2.67857 19H12.3214C12.7477 19 13.1565 18.8123 13.4578 18.4783C13.7592 18.1442 13.9286 17.6912 13.9286 17.2188V4.75001H1.07143V17.2188ZM10.1786 7.71876C10.1786 7.56129 10.235 7.41026 10.3355 7.29891C10.4359 7.18756 10.5722 7.12501 10.7143 7.12501C10.8564 7.12501 10.9926 7.18756 11.0931 7.29891C11.1936 7.41026 11.25 7.56129 11.25 7.71876V16.0313C11.25 16.1887 11.1936 16.3398 11.0931 16.4511C10.9926 16.5625 10.8564 16.625 10.7143 16.625C10.5722 16.625 10.4359 16.5625 10.3355 16.4511C10.235 16.3398 10.1786 16.1887 10.1786 16.0313V7.71876ZM6.96429 7.71876C6.96429 7.56129 7.02073 7.41026 7.12119 7.29891C7.22166 7.18756 7.35792 7.12501 7.5 7.12501C7.64208 7.12501 7.77834 7.18756 7.87881 7.29891C7.97927 7.41026 8.03571 7.56129 8.03571 7.71876V16.0313C8.03571 16.1887 7.97927 16.3398 7.87881 16.4511C7.77834 16.5625 7.64208 16.625 7.5 16.625C7.35792 16.625 7.22166 16.5625 7.12119 16.4511C7.02073 16.3398 6.96429 16.1887 6.96429 16.0313V7.71876ZM3.75 7.71876C3.75 7.56129 3.80644 7.41026 3.90691 7.29891C4.00737 7.18756 4.14363 7.12501 4.28571 7.12501C4.42779 7.12501 4.56406 7.18756 4.66452 7.29891C4.76499 7.41026 4.82143 7.56129 4.82143 7.71876V16.0313C4.82143 16.1887 4.76499 16.3398 4.66452 16.4511C4.56406 16.5625 4.42779 16.625 4.28571 16.625C4.14363 16.625 4.00737 16.5625 3.90691 16.4511C3.80644 16.3398 3.75 16.1887 3.75 16.0313V7.71876ZM14.4643 1.18751H10.4464L10.1317 0.493561C10.065 0.345203 9.96233 0.220408 9.83515 0.133214C9.70798 0.04602 9.56137 -0.000112366 9.41183 6.50628e-06H5.58482C5.43562 -0.000629197 5.28927 0.0453312 5.16255 0.132622C5.03582 0.219913 4.93385 0.345003 4.8683 0.493561L4.55357 1.18751H0.535714C0.393634 1.18751 0.257373 1.25006 0.156907 1.36141C0.0564412 1.47276 0 1.62378 0 1.78126L0 2.96876C0 3.12623 0.0564412 3.27725 0.156907 3.3886C0.257373 3.49995 0.393634 3.56251 0.535714 3.56251H14.4643C14.6064 3.56251 14.7426 3.49995 14.8431 3.3886C14.9436 3.27725 15 3.12623 15 2.96876V1.78126C15 1.62378 14.9436 1.47276 14.8431 1.36141C14.7426 1.25006 14.6064 1.18751 14.4643 1.18751Z" fill="white" />
											</g>
											<defs>
												<clipPath id="clip0_450_27">
													<rect width="15" height="19" fill="white" />
												</clipPath>
											</defs>
										</svg>
										<p>刪除專案</p>
									</div>
								</div>
							</div>
						</div>
						<div className="project_content something_content">
							{ProjectInfo === undefined ? "" : ProjectInfo.Description}
						</div>
						<div className={(ProjectRecord === undefined) ? 'none' : 'active'}>
							<div className="works_area">
								<div className="select_list">
									<input type="text" placeholder="輸入搜尋值" className="search" id="search" value={search} onChange={this.handleInputChange.bind(this)} />
									<input type="submit" value="送出" className="submit" onClick={() => this.handleGoNextPage(1, search)} />
								</div>
							</div>

							<div className="reaults_area">
								<table>
									<thead>
										<tr>
											<th>{table_header[0]}</th>
											<th className="col-1">{table_header[1]}</th>
											<th className="col-2">{table_header[2]}</th>
											<th className="col-1_5">{table_header[3]}</th>
										</tr>
									</thead>
									<tbody>
										{ProjectRecord === undefined ? [] : ProjectRecord.list.map(
											(item, index) => {
												return (
													<tr className={index % 2 === 0 ? 'tr_odd' : 'tr_even'}>
														<td>{item.Remark}</td>
														<td>{item.Uploader_name}</td>
														<td>{item.CreateTime}</td>
														<td>
															<div className="action">
																<div onClick={() => this.drop_down('download')} className="svg">
																	<svg id={`${item.Id},${item.Remark},${item.File.Id},${item.File.Name},${item.Uploader_name}`} onClick={this.handleSetNow.bind()}
																		width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path id={`${item.Id},${item.Remark},${item.File.Id},${item.File.Name},${item.Uploader_name}`} onClick={this.handleSetNow.bind()}
																			d="M9.3726 1.8H17.1C17.3387 1.8 17.5676 1.89482 17.7364 2.0636C17.9052 2.23239 18 2.46131 18 2.7V15.3C18 15.5387 17.9052 15.7676 17.7364 15.9364C17.5676 16.1052 17.3387 16.2 17.1 16.2H0.9C0.661305 16.2 0.432387 16.1052 0.263604 15.9364C0.0948211 15.7676 0 15.5387 0 15.3V0.9C0 0.661305 0.0948211 0.432387 0.263604 0.263604C0.432387 0.0948211 0.661305 0 0.9 0H7.5726L9.3726 1.8Z" fill="#51718C" />
																		<path id={`${item.Id},${item.Remark},${item.File.Id},${item.File.Name},${item.Uploader_name}`} onClick={this.handleSetNow.bind()}
																			d="M9.8999 8.9999V5.3999H8.0999V8.9999H5.3999L8.9999 12.5999L12.5999 8.9999H9.8999Z" fill="white" />
																	</svg>
																	<div className="hover">
																		下載
																	</div>
																</div>
																<div onClick={() => this.drop_down('edit')} className="svg">
																	<svg id={`${item.Id},${item.Remark},${item.File.Id},${item.File.Name},${item.Uploader_name}`} onClick={this.handleSetNow.bind()}
																		width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path id={`${item.Id},${item.Remark},${item.File.Id},${item.File.Name},${item.Uploader_name}`} onClick={this.handleSetNow.bind()}
																			d="M17.5375 2.83605L15.1747 0.463507C14.5232 -0.190681 13.4207 -0.147876 12.7142 0.563335C12.0076 1.27278 11.9615 2.3815 12.6148 3.03568L14.9776 5.40822C15.6291 6.06241 16.7315 6.01963 17.4398 5.3084C18.1464 4.59719 18.1908 3.49203 17.5375 2.83605ZM2.47467 10.8432L7.20033 15.5882L14.88 7.87883L10.1543 3.13374L2.47467 10.8432ZM0 18L6.23283 16.7469L1.24799 11.7415L0 18Z" fill="#51718C" />
																	</svg>
																	<div className="hover">
																		編輯
																	</div>
																</div>
																<div onClick={() => this.drop_down('delO')} className="svg">
																	<svg id={`${item.Id},${item.Remark},${item.File.Id},${item.File.Name},${item.Uploader_name}`} onClick={this.handleSetNow.bind()}
																		width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path id={`${item.Id},${item.Remark},${item.File.Id},${item.File.Name},${item.Uploader_name}`} onClick={this.handleSetNow.bind()}
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
										<button onClick={() => this.handleGoNextPage(1, search)} className='features'>
											<svg width="14" height="18" viewBox="0 0 14 18" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
												<path d="M12.6006 17.9991L14.0005 16.499L6.59997 8.99955L13.9994 1.49902L12.5993 -0.000877613L3.59997 8.99976L12.6006 17.9991Z" fill="#ffffff" />
												<rect x="2.00061" y="18" width="2" height="18" transform="rotate(179.996 2.00061 18)" fill="#ffffff" />
											</svg>
										</button>
										<div className='page_group'>
											{pagearray?.map((item, index) =>
												(<div key={`page${index}`} onClick={() => this.handleGoNextPage(item, search)} className={page === `${item}` ? 'features' : 'one_page'}>{item}</div>)
											)}
										</div>
										<button onClick={() => this.handleGoNextPage(maxpage, search)} className='features'>
											<svg width="14" height="18" viewBox="0 0 14 18" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
												<path d="M1.4 0L0 1.5L7.4 9L0 16.5L1.4 18L10.4 9L1.4 0Z" fill="#ffffff" />
												<rect x="12" width="2" height="18" fill="#ffffff" />
											</svg>
										</button>
									</div>
								</div>
							</div>
						</div>
					</MemberLayout>
					{/* 新增專案記錄 */}
					<div
						className={add ? "popup_background active" : "popup_background"}
						onClick={this.handleMouseDown}
					>
						<div className="window">
							<div className="form">
								<h1 className="title">
									新增專案記錄
									<div className="close">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M24 2.4L21.6 0L12 9.6L2.4 0L0 2.4L9.6 12L0 21.6L2.4 24L12 14.4L21.6 24L24 21.6L14.4 12L24 2.4Z" fill="#51718C" />
										</svg>
										<div className="close_btn" onClick={() => this.drop_down('add')} />
									</div>
								</h1>
								<div className='col-12 enter'>
									<textarea
										className='long_text'
										maxLength={500}
										id="remark"
										value={remark}
										onChange={this.handleCanEnter.bind(this)}
									/>
									<label className="label">備註*</label>
								</div>
								<div id="filename">
									{upload === undefined ? "" : upload.name}
								</div>
								<div className='enter'>
									<input type='file' id='f' onChange={e => this.handleSelectFile(e.target.files)} />
									<label htmlFor='f' className='nowfile'>
										上傳檔案
									</label>
								</div>
								<div className='btn_block'>
									<button
										className="submitBtn"
										onClick={this.AddProjectRecord}>
										新增
									</button>
								</div>
							</div>
						</div>
					</div>
					{/* 下載記錄檔案 */}
					<div
						className={download ? "popup_background active" : "popup_background"}
						onClick={this.handleMouseDown}
					>
						<div className="window">
							<div className="form">
								<h1 className="title">
									下載記錄檔案
									<div className="close">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M24 2.4L21.6 0L12 9.6L2.4 0L0 2.4L9.6 12L0 21.6L2.4 24L12 14.4L21.6 24L24 21.6L14.4 12L24 2.4Z" fill="#51718C" />
										</svg>
										<div className="close_btn" onClick={() => this.drop_down('download')} />
									</div>
								</h1>
								<div className='margin_t15'>
									<label className="label">檔名</label>
									<div>{nowRecord === undefined ? "" : nowRecord.File.Name} </div>
								</div>
								<div className='col-12 enter'>
									<textarea
										value={nowRecord === undefined ? "" : nowRecord.Remark}
										disabled
										className='long_text' />
									<label className="label">備註</label>
								</div>
								<div className='margin_t15'>
									<label className="label">上傳者</label>
									<div>{nowRecord === undefined ? "" : nowRecord.Uploader_name} </div>
								</div>
								<div className='btn_block'>
									<button
										className="submitBtn"
										onClick={this.DownloadFile}>
										下載
									</button>
								</div>
							</div>
						</div>
					</div>
					{/* 修改專案記錄 */}
					<div
						className={edit ? "popup_background active" : "popup_background"}
						onClick={this.handleMouseDown}
					>
						<div className="window">
							<div className="form">
								<h1 className="title">
									修改專案記錄
									<div className="close">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M24 2.4L21.6 0L12 9.6L2.4 0L0 2.4L9.6 12L0 21.6L2.4 24L12 14.4L21.6 24L24 21.6L14.4 12L24 2.4Z" fill="#51718C" />
										</svg>
										<div className="close_btn" onClick={() => this.drop_down('edit')} />
									</div>
								</h1>
								<div className='margin_t15'>
									<label className="label">原檔案</label>
									<div>{nowRecord === undefined ? "" : nowRecord.File.Name} </div>
								</div>
								<div className='col-12 enter'>
									<textarea
										maxLength={50}
										id='remark'
										value={remark}
										onChange={this.handleInputChange.bind(this)}
										className='long_text' />
									<label className="label">備註<div className='error_msg'>{remark.errormsg}</div></label>
								</div>
								<div className={upload.length === 0 ? "" : "margin_t15"}>
									<label className="label">{upload.length === 0 ? "" : "新檔案"}</label>
									<div id="filename">
										{upload === undefined ? "" : upload.name}
									</div>
								</div>
								<div className='enter'>
									<input type='file' id='f' onChange={e => this.handleSelectFile(e.target.files)} />
									<label htmlFor='f' className='nowfile'>
										上傳新檔案
									</label>
								</div>
								<div className='btn_block'>
									<button
										className="submitBtn"
										onClick={this.UpdateProjectRecord}
									>
										更新
									</button>
								</div>
							</div>
						</div>
					</div>
					{/* 刪除專案紀錄 */}
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
									是否要刪除專案記錄<br />
									「{nowRecord === undefined ? "" : nowRecord.File.Name}」
								</h2>
								<div className='btn_block'>
									<button
										className="submitBtn"
										onClick={(e) => this.Delete(nowRecord === undefined ? "" : nowRecord.Id, e)}
									>
										確定
									</button>
								</div>
							</div>
						</div>
					</div>
					{/* 刪除專案 */}
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
									是否要刪除專案記錄<br />
									「{ProjectInfo === undefined ? "" : ProjectInfo.Name}」
								</h2>
								<div className='btn_block'>
									<button
										className="submitBtn"
										onClick={(e) => this.DeleteProject(ProjectInfo === undefined ? "" : ProjectInfo.Id, e)}
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