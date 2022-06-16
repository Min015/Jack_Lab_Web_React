import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import BackLayout from '../../../Components/Layout/back/BackLayout';
import '../style/info.scss';
import { GET_PublicMembers } from '../../../Action/MemberAction';
import { POST_AddMeeting } from '../../../Action/MeetingAction';

const mapStateToProps = state => {
	const { memberReducer } = state;
	return (
		memberReducer
	)
}

const mapDispatchToProps = dispatch => {
	return {
		GET_PublicMembers: (callback) => dispatch(GET_PublicMembers(callback)),
		POST_AddMeeting: (payload, callback) => dispatch(POST_AddMeeting(payload, callback)),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(
	class AdMeetingAdd extends Component {
		state = {
			array: [],//file
			my: [],
			participate: [],//已選擇
			long: 0,//一個tag的長度
			tag: [],//已輸入的tag
			drop: false,
			disabled: false,
			all_file_max_size: 1024 * 1024 * 50,//50M
			one_file_max_size: 1024 * 1024 * 30,//30M
			mimes_type: ['zip', '7z', 'rar', 'tgz', 'ico', 'gif', 'png', 'jpg', 'jpeg', 'svg', 'psd', 'xml', 'csv', 'txt', 'xlx', 'xls', 'xlxs', 'pdf', 'doc', 'docx', 'ppt', 'pptx', 'vsd', 'vsdx', 'mp3', 'acc', 'ogg',],//媒體類型
			title: "",
			content: "",
			time: "",
			place: "",
		}
		//載入所有人員名單
		componentDidMount = () => {
			const nowaccount = localStorage.getItem("account");
			const callback = (res) => {
				const a = res.find((item) => {
					return item.Account === nowaccount;
				})
				const account = a.Account;
				const name = a.Name;
				const obj = {
					account,
					name
				}
				let participate = this.state.participate;
				participate.push(obj);
				this.setState({
					my: obj,
					participate,
				})
			}
			this.props.GET_PublicMembers(callback);
		}
		//送出
		Submit = () => {
			let { title, content, time, place, array, participate, tag } = this.state;
			if (title !== "" && content !== "" && time !== "" && place !== "" && participate.length !== 0) {
				title = title.trim();
				content = content.trim();
				place = place.trim();
				if (title !== "" && content !== "" && place !== "") {
					const addmember = participate.map((item) => { return (item.account) });
					let data = new FormData();
					data.append('Title', title);
					data.append('Content', content);
					data.append('Time', time);
					data.append('Place', place);
					array.map((item, index) =>
						data.append(`Files[${index}]`, item)
					);
					addmember.map((item, index) =>
						data.append(`Member[${index}]`, item)
					)
					tag.map((item, index) =>
						data.append(`Tag[${index}]`, item)
					);
					const callback = () => {
						this.props.history.push("/meetingmanage");
					}
					this.props.POST_AddMeeting(data, callback);
				}
				else{
					alert("會議主題、會議內容、會議地點不可皆為空格字元");
				}
			}
			else {
				alert("您有必填欄位尚未填寫，請確認");
			}
		}

		//不可以有空格
		handleInputChange = event => {
			const target = event.target;
			let { value, id } = target;
			this.setState({
				[id]: value,
			});
		}
		//選參與人
		handleSelectMember = e => {
			let { participate, my } = this.state
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
				if (obj.account !== my.account) {
					let newarray = participate.filter((item) => item.account !== obj.account)
					this.setState({
						participate: newarray,
					})
				}
			}
		}
		//選檔案
		handleSelectFile = (files) => {
			let nowsize = 0;
			const { all_file_max_size, one_file_max_size, mimes_type } = this.state;
			if (files.length > 5) {
				alert("一次請勿上傳超過五個檔案")
			}
			else {
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
					array
				})
			}
		}
		//取得現在時間
		handleGetnow = () => {
			const dt = new Date();
			const hh = dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours();
			const mm = dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes();
			const today = new Date().toISOString().split("T");
			const ISO = today[0] + "T" + hh + ":" + mm;
			return (ISO);
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
		handleMouseDown = (e) => {
			const cn = (e.target.className);
			const name = (cn.length >= 6 ? cn.substr(0, 6) : '');
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
				if (e.keyCode === 13) {
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
			const { array, title, content, time, tag, place, participate, long, disabled, drop } = this.state;
			const { PublicMemberList } = this.props;
			return (
				<BackLayout>
					<div className='bg'>
						<div
							className="info_form"
							onClick={this.handleMouseDown.bind(this)}
						>
							{/* 輸入會議主題 */}
							<div className="inputbox">
								<div className="set col-12">
									<input
										type="text"
										placeholder="會議主題"
										required
										maxLength="50"
										className="input"
										value={title}
										id='title'
										onChange={this.handleInputChange.bind(this)}
									/>
									<label className="label">輸入會議主題*</label>
								</div>
							</div>
							{/* 輸入會議內容 */}
							<div className="inputbox">
								<div className="set col-12">
									<textarea
										placeholder="會議內容"
										rows="20"
										required
										maxLength="2000"
										className="input"
										value={content}
										id='content'
										onChange={this.handleInputChange.bind(this)}
									>
									</textarea>
									<label className="label">輸入會議內容*</label>
								</div>
							</div>
							{/* 選擇會議時間地點 */}
							<div className="inputbox">
								<div className="set col-4">
									<input
										type="datetime-local"
										max={this.handleGetnow()}
										required
										className="input"
										value={time}
										id='time'
										onChange={this.handleInputChange.bind(this)}
									/>
									<label className="label">選擇會議時間*</label>
								</div>
								<div className="set col-4">
									<input type="text"
										name="place"
										placeholder="會議地點"
										required
										maxLength="20"
										className="input"
										value={place}
										id='place'
										onChange={this.handleInputChange.bind(this)}
									/>
									<label className="label">輸入會議地點*</label>
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
												key={index}
											>
												<p >{item.name}
													<label className='deselect'>
														<input
															type='checkbox'
															id={item.account}
															value={item.name}
															checked
															onChange={(e) => { this.handleSelectMember(e.target) }}
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
															onChange={(e) => { this.handleSelectMember(e.target) }}
														/>
														<label htmlFor={item.Account} className='choose'>{item.Name}</label>
													</div>
												)
											}
											)}
										</div>
									</div>
									<label className="label">選擇參與人員*</label>
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
											placeholder="按下 Enter 組成一個標籤"
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
							{/* 檔案 */}
							<div className="inputbox">
								<div className="upload">
									<input
										type="file"
										id="f"
										multiple="multiple"
										onChange={e => this.handleSelectFile(e.target.files)}
									/>
									<label htmlFor='f' className="newbtn">
										<svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M20 2H10L8 0H0V16H20V2ZM11 9V13H9V9H6L10.01 5L14 9H11Z" fill="white" />
										</svg>
										<label htmlFor='f'>請選擇檔案(不超過5)</label>
									</label>
								</div>
							</div>
							<div id="filename">
								<ol>
									{array.map(item => (<li>{item.name}</li>))}
								</ol>
							</div>
							{/* 送出 */}
							<div id="work_col">
								<button
									className="col-1 form_submit"
								>
									<Link to={`/meetingmanage`}>
										返回
									</Link>
								</button>
								<button
									className="col-1 form_submit"
									onClick={this.Submit}
								>
									新增
								</button>
							</div>
						</div>
					</div>
				</BackLayout>
			)
		}
	})