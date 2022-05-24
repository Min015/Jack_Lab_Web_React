import { Component } from 'react';
import MemberLayout from '../../../../Components/Layout/front/member/MemberLayout';
import './projectInfo.scss';
import '../../../../Mixin/popup_window.scss';
import AddProjectInfo from './ProjectInfoTable';
import { connect } from "react-redux";
import {
	GET_Project,
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
		GET_Project: () => dispatch(GET_Project()),
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
			delete: false,
			upload: [],
			table_header: [
				"檔名",
				"上傳者",
				"上傳時間",
				"備註"
			],
			object: [
				{
					file_id: "",
					file_name: "以深度學習神經網路為基礎不良坐姿檢測與警示系統",
					file_uploader: "千千",
					file_createTime: "2019-03-06",
					file_record: "v3",
				},
				{
					file_id: "",
					file_name: "以深度學習神經網路為基礎不良坐姿檢測與警示系統",
					file_uploader: "千千",
					file_createTime: "2019-03-07",
					file_record: "v4",
				},
			],
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
			const callback = (res) => {
				this.setState({
					oldData: res,
					title: res.Name,
					content: res.Description,
					participate: res.Member.map((item) => {
						return {
							account: item.Account,
							name: item.Name
						};
					}),
					type: res.Type_id,
					Creater_name: res.Creater_name,
					tag: res.Tag.map(item => item.Name),
					Record: res.Record,
				})
			}
			const callbackRecord = (res) => {
				this.setState({
					maxpage: res.page,
				})
				this.handelGetPage(nowpage, res.page);
			}
			this.props.GET_ProjectInfo(nowid, callback);
			this.props.GET_ProjectRecord(nowid, nowpage, nowsearch, callbackRecord);
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
				this.handelGetPage(nowpage, res.page);
			}
			this.props.history.push(`/casemanage/caseinfo/${Id}/${page}/${search} `);
			this.props.GET_ProjectRecord(Id, page, search, callback);
		}


		render() {
			const { table_header, object, drop, upload, d } = this.state;
			const { pagearray, page, search, maxpage } = this.state;
			const { ProjectTypeAll, ProjectRecord, ProjectInfo } = this.props;
			console.log(ProjectInfo);
			return (
				<div id='project_info'>
					<MemberLayout>
						<div className="add_title">
							<div className="title_name">
								<h2>{ProjectInfo.Name}
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
										onClick={() => this.drop_down('delete')}
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
										<p>刪除記錄</p>
									</div>
								</div>
								<div className="add">
									<a href="#">
										<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M18.5118 2.99361L16.0177 0.489257C15.33 -0.201275 14.1663 -0.156091 13.4205 0.594632C12.6747 1.34349 12.626 2.51381 13.3156 3.20432L15.8097 5.70867C16.4974 6.39921 17.661 6.35405 18.4087 5.60331C19.1545 4.85259 19.2014 3.68603 18.5118 2.99361ZM2.61215 11.4456L7.60035 16.4543L15.7066 8.31654L10.7184 3.30784L2.61215 11.4456ZM0 19L6.5791 17.6773L1.31732 12.3938L0 19Z" fill="white" />
										</svg>
										<p>修改專案</p>
									</a>
								</div>
								<div className="add">
									<div
										className='func_btn'
										onClick={() => this.drop_down('create')}
									>
										<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M9.84375 11.8945H7.62891C7.58539 11.8945 7.54366 11.9118 7.5129 11.9426C7.48213 11.9734 7.46484 12.0151 7.46484 12.0586V13.043C7.46484 13.0865 7.48213 13.1282 7.5129 13.159C7.54366 13.1897 7.58539 13.207 7.62891 13.207H9.84375V15.4219C9.84375 15.4654 9.86103 15.5071 9.8918 15.5379C9.92257 15.5687 9.9643 15.5859 10.0078 15.5859H10.9922C11.0357 15.5859 11.0774 15.5687 11.1082 15.5379C11.139 15.5071 11.1562 15.4654 11.1562 15.4219V13.207H13.3711C13.4146 13.207 13.4563 13.1897 13.4871 13.159C13.5179 13.1282 13.5352 13.0865 13.5352 13.043V12.0586C13.5352 12.0151 13.5179 11.9734 13.4871 11.9426C13.4563 11.9118 13.4146 11.8945 13.3711 11.8945H11.1562V9.67969C11.1562 9.63618 11.139 9.59445 11.1082 9.56368C11.0774 9.53291 11.0357 9.51562 10.9922 9.51562H10.0078C9.9643 9.51562 9.92257 9.53291 9.8918 9.56368C9.86103 9.59445 9.84375 9.63618 9.84375 9.67969V11.8945ZM17.526 5.92061C17.649 6.04365 17.7188 6.20977 17.7188 6.38408V19.0312C17.7188 19.3942 17.4255 19.6875 17.0625 19.6875H3.9375C3.57451 19.6875 3.28125 19.3942 3.28125 19.0312V1.96875C3.28125 1.60576 3.57451 1.3125 3.9375 1.3125H12.6472C12.8215 1.3125 12.9896 1.38223 13.1127 1.50527L17.526 5.92061ZM16.2053 6.68555L12.3457 2.82598V6.68555H16.2053Z" fill="white" />
										</svg>
										<p>新增記錄</p>
									</div>
								</div>
							</div>
						</div>
						<div className="project_content something_content">
							{ProjectInfo.Description}
						</div>
						<div className="reaults_area">
							<AddProjectInfo table_header={table_header} table_content={object} />
						</div>
						<div
							className={drop ? "popup_background active" : "popup_background"}
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
											<div className="close_btn" onClick={() => this.drop_down('create')} />
										</div>
									</h1>
									<div className='col-12 enter'>
										<textarea className='long_text'>

										</textarea>
										<label for="" className="label">備註(必填)</label>
									</div>
									<div id="filename">
										<ul>
											{upload.map(item => (<li>{item}</li>))}
										</ul>
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
										// onClick={(e) => this.Delete(this.state.Id, e)}
										>
											新增
										</button>
									</div>
								</div>
							</div>
						</div>
					</MemberLayout>
					<div
						className={d ? "popup_background active" : "popup_background"}
						onClick={this.handelMouseDown}
					>
						<div className="window">
							<div className="form">
								<h1 className="title">
									<div className="close">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M24 2.4L21.6 0L12 9.6L2.4 0L0 2.4L9.6 12L0 21.6L2.4 24L12 14.4L21.6 24L24 21.6L14.4 12L24 2.4Z" fill="#51718C" />
										</svg>
										<div className="close_btn" onClick={() => this.drop_down('delete')} />
									</div>
								</h1>

								<h2 className='message'>
									是否要刪除專案「(專案名稱)」
								</h2>
								<div id='btn_block'>
									<button
										className="submitBtn"
									// onClick={(e) => this.Delete(this.state.Id, e)}
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