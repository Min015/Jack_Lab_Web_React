import React, { Component } from 'react';
import { connect } from "react-redux";
import MemberLayout from '../../../Components/Layout/front/member/MemberLayout';
import './setinfo.scss';
import '../../../Mixin/popup_window.scss';
import camera from './img/camera.png';
import CreateTable from './CreateTable';

import {
	GET_MyInfo,
	POST_UpdateMyPhoto,
	PUT_UpdateMyIntroduction,
	GET_MyProject,
	SAVE_Permission,
} from '../../../Action/MemberAction';
const mapStateToProps = state => {
	return {
		MyInfo: state.memberReducer.MyInfo,
		MyProject: state.memberReducer.MyProject,
		MyPermission:state.memberReducer.MyPermission,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		GET_MyInfo: (callback) => dispatch(GET_MyInfo(callback)),
		POST_UpdateMyPhoto: (payload, callback) => dispatch(POST_UpdateMyPhoto(payload, callback)),
		PUT_UpdateMyIntroduction: (payload, callback) => dispatch(PUT_UpdateMyIntroduction(payload, callback)),
		GET_MyProject: (page, callback) => dispatch(GET_MyProject(page, callback)),
		SAVE_Permission:()=>dispatch(SAVE_Permission()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(
	class SetInfo extends Component {
		state = {
			drop: false,
			photo: false,
			edit: false,
			upload: {},
			mimes_type: ['svg', 'png', 'jpg', 'jpeg', 'csv',],//媒體類型
			all_file_max_size: 1024 * 1024 * 50,//50M
			one_file_max_size: 1024 * 1024 * 30,//30M
			table_header: [
				"專案類型",
				"專案名",
				"建立時間",
			],
		}
		componentDidMount = async () => {
			const callback = (res) => {
				this.setState({
					introduction: res.Introduction,
				})
			}
			const { match } = this.props;
			const { params } = match;
			const nowpage = params.page;
			this.setState({
				page: nowpage,
			})
			const callbacklist = (res) => {
				this.setState({
					maxpage: res.page,
				})
				this.handleGetPage(nowpage, res.page);
			}
			this.props.GET_MyInfo(callback);
			this.props.GET_MyProject(nowpage, callbacklist);
			this.props.SAVE_Permission();
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
		handleGoNextPage = (page) => {
			const callback = (res) => {
				const { match } = this.props;
				const { params } = match;
				const nowpage = params.page;
				this.setState({
					page: nowpage,
					maxpage: res.page,
					pagearray: [],
				})
				this.handleGetPage(nowpage, res.page);
			}
			this.props.history.push(`/setinfo/${page}`);
			this.props.GET_Project(page, callback);
		}
		//修改大頭貼
		UpdateMyPhoto = () => {
			const { upload } = this.state;
			if (upload.name !== undefined) {
				let data = new FormData();
				data.append('_method', 'PUT');
				data.append('File', upload);
				const callback = () => {
					this.props.GET_MyInfo();
					this.setState({
						photo: false,
						upload: {},
					});
				}
				this.props.POST_UpdateMyPhoto(data, callback);
			}
			else {
				alert("請選擇相片");
			}
		}
		//修改自我介紹
		UpdateMyIntroduction = () => {
			let { introduction } = this.state;
			if (introduction === "") {
				alert("您有必填欄位尚未填寫，請確認");
			}
			else {
				const payload = {
					text: introduction,
				}
				const callback = () => {
					this.props.GET_MyInfo();
					this.setState({
						edit: false,
					});
				}
				this.props.PUT_UpdateMyIntroduction(payload, callback);
			}
		}
		handleMouseDown = (e) => {
			if (e.target.className === "window") {
				this.setState({
					edit: false,
					photo: false,
				})
			}
		}
		drop_down = (e) => {
			if (e === 'edit') {
				this.setState({
					edit: !this.state.edit,
					introduction: this.props.MyInfo.Introduction
				})
			}
			else if (e === 'photo') {
				this.setState({
					photo: !this.state.photo,
				})
			}
		}
		//可以空格
		handleCanEnter(event) {
			const target = event.target;
			let { value, id } = target;
			this.setState({
				[id]: value,
			});
		}
		//選檔案
		handleSelectFile = (files) => {
			let nowsize = 0;
			const { all_file_max_size, one_file_max_size, mimes_type } = this.state;
			let array = [];
			for (let index = 0; index < files.length; index++) {
				const file_type = files[index].name.split(".").pop().toLowerCase();
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
		render() {
			const { MyInfo, MyProject} = this.props;
			const { table_header, edit, photo, upload, introduction, pagearray, page, maxpage } = this.state;
			return (
				<div id='personal_info'>
					<MemberLayout>
						<div className="card">
							<div className="big_card">
								<div className="card_banner"></div>
								<div className="card_content">
									<div className="head_stickers">
										<img src={MyInfo === undefined ? "": `https://jacklab.servehttp.com/${MyInfo.Image}`} alt={`大頭貼`} />
									</div>
									<div className="information">
										<div className="edit_pen">
											<div className='edit_introduce'>
												<svg width="24" height="23" viewBox="0 0 24 23" fill="none"
													xmlns="http://www.w3.org/2000/svg">
													<path d="M22.6039 3.60901L19.5585 0.589834C18.7187 -0.242651 17.2978 -0.188179 16.3872 0.716871C15.4765 1.61968 15.417 3.03058 16.259 3.86304L19.3045 6.88221C20.1442 7.7147 21.5651 7.66026 22.478 6.7552C23.3887 5.85015 23.4459 4.44377 22.6039 3.60901ZM3.18957 13.7984L9.28043 19.8368L19.1786 10.0262L13.0878 3.98784L3.18957 13.7984ZM0 22.9059L8.03343 21.3112L1.60851 14.9417L0 22.9059Z"
														fill="#022840" />
												</svg>
												<div className='colse'>
													<div className="close_btn" onClick={() => this.drop_down('edit')} />
												</div>
											</div>
											<div className='camera'  >
												<img src={camera} onClick={() => this.drop_down('photo')} alt="更新按鈕" />
											</div>
										</div>
										<div className="member_label">
											<div className="member_name">
												{MyInfo === undefined ? "" : MyInfo.Name}
											</div>
											<div>{MyInfo === undefined ? "" : MyInfo.ClassName}</div>
										</div>
									</div>
									<div className="introduction">
										<div className="introduction_in">
											{MyInfo === undefined ? "" : MyInfo.Introduction}
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="reaults_area">
							<CreateTable table_header={table_header} table_content={((MyProject === undefined || MyProject.list.length === 0) ? [] : MyProject.list)} />
						</div>
						{/* 分頁 */}
						<div className={(pagearray === undefined) ? "none" : "active"}>
							<div className='center'>
								<div className='page'>
									<button onClick={() => this.handleGoNextPage(1)} className='one_page'>
										<svg width="14" height="18" viewBox="0 0 14 18" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
											<path d="M12.6006 17.9991L14.0005 16.499L6.59997 8.99955L13.9994 1.49902L12.5993 -0.000877613L3.59997 8.99976L12.6006 17.9991Z" fill="#ffffff" />
											<rect x="2.00061" y="18" width="2" height="18" transform="rotate(179.996 2.00061 18)" fill="#ffffff" />
										</svg>
									</button>
									<div className='page_group'>
										{pagearray?.map((item, index) =>
											(<div key={`page${index}`} onClick={() => this.handleGoNextPage(item)} className={page === `${item}` ? 'features' : 'one_page'}>{item}</div>)
										)}
									</div>
									<button onClick={() => this.handleGoNextPage(maxpage)} className='one_page'>
										<svg width="14" height="18" viewBox="0 0 14 18" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
											<path d="M1.4 0L0 1.5L7.4 9L0 16.5L1.4 18L10.4 9L1.4 0Z" fill="#ffffff" />
											<rect x="12" width="2" height="18" fill="#ffffff" />
										</svg>
									</button>
								</div>
							</div>
						</div>
						<div
							className={edit ? "popup_background active" : "popup_background"}
							onClick={this.handleMouseDown}
						>
							<div className="window">
								<div className="form">
									<h1 className="title">
										修改個人簡介
										<div className="close">
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M24 2.4L21.6 0L12 9.6L2.4 0L0 2.4L9.6 12L0 21.6L2.4 24L12 14.4L21.6 24L24 21.6L14.4 12L24 2.4Z" fill="#51718C" />
											</svg>
											<div className="close_btn" onClick={() => this.drop_down('edit')} />
										</div>
									</h1>
									<div className='col-12 enter'>
										<textarea
											className='long_text'
											maxLength={5000}
											value={introduction}
											id="introduction"
											onChange={this.handleCanEnter.bind(this)}
										>

										</textarea>
									</div>
									<div className='btn_block'>
										<button
											className="submitBtn"
											onClick={this.UpdateMyIntroduction}
										>
											修改
										</button>
									</div>
								</div>
							</div>
						</div>
						<div
							className={photo ? "popup_background active" : "popup_background"}
							onClick={this.handleMouseDown}
						>
							<div className="window">
								<div className="form">
									<h1 className="title">
										上傳大頭貼
										<div className="close">
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M24 2.4L21.6 0L12 9.6L2.4 0L0 2.4L9.6 12L0 21.6L2.4 24L12 14.4L21.6 24L24 21.6L14.4 12L24 2.4Z" fill="#51718C" />
											</svg>
											<div className="close_btn" onClick={() => this.drop_down('photo')} />
										</div>
									</h1>
									<div id="filename">
										{upload === undefined ? "" : upload.name}
									</div>
									<div className='enter'>
										<input type='file' id='f' onChange={e => this.handleSelectFile(e.target.files)} />
										<label htmlFor='f' className='nowfile'>
											選擇相片
										</label>
									</div>
									<div className='btn_block'>
										<button
											className="submitBtn"
											onClick={this.UpdateMyPhoto}
										>
											新增
										</button>
									</div>
								</div>
							</div>
						</div>
					</MemberLayout>
				</div>
			)
		}
	}
)