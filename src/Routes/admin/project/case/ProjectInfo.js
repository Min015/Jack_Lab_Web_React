import { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import BackLayout from '../../../../Components/Layout/back/BackLayout';
import '../../../../Mixin/popup_window.scss';
import '../../style/info.scss';

import search from '../../style/img/searchButton.png';

import { GET_PublicMembers } from '../../../../Action/MemberAction';
import {
	GET_ProjectInfo,
	GET_ProjectType,
	PUT_UpdateProject,
	POST_AddProjectRecord,
	GET_RecordFile,
	DELETE_ProjectRecord,
	POST_UpdateProjectRecord,
} from '../../../../Action/ProjectAction';

const mapStateToProps = state => {
	console.log(state);
	return {
		PublicMemberList: state.memberReducer.PublicMemberList,
		ProjectType: state.projectReducer.ProjectType,
		ProjectInfo: state.projectReducer.ProjectInfo,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		GET_ProjectType: () => dispatch(GET_ProjectType()),
		GET_PublicMembers: () => dispatch(GET_PublicMembers()),
		GET_ProjectInfo: (payload, callback) => dispatch(GET_ProjectInfo(payload, callback)),
		PUT_UpdateProject: (payload) => dispatch(PUT_UpdateProject(payload)),
		POST_AddProjectRecord: (payload) => dispatch(POST_AddProjectRecord(payload)),
		GET_RecordFile: (payload) => dispatch(GET_RecordFile(payload)),
		DELETE_ProjectRecord: (payload) => dispatch(DELETE_ProjectRecord(payload)),
		POST_UpdateProjectRecord: (payload) => dispatch(POST_UpdateProjectRecord(payload)),

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(
	class ProjectInfo extends Component {
		state = {
			participate: [],//已選擇
			long: 0,//一個tag的長度
			tag: [],//已輸入的tag
			drop: false,
			disabled: false,
			all_file_max_size: 1024 * 1024 * 50,//50M
			one_file_max_size: 1024 * 1024 * 30,//30M
			mimes_type: ['zip', '7z', 'rar', 'svg', 'png', 'jpg', 'jpeg', 'csv', 'txt', 'xlx', 'xls', 'xlsx', 'pdf', 'doc', 'docx', 'ppt', 'pptx'],//媒體類型
			title: {
				value: "",
				errormsg: "*",
			},
			content: {
				value: "",
				errormsg: "*",
			},
			member: {
				errormsg: "*",
			},
			type: {
				value: "",
				errormsg: "*",
			},
			Id: "",
			array: [],
			upload: [],
			table_header: [
				// "檔名",
				"備註",
				"上傳時間",
			],
			add: false,
			edit: false,
			delO: false,
			delAll: false,
			download: false,
			remark: {
				value: "",
				errormsg: "*",
			}
		}
		componentDidMount = async () => {
			const { match } = this.props;
			const { params } = match;
			this.setState({
				Id: params.id,
			})
			const callback = (res) => {
				this.setState({
					oldData: res,
					title: { value: res.Name, },
					content: { value: res.Description, },
					participate: res.Member.map((item) => {
						return {
							account: item.Account,
							name: item.Name
						};
					}),
					type: {
						value: res.Type_id,
					},
					Creater_name: res.Creater_name,
					member: { errormsg: "" },
					tag: res.Tag.map(item => item.Name),
					Record: res.Record,
				})
			}
			this.props.GET_PublicMembers();
			this.props.GET_ProjectInfo(params.id, callback);
		}
		//修改專案
		EditProject = () => {
			const { title, content, participate, tag, member, type, Id } = this.state;
			const errormsg = "*";
			if (title.errormsg !== errormsg && content.errormsg !== errormsg && member.errormsg !== errormsg && type.errormsg !== errormsg) {
				const addmember = participate?.map((item) => { return (item.account) });
				const payload = {
					Id: Id,
					Name: title.value,
					Description: content.value,
					Proj_type: type.value,
					Tag: tag,
					Member: addmember,
				}
				this.props.PUT_UpdateProject(payload);
				this.props.history.push("/casemanage");
			}
			else {
				alert("您有必填欄位尚未填寫，請確認");
			}
		}
		//新增專案記錄
		AddProjectRecord = () => {
			const { upload, remark, Id } = this.state;
			if (upload.length === 0 || remark.value === "") {
				alert("請輸入備註及選擇檔案");
			}
			else {
				let data = new FormData();
				data.append('Project_Id', Id);
				data.append('Remark', remark.value);
				data.append('File', upload[0]);
				this.props.POST_AddProjectRecord(data);
			}
		}
		//下載專案記錄
		DownloadFile = () => {
			const { nowRecord } = this.state;
			this.props.GET_RecordFile(nowRecord.File.Id);
		}
		//更新專案記錄
		UpdateProjectRecord = () => {
			const { upload, remark, nowRecord } = this.state;
			if ((remark.value === nowRecord.Remark && upload.length === 0)) {
				alert("尚未更新");
			}
			else {
				let data = new FormData();
				data.append('_method', 'PUT');
				data.append('Id', nowRecord.Id);
				data.append('Remark', remark.value);
				if (upload.length !== 0) {
					data.append('File', upload[0]);
				}
				this.props.POST_UpdateProjectRecord(data);
			}

		}
		//刪除
		Delete = (id) => {
			this.props.DELETE_ProjectRecord(id);
			// this.props.history.push("/meetingmanage")
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
		//drop_down
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
		handelSetNow = (e) => {
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
				remark: {
					value: info[1],
					errormsg: "",
				}
			});
		}
		//下拉式選人關閉&關閉視窗
		handelMouseDown = (e) => {
			const cn = e.target.className;
			const name = cn.substr(0, 6);
			if (name === "window") {
				this.setState({
					edit: false,
					add: false,
					delO: false,
					delAll: false,
					download: false,
				})
			}
			else if (name === "choose") {
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
		//確定是否填寫
		handleInputChange(event) {
			const target = event.target;
			let { value, name } = target;
			value = value.trim();
			if (value !== "") {
				this.setState({
					[name]: {
						value,
						errormsg: "",
					}
				});
			}
			else {
				this.setState({
					[name]: {
						value,
						errormsg: "*",
					}
				});
			}
		}
		//選參與人
		handelOnClick = e => {
			let participate = this.state.participate;
			const account = e.id;
			const name = e.value;
			const obj = {
				account,
				name
			}
			if (e.checked === true) {
				if (!participate.find((item) => JSON.stringify(item) === JSON.stringify(obj))) {
					participate.push(obj);
				}
				this.setState({
					participate,
				})
			}
			else {
				let newarray = participate.filter((item) => item.account !== obj.account)
				this.setState({
					participate: newarray,
				})
			}
			if (participate.length === 0) {
				this.setState({
					member: {
						errormsg: "*",
					},
				})
			}
			else {
				this.setState({
					member: {
						errormsg: "",
					},
				})
			}
		}
		//選檔案
		handleSelectFile = (files) => {
			let nowsize = 0;
			const { all_file_max_size, one_file_max_size, mimes_type } = this.state;
			if (files.length > 1) {
				alert("一次只能上傳一個檔案")
			}
			else {
				let upload = [];
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
							upload.push(files[index]);
						}
					}
				}
				this.setState({
					upload: upload
				})
			}
		}

		//下拉式選人判斷
		handleGrop_down = () => {
			this.setState({
				drop: !this.state.drop,
			})
		}
		//判斷標籤長度
		headleGetLong = (e) => {
			const long = e.target.value.length;
			if (long >= 20) {
				alert("一個標籤勿超過20字");
				e.target.value = "";
			}
			this.setState({
				long
			})
		}
		//新增標籤
		heandleAddTag = (e) => {
			const tag = this.state.tag;
			if (tag.length === 5) {
				e.target.value = "";
				this.setState({
					disabled: true,
				})
				alert("一次請勿輸入超過五個標籤");
			}
			else {
				this.setState({
					disabled: false,
				})
				if (e.keyCode === 32) {
					if (!tag.includes(e.target.value) && (e.target.value) !== "" && (e.target.value) !== " ") {
						tag.push(e.target.value);
					}
					e.target.value = "";
				}
			}
		}
		//刪除標籤
		heandleDelTag = (e) => {
			const thistag = e.target.id;
			let tag = this.state.tag;
			this.setState({
				disabled: false,
			})
			if (tag.includes(thistag)) {
				tag.forEach((item, index) => {
					if (item === thistag) {
						tag.splice(index, 1)
					}
				})
			}
			this.setState({
				tag
			})
		}
		//全選
		handelAllChange = e => {
			const checkboxes = document.getElementsByName('Box');
			for (let i = 0; i < checkboxes.length; i++) {
				checkboxes[i].checked = e.target.checked;
				this.handelOnClickList(checkboxes[i]);
			}
		}
		//單選
		handelOnClickList = e => {
			const { ProjectInfo } = this.props;
			let array = this.state.array;
			const num = ProjectInfo.Record.length;
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
			const { table_header, array, title, content, type, Creater_name, member, tag, participate, drop, long, disabled, Record, add, edit, delO, delAll, download, upload, remark, nowRecord } = this.state;
			const { PublicMemberList, ProjectType } = this.props;
			return (
				<BackLayout>
					<div
						className="info_form"
						onClick={this.handelMouseDown.bind(this)}
					>
						<div className="inputbox">
							<div className="set col-4">
								<select onChange={this.handleInputChange.bind(this)} name="type" value={type.value} required className="input">
									{ProjectType === undefined ? "" : ProjectType.map((item) => {
										return (
											<option value={item.Id}>{item.Name}</option>
										)
									})}
								</select>
								<label for="" className="label">專案類型<div className='error_msg'>{type.errormsg}</div></label>
							</div>
							<div className="set col-4">
								<input defaultValue={Creater_name} disabled type="text" placeholder="建立者" required maxLength="50" className="input" />
								<label className="label">建立者</label>
							</div>
						</div>
						{/* 輸入專案名稱 */}
						<div className="inputbox">
							<div className="set col-12">
								<input
									type="text"
									name="title"
									placeholder="專案名稱"
									required
									maxLength="50"
									className="input"
									value={title.value}
									onChange={this.handleInputChange.bind(this)}
								/>
								<label className="label">輸入專案名稱<div className='error_msg'>{title.errormsg}</div></label>
							</div>
						</div>
						{/* 輸入內容描入 */}
						<div className="inputbox">
							<div className="set col-12">
								<textarea
									name="content"
									placeholder="內容描入"
									rows="20"
									required
									maxLength="2000"
									className="input"
									defaultValue={content.value}
									onChange={this.handleInputChange.bind(this)}
								></textarea>
								<label className="label">內容描入<div className='error_msg'>{content.errormsg}</div></label>

							</div>
						</div>
						{/* 參與人員 */}
						<div className="inputbox">
							<div className={drop === true ? "set col-12 focus" : "set col-12"}>
								<div
									className='choose input'
									onClick={this.handleGrop_down}
								>
									{participate.length === 0 ? "參與人員" : ""}
									{participate.length === 0 ? [] : participate.map((item, index) =>
										<div
											className='oncheck'
											key={index}
										>
											<p >{item.name}
												<label className='deselect'>
													<input
														type='checkbox'
														id={item.account}
														value={item.name}
														checked
														onChange={(e) => { this.handelOnClick(e.target) }}
													/>
													<span>
														<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M0.33546 0.33546C0.550319 0.120665 0.841693 0 1.1455 0C1.44932 0 1.74069 0.120665 1.95555 0.33546L6.00692 4.38683L10.0583 0.33546C10.2744 0.126752 10.5638 0.0112672 10.8642 0.0138777C11.1646 0.0164882 11.452 0.136985 11.6644 0.349417C11.8768 0.561848 11.9973 0.849216 12 1.14963C12.0026 1.45004 11.8871 1.73946 11.6784 1.95555L7.62701 6.00692L11.6784 10.0583C11.8871 10.2744 12.0026 10.5638 12 10.8642C11.9973 11.1646 11.8768 11.452 11.6644 11.6644C11.452 11.8768 11.1646 11.9973 10.8642 12C10.5638 12.0026 10.2744 11.8871 10.0583 11.6784L6.00692 7.62701L1.95555 11.6784C1.73946 11.8871 1.45004 12.0026 1.14963 12C0.849216 11.9973 0.561848 11.8768 0.349417 11.6644C0.136985 11.452 0.0164882 11.1646 0.0138777 10.8642C0.0112672 10.5638 0.126752 10.2744 0.33546 10.0583L4.38683 6.00692L0.33546 1.95555C0.120665 1.74069 0 1.44932 0 1.1455C0 0.841693 0.120665 0.550319 0.33546 0.33546Z" fill="#022840" />
														</svg>

													</span>
												</label>
											</p>
										</div>
									)}
								</div>
								<div className='locator'>
									<div className={drop === false ? "selectlist" : "selectlist active"}>
										{PublicMemberList === undefined ? "" : PublicMemberList.map((item, index) => {
											const participate2 = participate.map(item => { return item.account })
											return (
												<div
													className={participate2.includes(item.Account) ? "option selected" : "option noS"}
													key={index}
												>
													<input
														type='checkbox'
														id={item.Account}
														value={item.Name}
														className='choose'
														onChange={(e) => { this.handelOnClick(e.target) }}
													/>
													<label for={item.Account} className='choose'>{item.Name}</label>
												</div>
											)
										}
										)}
									</div>
								</div>
								<label className="label">選擇參與人員<div className='error_msg'>{member.errormsg}</div></label>
							</div>
						</div>
						{/* 標籤 */}
						<div className="inputbox">
							<div className="set col-12">
								<div className="input">
									{tag.map((item) => (
										<p key={item}>
											{item}
											<span>
												<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M0.33546 0.33546C0.550319 0.120665 0.841693 0 1.1455 0C1.44932 0 1.74069 0.120665 1.95555 0.33546L6.00692 4.38683L10.0583 0.33546C10.2744 0.126752 10.5638 0.0112672 10.8642 0.0138777C11.1646 0.0164882 11.452 0.136985 11.6644 0.349417C11.8768 0.561848 11.9973 0.849216 12 1.14963C12.0026 1.45004 11.8871 1.73946 11.6784 1.95555L7.62701 6.00692L11.6784 10.0583C11.8871 10.2744 12.0026 10.5638 12 10.8642C11.9973 11.1646 11.8768 11.452 11.6644 11.6644C11.452 11.8768 11.1646 11.9973 10.8642 12C10.5638 12.0026 10.2744 11.8871 10.0583 11.6784L6.00692 7.62701L1.95555 11.6784C1.73946 11.8871 1.45004 12.0026 1.14963 12C0.849216 11.9973 0.561848 11.8768 0.349417 11.6644C0.136985 11.452 0.0164882 11.1646 0.0138777 10.8642C0.0112672 10.5638 0.126752 10.2744 0.33546 10.0583L4.38683 6.00692L0.33546 1.95555C0.120665 1.74069 0 1.44932 0 1.1455C0 0.841693 0.120665 0.550319 0.33546 0.33546Z" fill="#022840" />
												</svg>
												<div
													className='close'
													id={item}
													onClick={this.heandleDelTag}></div>
											</span>
										</p>
									))}
									<input
										type="text"
										name=""
										placeholder=""
										size={long}
										className='input_tag'
										disabled={disabled}
										onKeyDown={this.heandleAddTag}
										onChange={this.headleGetLong}
									/>
								</div>
								<label className="label">輸入標籤</label>
							</div>
						</div>
						{/* 記錄表格 */}
						<div className="inputbox">
							<div className="set col-12">
								<div className="proj_record">
									<div className="workinfo">
										<div className="edit_button">
											<div onClick={(e) => this.drop_down('add')} className="work_btn add_btn">
												新增記錄
											</div>
											<div onClick={() => this.drop_down('delAll')} className="work_btn delete_btn">
												批量刪除
											</div>
										</div>
										<div action="" className="searchbar">
											<input type="text" required placeholder="搜尋" />
											<div className="submit">
												<input type="image" src={search} alt="送出" />
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
												<th className="col-2_5">{table_header[1]}</th>
												<th className="col-1"></th>
											</tr>
										</thead>
										<tbody>
											{Record === undefined ? "" : Record.map(
												(item, index) => {
													return (
														<tr key={index} className={array.includes(`${item.Id}`) ? "onchange" : ""}>
															<td className="check">
																<input type="checkbox"
																	id=""
																	name="Box"
																	value={item.Id}
																	onChange={(e) => { this.handelOnClickList(e.target) }}
																/>

															</td>
															<td>{index + 1}</td>
															<td>{item.Remark}</td>
															<td>{item.CreateTime}</td>
															<td>
																<div className="action">
																	<div onClick={() => this.drop_down('download')} className="svg">
																		<svg id={`${item.Id},${item.Remark},${item.File.Id},${item.File.Name},${item.Uploader_name}`} onClick={this.handelSetNow.bind()}
																			width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
																			<path id={`${item.Id},${item.Remark},${item.File.Id},${item.File.Name},${item.Uploader_name}`} onClick={this.handelSetNow.bind()}
																				d="M9.3726 1.8H17.1C17.3387 1.8 17.5676 1.89482 17.7364 2.0636C17.9052 2.23239 18 2.46131 18 2.7V15.3C18 15.5387 17.9052 15.7676 17.7364 15.9364C17.5676 16.1052 17.3387 16.2 17.1 16.2H0.9C0.661305 16.2 0.432387 16.1052 0.263604 15.9364C0.0948211 15.7676 0 15.5387 0 15.3V0.9C0 0.661305 0.0948211 0.432387 0.263604 0.263604C0.432387 0.0948211 0.661305 0 0.9 0H7.5726L9.3726 1.8Z" fill="#51718C" />
																			<path id={`${item.Id},${item.Remark},${item.File.Id},${item.File.Name},${item.Uploader_name}`} onClick={this.handelSetNow.bind()}
																				d="M9.8999 8.9999V5.3999H8.0999V8.9999H5.3999L8.9999 12.5999L12.5999 8.9999H9.8999Z" fill="white" />
																		</svg>
																		<div className="hover">
																			下載
																		</div>
																	</div>
																	<div onClick={() => this.drop_down('edit')} className="svg">
																		<svg id={`${item.Id},${item.Remark},${item.File.Id},${item.File.Name},${item.Uploader_name}`} onClick={this.handelSetNow.bind()}
																			width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
																			<path id={`${item.Id},${item.Remark},${item.File.Id},${item.File.Name},${item.Uploader_name}`} onClick={this.handelSetNow.bind()}
																				d="M17.5375 2.83605L15.1747 0.463507C14.5232 -0.190681 13.4207 -0.147876 12.7142 0.563335C12.0076 1.27278 11.9615 2.3815 12.6148 3.03568L14.9776 5.40822C15.6291 6.06241 16.7315 6.01963 17.4398 5.3084C18.1464 4.59719 18.1908 3.49203 17.5375 2.83605ZM2.47467 10.8432L7.20033 15.5882L14.88 7.87883L10.1543 3.13374L2.47467 10.8432ZM0 18L6.23283 16.7469L1.24799 11.7415L0 18Z" fill="#51718C" />
																		</svg>
																		<div className="hover">
																			編輯
																		</div>
																	</div>
																	<div onClick={() => this.drop_down('delO')} className="svg">
																		<svg id={`${item.Id},${item.Remark},${item.File.Id},${item.File.Name},${item.Uploader_name}`} onClick={this.handelSetNow.bind()}
																			width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
																			<path id={`${item.Id},${item.Remark},${item.File.Id},${item.File.Name},${item.Uploader_name}`} onClick={this.handelSetNow.bind()}
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
							</div>
						</div>
						{/* 按鈕 */}
						<div id="work_col">
							<button
								className="col-1 form_submit"
							>
								<Link to={`/casemanage`}>
									返回
								</Link>
							</button>
							<button
								className="col-1 form_submit"
								onClick={this.EditProject}>
								修改
							</button>
						</div>
					</div>
					<div
						className={add ? "popup_background active" : "popup_background"}
						onClick={this.handelMouseDown}
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
									<textarea onChange={this.handleInputChange.bind(this)} name="remark" className='long_text' />
									<label className="label">備註<div className='error_msg'>{remark.errormsg}</div></label>
								</div>
								<div id="filename">
									{upload.map(item => (<div>{item.name}</div>))}
								</div>
								<div className='enter'>
									<input type='file' id='f' onChange={e => this.handleSelectFile(e.target.files)} />
									<label for='f' className='nowfile'>
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
					<div
						className={download ? "popup_background active" : "popup_background"}
						onClick={this.handelMouseDown}
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
					<div
						className={edit ? "popup_background active" : "popup_background"}
						onClick={this.handelMouseDown}
					>
						<div className="window">
							<div className="form">
								<h1 className="title">
									修改記錄檔案
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
										value={remark.value}
										onChange={this.handleInputChange.bind(this)}
										name="remark"
										className='long_text' />
									<label className="label">備註<div className='error_msg'>{remark.errormsg}</div></label>
								</div>
								<div className={upload.length === 0 ? "" : "margin_t15"}>
									<label className="label">{upload.length === 0 ? "" : "新檔案"}</label>
									<div id="filename">
										{upload.map(item => (<div>{item.name}</div>))}
									</div>
								</div>
								<div className='enter'>
									<input type='file' id='f' onChange={e => this.handleSelectFile(e.target.files)} />
									<label for='f' className='nowfile'>
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