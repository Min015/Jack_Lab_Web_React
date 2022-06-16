import React, { Component } from 'react';
import { connect } from "react-redux";
import BackLayout from '../../../../Components/Layout/back/BackLayout';
import '../../style/mainstyle.scss';
import '../../../../Mixin/popup_window.scss';
import './book.scss';
import camera from '../../style/img/camera.png';
import searchbtn from '../../style/img/searchButton.png';
import { handleGetPage } from '../../../../Utils/MyClass';

import { GET_PublicMembers } from '../../../../Action/MemberAction';
import {
	GET_Book,
	POST_AddBook,
	DELETE_Book,
	GET_BookInfo,
	PUT_UpdateBookInfo,
	POST_UpdateBookPhoto,
} from '../../../../Action/IndexAction';

const mapStateToProps = state => {
	return {
		PublicMemberList: state.memberReducer.PublicMemberList,
		BookList: state.guestindexReducer.BookList,
		BookInfo: state.guestindexReducer.BookInfo,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		GET_PublicMembers: () => dispatch(GET_PublicMembers()),
		GET_Book: (page, search, callback) => dispatch(GET_Book(page, search, callback)),
		POST_AddBook: (payload, callback) => dispatch(POST_AddBook(payload, callback)),
		DELETE_Book: (payload, callback) => dispatch(DELETE_Book(payload, callback)),
		GET_BookInfo: (payload, callback) => dispatch(GET_BookInfo(payload, callback)),
		PUT_UpdateBookInfo: (payload, callback) => dispatch(PUT_UpdateBookInfo(payload, callback)),
		POST_UpdateBookPhoto: (payload, callback) => dispatch(POST_UpdateBookPhoto(payload, callback)),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(
	class Books extends Component {
		state = {
			array: [],
			table_header: [
				"書名",
				"作者",
				"出版時間",
			],
			add: false,
			edit: false,
			delO: false,
			delAll: false,
			drop: false,
			photo: false,
			mimes_type: ['ico', 'gif', 'png', 'jpg', 'jpeg', 'svg',],//媒體類型
			all_file_max_size: 1024 * 1024 * 50,//50M
			one_file_max_size: 1024 * 1024 * 30,//30M
			Id: "",
			Title: "",
			Publisher: "",
			Time: "",
			ISBN: "",
			upload: {},
			participate: [],
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
				const pagearray = handleGetPage(nowpage, res.page);
				this.setState({
					pagearray
				})
			}
			this.props.GET_PublicMembers();
			this.props.GET_Book(nowpage, nowsearch, callback);
		}
		//換頁
		handleGoNextPage = (page, search = " ") => {
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
				const pagearray = handleGetPage(nowpage, res.page);
				this.setState({
					pagearray
				})
			}
			this.props.history.push(`/books/${page}/${search}`);
			this.props.GET_Book(page, search, callback);
		}
		AddBook = () => {
			const { page, search } = this.state;
			let { Title, Publisher, Time, ISBN, participate, upload, } = this.state;
			Title = Title.trim();
			Publisher = Publisher.trim();
			ISBN = ISBN.trim();
			if (Title !== "" && Publisher !== "" && Time !== "" && ISBN !== "" && participate.length !== 0 && upload.name !== undefined) {
				const addmember = participate.map((item) => { return (item.account) });
				let data = new FormData();
				data.append('Title', Title);
				data.append('Publisher', Publisher);
				data.append('Time', Time);
				data.append('ISBN', ISBN);
				data.append('Image', upload);
				addmember.map((item, index) =>
					data.append(`Authors[${index}]`, item)
				);
				const callback = () => {
					const callbackpage = res => {
						const pagearray = handleGetPage(page, res.page);
						this.setState({
							pagearray,
							maxpage: res.page,
						})
					}
					this.props.GET_Book(page, search, callbackpage);
					this.setState({
						add: false,
						Title: "",
						Publisher: "",
						Time: "",
						ISBN: "",
						upload: {},
						participate: [],
					})
				}
				this.props.POST_AddBook(data, callback);
			}
			else {
				alert("有必填欄位未填寫，請確認");
			}
		}
		GET_BookInfo = id => {
			const callback = (res) => {
				this.setState({
					bookinfo: res,
					Id: res.Id,
					Title: res.Title,
					Publisher: res.Publisher,
					Time: res.Time,
					ISBN: res.ISBN,
					participate: res.Authors,
				})
			}
			this.props.GET_BookInfo(id, callback);
		}
		UpdateBookInfo = () => {
			const { page, search } = this.state;
			let { Id, Title, Publisher, Time, ISBN, participate } = this.state;
			Title = Title.trim();
			Publisher = Publisher.trim();
			ISBN = ISBN.trim();
			if (Id !== "" && Title !== "" && Publisher !== "" && Time !== "" && ISBN !== "" && participate.length !== 0) {
				const addmember = participate.map((item) => { return (item.account) });
				const payload = {
					Id: Id,
					Title: Title,
					Publisher: Publisher,
					Time: Time,
					ISBN: ISBN,
					Authors: addmember,
				};
				const callback = () => {
					this.props.GET_Book(page, search);
					this.setState({
						edit: false,
						Title: "",
						Publisher: "",
						Time: "",
						ISBN: "",
						upload: {},
						participate: [],
					})
				};
				this.props.PUT_UpdateBookInfo(payload, callback);
			}
			else {
				alert("您有必填欄位尚未填寫，請確認");
			}
		}
		UpdateBookPhoto = () => {
			const { page, search } = this.state;
			const { upload, Id } = this.state;
			if (upload.name !== undefined) {
				let data = new FormData();
				data.append('_method', 'PUT');
				data.append('Id', Id);
				data.append('Image', upload);
				const callback = () => {
					this.props.GET_Book(page, search);
					this.setState({
						photo: false,
						edit: false,
						upload: {},
					});
				}
				this.props.POST_UpdateBookPhoto(data, callback);
			}
			else {
				alert("請選擇相片");
			}
		}
		//刪除
		Delete = (id) => {
			const { search } = this.state;
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
				this.handleGoNextPage(1,);
				this.props.history.push(`/books/1/${search}`);
			}
			this.props.DELETE_Book(id, callback);
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
		drop_down = (e) => {
			if (e === 'add') {
				this.setState({
					add: !this.state.add,
					Title: "",
					Publisher: "",
					Time: "",
					ISBN: "",
					participate: [],
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
			else if (e === 'drop') {
				this.setState({
					drop: !this.state.drop,
				})
			}
			else if (e === 'photo') {
				this.setState({
					photo: !this.state.photo,
				})
			}
		}
		handleMouseDown = (e) => {
			const cn = (e.target.className);
			const name = (cn.length >= 6 ? cn.substr(0, 6) : '');
			if (e.target.className === "window") {
				this.setState({
					add: false,
					edit: false,
					delO: false,
					delAll: false,
					drop: false,
					photo: false,
					Id: "",
					Title: "",
					Publisher: "",
					Time: "",
					ISBN: "",
					participate: [],
					upload: {},
				})
			}
			else if (name !== "choose") {
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
		handleSelectMember = e => {
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
		handleSetNow = (e) => {
			const { id } = e.target;
			const info = id.split(",");
			this.setState({
				nowItem: {
					Id: info[0],
					Title: info[1],
				},
			});
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
		handleAllChange = e => {
			const checkboxes = document.getElementsByName('Box');
			for (let i = 0; i < checkboxes.length; i++) {
				checkboxes[i].checked = e.target.checked;
				this.handleOnClick(checkboxes[i]);
			}
		}
		handleOnClick = e => {
			const { BookList } = this.props;
			let array = this.state.array;
			const num = BookList.list.length;
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
		//取得現在時間
		handleGetnow = () => {
			const today = new Date().toISOString().split("T");
			const ISO = today[0];
			return (ISO);
		}
		render() {
			const { table_header, array, drop, photo, Title, Publisher, Time, ISBN, participate, upload, nowItem, } = this.state;
			const { add, edit, delO, delAll } = this.state;
			const { pagearray, page, search, maxpage } = this.state;
			const { BookList, PublicMemberList, BookInfo } = this.props;
			return (
				<div id='book'>
					<BackLayout>
						<div className='bg'>
							<div className="work">
								<div className="edit_button">
									<div onClick={() => this.drop_down('add')} className="work_btn add_btn">
										新增出版品
									</div>
									<button
										disabled={array.length === 0 ? true : false}
										className="work_btn delete_btn"
										onClick={() => this.drop_down('delAll')}>
										批量刪除
									</button>
								</div>
								<div className="searchbar">
									<input type="text" placeholder="搜尋" id="search" value={search} onChange={this.handleInputChange.bind(this)} />
									<div className="submit">
										<input type="image" src={searchbtn} alt="送出" onClick={() => this.handleGoNextPage(1, search.trim())} />
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
												onChange={this.handleAllChange}
											/>
										</th>
										<th className="col-05">#</th>
										<th>{table_header[0]}</th>
										<th className="col-3">{table_header[1]}</th>
										<th className="col-1_5">{table_header[2]}</th>
										<th className="col-1"></th>
									</tr>
								</thead>
								<tbody>
									{(BookList === undefined || BookList.list.length === 0) ?
										<tr>
											<td className='nocontent' colSpan={table_header === undefined ? "1" : table_header.length + 3}>
												暫無資料
											</td>
										</tr>
										: BookList.list.map(
											(item, index) => {
												return (
													<tr key={`BookList${index}`} className={array.includes(`${item.Id}`) ? "onchange" : ""}>
														<td className="check">
															<input type="checkbox"
																name="Box"
																value={item.Id}
																onChange={(e) => { this.handleOnClick(e.target) }}
															/>
														</td>
														<td>{((page - 1) * 10) + index + 1}</td>
														<td>{BookList === undefined ? "" : item.Title}</td>
														<td className='author'>
															{item.Authors === undefined ? "" : item.Authors.map((item, index) => {
																return (
																	<span key={`author${index}`}>{BookList === undefined ? "" : item.name} </span>
																)
															})}
														</td>
														<td>{BookList === undefined ? "" : item.Time}</td>
														<td>
															<div className="action">
																<div onClick={() => this.drop_down('edit')} className="svg">
																	<svg onClick={(e) => this.GET_BookInfo(item.Id, e)}
																		width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path
																			d="M17.5375 2.83605L15.1747 0.463507C14.5232 -0.190681 13.4207 -0.147876 12.7142 0.563335C12.0076 1.27278 11.9615 2.3815 12.6148 3.03568L14.9776 5.40822C15.6291 6.06241 16.7315 6.01963 17.4398 5.3084C18.1464 4.59719 18.1908 3.49203 17.5375 2.83605ZM2.47467 10.8432L7.20033 15.5882L14.88 7.87883L10.1543 3.13374L2.47467 10.8432ZM0 18L6.23283 16.7469L1.24799 11.7415L0 18Z" fill="#51718C" />
																	</svg>
																	<div className="hover">
																		編輯
																	</div>
																</div>
																<div onClick={() => this.drop_down('delO')} className="svg">
																	<svg id={`${item.Id},${item.Title}`} onClick={this.handleSetNow.bind()}
																		width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path id={`${item.Id},${item.Title}`} onClick={this.handleSetNow.bind()}
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
						{/* 新增 */}
						<div
							className={add ? "popup_background active" : "popup_background"}
							onClick={this.handleMouseDown}
						>
							<div className="window">
								<div className="form">
									<h1 className="title">
										新增出版品
										<div className="close">
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M24 2.4L21.6 0L12 9.6L2.4 0L0 2.4L9.6 12L0 21.6L2.4 24L12 14.4L21.6 24L24 21.6L14.4 12L24 2.4Z" fill="#51718C" />
											</svg>
											<div className="close_btn" onClick={() => this.drop_down('add')} />
										</div>
									</h1>
									<div className="inputContainer">
										<input
											type="text"
											className="input"
											placeholder=" "
											required="required"
											maxLength='100'
											id='Title'
											value={Title}
											onChange={this.handleInputChange.bind(this)}
										/>
										<label className="label">
											書名*
										</label>
									</div>
									<div className="inputContainer">
										<input
											type="text"
											className="input"
											placeholder=" "
											required="required"
											maxLength='50'
											id='Publisher'
											value={Publisher}
											onChange={this.handleInputChange.bind(this)}
										/>
										<label className="label">
											出版社*
										</label>
									</div>
									<div className="inputContainer">
										<input
											type="date"
											className="input"
											placeholder=" "
											max={this.handleGetnow()}
											required="required"
											id='Time'
											value={Time}
											onChange={this.handleInputChange.bind(this)}
										/>
										<label className="label">
											出版時間*
										</label>
									</div>
									{/* 選擇參與人員 */}
									<div className="inputContainer">
										<input
											type="text"
											className="input"
											placeholder=" "
											required="required"
											maxLength='50'
											id='ISBN'
											value={ISBN}
											onChange={this.handleInputChange.bind(this)}
										/>
										<label className="label">
											ISBN*
										</label>
									</div>
									{/* 參與人員 */}
									<div className="inputContainer">
										<div className="inputbox">
											<div className={drop === true ? "set col-12 focus" : "set col-12"}>
												<div
													className='choose input'
													onClick={() => this.drop_down('drop')}
												>
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
																	key={`participate2${index}`}
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
												<label className="label">作者*</label>
											</div>
										</div>
									</div>
									{/* 選擇出版品圖片 */}
									<div id='file'>
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
												onClick={this.AddBook}
											>
												確定
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* 修改 */}
						<div
							className={edit ? "popup_background active" : "popup_background"}
							onClick={this.handleMouseDown}
						>
							<div className="window">
								<div className="form bookform">
									<h1 className="title">

										<div className="close">
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M24 2.4L21.6 0L12 9.6L2.4 0L0 2.4L9.6 12L0 21.6L2.4 24L12 14.4L21.6 24L24 21.6L14.4 12L24 2.4Z" fill="#51718C" />
											</svg>
											<div className="close_btn" onClick={() => this.drop_down('edit')} />
										</div>
									</h1>
									<div className='bookinfo'>
										<div className='bookimg'>
											<div className='imgbox'>
												<img src={BookInfo === undefined ? "" : `https://jacklab.servehttp.com/${BookInfo.Image}`} alt="出版品" />
											</div>
											<img src={camera} alt="更換頭像" onClick={() => this.drop_down('photo')} className='camera' />
										</div>
										<div className='info'>
											{/* <h2>{BookInfo===undefined?"":BookInfo.Title}</h2> */}
											<div className="inputContainer">
												<input
													type="text"
													className="input"
													placeholder=" "
													required="required"
													maxLength='100'
													id='Title'
													value={Title}
													onChange={this.handleInputChange.bind(this)}
												/>
												<label className="label">
													書名*
												</label>
											</div>
											<div className="inputContainer">
												<input
													type="text"
													className="input"
													placeholder=" "
													required="required"
													maxLength='50'
													id='Publisher'
													value={Publisher}
													onChange={this.handleInputChange.bind(this)}
												/>
												<label className="label">
													出版社*
												</label>
											</div>
											<div className="inputContainer">
												<input
													type="date"
													className="input"
													placeholder=" "
													max={this.handleGetnow()}
													required="required"
													id='Time'
													value={Time}
													onChange={this.handleInputChange.bind(this)}
												/>
												<label className="label">
													出版時間*
												</label>
											</div>
											{/* 選擇參與人員 */}
											<div className="inputContainer">
												<input
													type="text"
													className="input"
													placeholder=" "
													required="required"
													maxLength='50'
													id='ISBN'
													value={ISBN}
													onChange={this.handleInputChange.bind(this)}
												/>
												<label className="label">
													ISBN*
												</label>
											</div>
											{/* 參與人員 */}
											<div className="inputContainer">
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
																	key={`participate3${index}`}
																>
																	<p>{item.name}
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
																			key={`participate4${index}`}
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
														<label className="label">作者*</label>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className='btn_block'>
										<button
											className="submitBtn"
											onClick={this.UpdateBookInfo}
										>
											修改
										</button>
									</div>
								</div>
							</div>
						</div>
						{/* 修改出版品圖片 */}
						<div
							className={photo ? "popup_background active" : "popup_background"}
							onClick={this.handleMouseDown}
						>
							<div className="window">
								<div className="form">
									<h1 className="title">
										修改出版品圖片
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
											onClick={this.UpdateBookPhoto}
										>
											修改
										</button>
									</div>
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
										是否刪除出版品<br />
										「{nowItem === undefined ? "" : nowItem.Title}」
									</h2>
									<div className='btn_block'>
										<button
											className="submitBtn"
											onClick={(e) => this.Delete(nowItem === undefined ? "" : nowItem.Id, e)}
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
				</div>
			)
		}
	}
)