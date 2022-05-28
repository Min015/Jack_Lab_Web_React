import { Component } from 'react';
import { connect } from "react-redux";
import '../main_category/add.scss';
import MemberLayout from '../../../Components/Layout/front/member/MemberLayout';

import { GET_PublicMembers } from '../../../Action/MemberAction';
import {
	GET_Project,
	GET_ProjectInfo,
	GET_ProjectTypeAll,
	PUT_UpdateProject,
} from '../../../Action/ProjectAction';
const mapStateToProps = state => {
	return {
		PublicMemberList: state.memberReducer.PublicMemberList,
		ProjectTypeAll: state.projectReducer.ProjectTypeAll,
		ProjectInfo: state.projectReducer.ProjectInfo,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		GET_Project: () => dispatch(GET_Project()),
		GET_ProjectTypeAll: () => dispatch(GET_ProjectTypeAll()),
		GET_PublicMembers: () => dispatch(GET_PublicMembers()),
		GET_ProjectInfo: (payload, callback) => dispatch(GET_ProjectInfo(payload, callback)),
		PUT_UpdateProject: (payload, callback) => dispatch(PUT_UpdateProject(payload, callback)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(
	class UpdateProject extends Component {
		state = {
			participate: [],//已選擇
			long: 0,//一個tag的長度
			tag: [],//已輸入的tag
			drop: false,
			disabled: false,
			all_file_max_size: 1024 * 1024 * 50,//50M
			one_file_max_size: 1024 * 1024 * 30,//30M
			mimes_type: ['zip', '7z', 'rar', 'svg', 'png', 'jpg', 'jpeg', 'csv', 'txt', 'xlx', 'xls', 'xlsx', 'pdf', 'doc', 'docx', 'ppt', 'pptx'],//媒體類型
			title: "",
			content: "",
			type: "1",
		}
		//載入所有人員名單
		componentDidMount = async () => {
			const { match } = this.props;
			const { params } = match;
			const nowid = params.id;
			this.setState({
				Id: nowid,
			})
			const callback = (res) => {
				this.setState({
					OldData: res,
					title: res.Name,
					content: res.Description,
					participate: res.Member.map((item) => {
						return {
							account: item.Account,
							name: item.Name
						};
					}),
					type: res.Type_id,
					tag: res.Tag.map(item => item.Name),
				})
			}
			this.props.GET_ProjectInfo(nowid, callback);
			this.props.GET_ProjectTypeAll();
			this.props.GET_PublicMembers();
		}
		//修改專案
		EditProject = () => {
			const { title, content, participate, tag, type, Id } = this.state;
			if (title !== "" && content !== "" && type !== "" && participate.length !== 0) {
				const addmember = participate?.map((item) => { return (item.account) });
				const payload = {
					Id: Id,
					Name: title,
					Description: content,
					Proj_type: type,
					Tag: tag,
					Member: addmember,
				}
				const callback = () => {
					this.setState({
						title: "",
						content: "",
						type: "",
						tag: [],
						participate: [],
					})
					this.props.history.push(`/project/projectinfo/${Id}/1/ `);
				}
				this.props.PUT_UpdateProject(payload, callback);
			}
			else {
				alert("您有必填欄位尚未填寫，請確認");
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
		//可以空格
		handelCanEnter = event => {
			const target = event.target;
			let { value, id } = target;
			this.setState({
				[id]: value,
			});
		}
		//選參與人
		handelSelectMember = e => {
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
		}
		//下拉式選人判斷
		drop_down = (e) => {
			if (e === 'drop') {
				this.setState({
					drop: !this.state.drop,
				})
			}
		}
		//下拉式選人關閉
		handelMouseDown = (e) => {
			const cn = (e.target.className);
			const name = (cn.length>=6?cn.substr(0, 6):'');
			if (name !== "choose") {
				this.setState({
					drop: false,
				})
			}
			else {
				this.setState({
					drop: true,
				})
			}
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
			const target = e.target;
			let { value } = target;
			value = value.trim();
			const tag = this.state.tag;
			if (tag.length === 5) {
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
					if (!tag.includes(value) && (value !== "")) {
						tag.push(value);
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
		render() {
			const { title, content, tag, participate, long, disabled, drop, type } = this.state;
			const { PublicMemberList, ProjectTypeAll } = this.props;
			return (
				<div onClick={this.handelMouseDown.bind(this)}>
					<MemberLayout>
						<div className="add_title">
							<h2>新增專案</h2>
						</div>
						<div className="add_form">
							<div className="inputbox">
								<div className="set col-4">
									<select
										className="input"
										required
										id="type"
										value={type}
										onChange={this.handleInputChange.bind(this)}
									>
										{ProjectTypeAll === undefined ? "" : ProjectTypeAll.map((item, index) => {
											return (
												<option key={`ProjectTypeAll${index}`} value={item.Id}>{item.Name}</option>
											)
										})}
									</select>
									<label className="label">選擇專案類型<div className='error_msg'>*</div></label>
								</div>
							</div>
							<div className="inputbox">
								<div className="set col-12">
									<input
										type="text"
										placeholder="專案名稱"
										required
										maxLength="50"
										className="input"
										id="title"
										value={title}
										onChange={this.handleInputChange.bind(this)}
									/>
									<label className="label">輸入專案名稱<div className='error_msg'>*</div></label>
								</div>
							</div>
							<div className="inputbox">
								<div className="set col-12">
									<textarea
										placeholder="內容描入"
										rows="20"
										required
										maxLength="2000"
										className="input"
										id="content"
										value={content}
										onChange={this.handelCanEnter.bind(this)}
									></textarea>
									<label className="label">內容描入<div className='error_msg'>*</div></label>
								</div>
							</div>
							{/* 參與人員 */}
							<div className="inputbox">
								<div className={drop === true ? "set col-12 focus" : "set col-12"}>
									<div
										className='choose input'
										onClick={() => this.drop_down('drop')}
									>
										{participate.length === 0 ? "參與人員" : ""}
										{participate.length === 0 ? [] : participate.map((item, index) =>
											<div
												className='oncheck'
												key={`participate${index}`}
											>
												<p>{item.name}
													<label className='deselect'>
														<input
															type='checkbox'
															id={item.account}
															value={item.name}
															checked
															onChange={(e) => { this.handelSelectMember(e.target) }}
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
														key={`participate2${index}`}
													>
														<input
															type='checkbox'
															id={item.Account}
															value={item.Name}
															className='choose'
															onChange={(e) => { this.handelSelectMember(e.target) }}
														/>
														<label htmlFor={item.Account} className='choose'>{item.Name}</label>
													</div>
												)
											}
											)}
										</div>
									</div>
									<label className="label">選擇參與人員<div className='error_msg'>*</div></label>
								</div>
							</div>
							{/* 標籤 */}
							<div className="inputbox">
								<div className="set col-12">
									<div className="input">
										{tag.map((item, index) => (
											<p key={`tag${index}`}>
												{item}
												<span>
													<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M0.33546 0.33546C0.550319 0.120665 0.841693 0 1.1455 0C1.44932 0 1.74069 0.120665 1.95555 0.33546L6.00692 4.38683L10.0583 0.33546C10.2744 0.126752 10.5638 0.0112672 10.8642 0.0138777C11.1646 0.0164882 11.452 0.136985 11.6644 0.349417C11.8768 0.561848 11.9973 0.849216 12 1.14963C12.0026 1.45004 11.8871 1.73946 11.6784 1.95555L7.62701 6.00692L11.6784 10.0583C11.8871 10.2744 12.0026 10.5638 12 10.8642C11.9973 11.1646 11.8768 11.452 11.6644 11.6644C11.452 11.8768 11.1646 11.9973 10.8642 12C10.5638 12.0026 10.2744 11.8871 10.0583 11.6784L6.00692 7.62701L1.95555 11.6784C1.73946 11.8871 1.45004 12.0026 1.14963 12C0.849216 11.9973 0.561848 11.8768 0.349417 11.6644C0.136985 11.452 0.0164882 11.1646 0.0138777 10.8642C0.0112672 10.5638 0.126752 10.2744 0.33546 10.0583L4.38683 6.00692L0.33546 1.95555C0.120665 1.74069 0 1.44932 0 1.1455C0 0.841693 0.120665 0.550319 0.33546 0.33546Z" fill="#022840" />
													</svg>
													<span
														className='close'
														id={item}
														onClick={this.heandleDelTag}></span>
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
							<div className="inputbox">
								<button
									className="col-1 form_submit"
									onClick={this.EditProject}
								>
									送出
								</button>
							</div>
						</div>
					</MemberLayout>
				</div>
			)
		}
	}
)