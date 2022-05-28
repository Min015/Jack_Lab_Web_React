import { Component } from 'react';
import { connect } from "react-redux";
import MemberLayout from '../../../Components/Layout/front/member/MemberLayout';
import '../main_category/add.scss';
import { Link } from 'react-router-dom';

import { GET_PublicMembers } from '../../../Action/MemberAction';
import { GET_MeetingInfo, POST_UpdateMeeting, GET_Meeting } from '../../../Action/MeetingAction';

const mapStateToProps = state => {
	return {
		PublicMemberList: state.memberReducer.PublicMemberList,
		MeetingInfo: state.meetingReducer.MeetingInfo,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		GET_PublicMembers: () => dispatch(GET_PublicMembers()),
		GET_Meeting: () => dispatch(GET_Meeting()),
		GET_MeetingInfo: (payload, callback) => dispatch(GET_MeetingInfo(payload, callback)),
		POST_UpdateMeeting: (payload, callback) => dispatch(POST_UpdateMeeting(payload, callback)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(
	class UpdateMeeting extends Component {
		state = {
			Id: "",
			array: [],//新上傳file
			delfile: [],//新上傳file
			participate: [],//已選擇
			long: 0,//一個tag的長度
			tag: [],//已輸入的tag
			drop: false,
			disabled: false,
			nowclass: "selectlist",
			all_file_max_size: 1024 * 1024 * 50,//50M
			one_file_max_size: 1024 * 1024 * 30,//30M
			mimes_type: ['zip', '7z', 'rar', 'svg', 'png', 'jpg', 'jpeg', 'csv', 'txt', 'xlx', 'xls', 'xlsx', 'pdf', 'doc', 'docx', 'ppt', 'pptx'],//媒體類型
			title: "",
			content: "",
			time: "",
			place: "",
			all_file_q: 0,
		}

		//載入所有人員名單
		componentDidMount = async () => {
			const { match } = this.props;
			const { params } = match;
			this.setState({
				Id: params.id,
			})
			const callback = (res) => {
				const meeting_time = res.Time.split(":");
				const Mtime = meeting_time[0].split(" ");
				this.setState({
					title: res.Title,
					content: res.Content,
					time: `${Mtime[0]}T${Mtime[1]}:${meeting_time[1]}`,
					place: res.Place,
					participate: res.Member.map((item) => {
						return {
							account: item.Account,
							name: item.Name
						};
					}),
					tag: res.Tag.map(item => item.Name),
					all_file_q: res.File.length,
				})
			}
			this.props.GET_PublicMembers();
			this.props.GET_MeetingInfo(params.id, callback);
		}
		//修改
		Update = async () => {
			const { Id, title, content, time, place, array, participate, tag, delfile } = this.state;
			if (title !== "" && content !== "" && time !== "" && place !== "" && participate.length !== 0) {
				const addmember = participate.map((item) => { return (item.account) });
				const data = new FormData();
				data.append('_method', 'PUT');
				data.append('Id', Id);
				data.append('Title', title);
				data.append('Content', content);
				data.append('Time', time);
				data.append('Place', place);
				array.map((item, index) =>
					data.append(`Files[${index}]`, item)
				)
				delfile.map((item, index) =>
					data.append(`IsClearOld[${index}]`, item)
				)
				addmember.map((item, index) =>
					data.append(`Member[${index}]`, item)
				)
				tag.map((item, index) =>
					data.append(`Tag[${index}]`, item)
				)
				const callback = () => {
					this.props.GET_Meeting();
					this.props.history.push("/meeting");
				}
				this.props.POST_UpdateMeeting(data, callback);
			}
			else {
				alert("您有必填欄位尚未填寫，請確認");
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
		//選擇要刪除的檔案
		handelOnClick = e => {
			let { all_file_q, delfile } = this.state;
			const { array } = this.state;
			if (e.checked === false) {
				if (all_file_q + array.length < 5) {
					delfile.forEach((item, index) => {
						if (item === e.value) {
							delfile.splice(index, 1);
							all_file_q = all_file_q + 1;
						}
					})
				}
				else {
					e.checked = true;
					alert("會議不可超過五個檔案，若想更新檔案，請先刪除舊檔")
				}
			}
			else {
				if (!delfile.includes(e.value)) {
					delfile.push(e.value);
					all_file_q = all_file_q - 1;
				}
			}
			this.setState({
				delfile,
				all_file_q,
			})
		}
		//選檔案
		handleSelectFile = (files) => {
			const { all_file_q } = this.state;
			const filelen = all_file_q + files.length;
			let nowsize = 0;
			const { all_file_max_size, one_file_max_size, mimes_type } = this.state;
			if (filelen > 5) {
				alert("會議不可超過五個檔案，若想更新檔案，請先刪除舊檔");
			}
			else {
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
							alert("檔案過大，請重新選擇(單個檔案物超過30M，總大小物超過50M");
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
		handelMouseDown = (e) => {
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
			const { array, title, content, time, tag, place, participate, drop, long, disabled, delfile, all_file_q } = this.state;
			const { PublicMemberList, MeetingInfo } = this.props;
			return (
				<div>
					<MemberLayout>
						<div className="add_title">
							<h2>修改會議記錄</h2>
						</div>
						<div
							className="add_form"
							onClick={this.handelMouseDown.bind(this)}
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
									<label className="label">會議主題<div className='error_msg'>*</div></label>
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
										onChange={this.handelCanEnter.bind(this)}
									></textarea>
									<label className="label">會議內容<div className='error_msg'>*</div></label>
								</div>
							</div>
							{/* 輸入會議時間地點 */}
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
									<label className="label">會議時間<div className='error_msg'>{time.errormsg}</div></label>
								</div>
								<div className="set col-4">
									<input
										type="text"
										name="place"
										placeholder="會議地點"
										required
										maxLength="20"
										className="input"
										value={place}
										id='place'
										onChange={this.handleInputChange.bind(this)}
									/>
									<label className="label">會議地點<div className='error_msg'>{place.errormsg}</div></label>
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
														key={index}
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
									<label className="label">標籤</label>
								</div>
							</div>
							{/* 檔案 */}
							<div className={(MeetingInfo === undefined || MeetingInfo.File.length === 0) ? "none" : "active"}>
								<div className="inputbox">
									<div className="set col-12">
										<label className="label">刪除舊檔</label>
										<div className='file'>
											{(MeetingInfo === undefined || MeetingInfo.File.length === 0) ? "" : MeetingInfo.File.map((item, index) => {
												return (
													<div key={`MeetingInfo${index}`} className='oldfile'>
														<div className='oncheck'>
															<p>
																<label className='deselect'>
																	<input
																		disabled={array.length === 5 ? true : false}
																		id={`${index},${item.Name}`}
																		type='checkbox'
																		value={item.Name}
																		onChange={(e) => { this.handelOnClick(e.target) }}
																	/>
																	<span className={delfile.includes(item.Name) ? 'delete' : 'reserve'}>
																		<svg width="33" height="35" viewBox="0 0 33 35" fill="none" xmlns="http://www.w3.org/2000/svg">
																			<path d="M15.2687 5.38142e-08C16.6204 -0.000190445 17.9235 0.50539 18.9219 1.41747C19.9203 2.32955 20.542 3.58224 20.6649 4.92958H29.0597C29.4341 4.92969 29.7945 5.07203 30.068 5.32783C30.3416 5.58364 30.5079 5.93383 30.5334 6.30765C30.5589 6.68147 30.4417 7.05105 30.2055 7.34172C29.9692 7.63238 29.6315 7.82245 29.2607 7.87352L29.0597 7.88732H27.9111L27.0147 15.6682C24.7936 15.0547 22.4349 15.1658 20.2812 15.9853C18.1275 16.8048 16.2909 18.2901 15.038 20.2255C13.7852 22.1609 13.1814 24.4456 13.3142 26.7479C13.4471 29.0501 14.3098 31.25 15.777 33.0282H9.0351C8.06845 33.0283 7.13547 32.6728 6.41366 32.0293C5.69185 31.3857 5.23158 30.4991 5.12042 29.538L2.62424 7.88732H1.47761C1.12055 7.88731 0.775565 7.75789 0.506465 7.52299C0.237365 7.2881 0.0623518 6.96363 0.013791 6.60958L0 6.40845C1.50576e-05 6.05108 0.129326 5.7058 0.364019 5.43648C0.598711 5.16715 0.922909 4.99198 1.27666 4.94338L1.47761 4.92958H9.87242C9.99531 3.58224 10.617 2.32955 11.6154 1.41747C12.6138 0.50539 13.9169 -0.000190445 15.2687 5.38142e-08V5.38142e-08ZM15.2687 2.95775C14.0767 2.95775 13.0818 3.80563 12.8552 4.92958H17.6821C17.4536 3.80563 16.4606 2.95775 15.2687 2.95775V2.95775ZM24.1343 35C26.4857 35 28.7407 34.0651 30.4033 32.4011C32.0659 30.737 33 28.4801 33 26.1268C33 23.7734 32.0659 21.5165 30.4033 19.8524C28.7407 18.1884 26.4857 17.2535 24.1343 17.2535C21.783 17.2535 19.528 18.1884 17.8654 19.8524C16.2027 21.5165 15.2687 23.7734 15.2687 26.1268C15.2687 28.4801 16.2027 30.737 17.8654 32.4011C19.528 34.0651 21.783 35 24.1343 35V35ZM22.3691 22.3882L20.6019 24.1549H23.6418C25.0787 24.1549 26.4568 24.7262 27.4728 25.7432C28.4889 26.7601 29.0597 28.1393 29.0597 29.5775V30.0704C29.0597 30.3319 28.9559 30.5827 28.7712 30.7676C28.5864 30.9525 28.3359 31.0563 28.0746 31.0563C27.8134 31.0563 27.5628 30.9525 27.3781 30.7676C27.1933 30.5827 27.0896 30.3319 27.0896 30.0704V29.5775C27.0896 28.6623 26.7263 27.7846 26.0797 27.1374C25.4331 26.4903 24.5562 26.1268 23.6418 26.1268H20.6019L22.3691 27.8935C22.554 28.0786 22.658 28.3297 22.658 28.5915C22.658 28.8534 22.554 29.1044 22.3691 29.2896C22.1841 29.4747 21.9332 29.5787 21.6716 29.5787C21.4101 29.5787 21.1592 29.4747 20.9742 29.2896L17.5225 25.833C17.3391 25.648 17.2365 25.3977 17.2372 25.1371C17.238 24.8764 17.342 24.6268 17.5264 24.4428L20.9742 20.9921C21.1592 20.807 21.4101 20.703 21.6716 20.703C21.9332 20.703 22.1841 20.807 22.3691 20.9921C22.554 21.1772 22.658 21.4283 22.658 21.6901C22.658 21.952 22.554 22.203 22.3691 22.3882V22.3882Z" fill="black" />
																		</svg>
																	</span>
																</label>
															</p>
															<label htmlFor={`${index},${item.Name}`}>{item.Name}</label>
														</div>
													</div>
												)
											})}
										</div>
									</div>
								</div>
							</div>
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
									{array.map((item, index) => (<li key={`file${index}`}>{item.name}</li>))}
								</ol>
							</div>
							{/* 送出 */}
							<div id="work_col">
								<button
									className="col-1 form_submit"
								>
									<Link to={`/meeting/meetinginfo/${this.state.Id}`}>
										返回
									</Link>
								</button>
								<button
									className="col-1 form_submit"
									onClick={this.Update}
								>
									修改
								</button>
							</div>
						</div>
					</MemberLayout>
				</div>
			)
		}
	})