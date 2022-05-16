import { Component } from 'react';
import { connect } from "react-redux";
import BackLayout from '../../../../Components/Layout/back/BackLayout';
import '../../style/mainstyle.scss';
import '../../../../Mixin/popup_window.scss'
import search from '../../style/img/searchButton.png';
import photo from '../../../guest/index/img/img1.jpg';
import { GET_AdminAlbum, } from '../../../../Action/GuestindexAction';
const mapStateToProps = state => {
	console.log("state=>", state);
	const { guestindexReducer } = state;
	return (
		guestindexReducer
	)
}

const mapDispatchToProps = dispatch => {
	return {
		GET_AdminAlbum: () => dispatch(GET_AdminAlbum()),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(
	class AdminAlbum extends Component {
		state = {
			add: false,
			edit: false,
			del: false,
			previview: false,
			upload: {},
			array: [],
			table_header: [
				"標題",
				"上傳時間",
			],
		}
		//生命週期
		componentDidMount = () => {
			this.props.GET_AdminAlbum();
		}
		drop_down = (e) => {
			if (e === 'add') {
				this.setState({
					add: !this.state.add,
				})
			}
			else if (e === 'edit') {
				this.setState({
					edit: !this.state.edit,
				})
			}
			else if (e === 'del') {
				this.setState({
					del: !this.state.del,
				})
			}
			else if (e === 'previview') {
				this.setState({
					previview: !this.state.previview,
				})
			}
		}
		handelMouseDown = (e) => {
			if (e.target.className === "window") {
				this.setState({
					add: false,
					edit: false,
				})
			}
		}
		handelSetNow = (e) => {
			const { id } = e.target;
			console.log(id);
			const info = id.split(",")
			this.setState({
				now: {
					Id: info[0],
					Title: info[1],
					Image: info[2],
				},
			})
		}
		handelAllChange = e => {
			const checkboxes = document.getElementsByName('Box');
			for (let i = 0; i < checkboxes.length; i++) {
				checkboxes[i].checked = e.target.checked;
				this.handelOnClick(checkboxes[i]);
			}
		}
		handelOnClick = e => {
			let array = this.state.array;
			const num = this.state.table_content.length;
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
		handleSelectFile = (file) => {
			console.log(file[0]);
			this.setState({
				upload: file[0]
			})
		}
		render() {
			const { table_header, array, add, edit
				, upload, now, previview, } = this.state;
			const { AlbumList } = this.props
			console.log(now);
			return (
				<BackLayout>
					<div className="work">
						<div className="edit_button">
							<div className="work_btn add_btn" onClick={() => this.drop_down('add')}>
								新增相片
							</div>
							<div className="work_btn delete_btn">
								<p>批量刪除</p>
							</div>
						</div>
						<form action="" className="searchbar">
							<input type="text" required placeholder="搜尋" />
							<div className="submit">
								<input type="image" src={search} alt="送出" />
							</div>
						</form>
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
								<th className="col-05 ">#</th>
								<th>{table_header[0]}</th>
								<th className="col-1_5">{table_header[1]}</th>
								<th className="col-1"></th>
							</tr>
						</thead>
						<tbody>
							{AlbumList === undefined ? "" : AlbumList.map(
								(item, index) => {
									return (
										<tr key={index} className={array.includes(`${item.Id}`) ? "onchange" : ""} >
											<td className="check">
												<input type="checkbox"
													name="Box"
													value={item.Id}
													onChange={(e) => { this.handelOnClick(e.target) }}
												/>
											</td>
											<td>{index + 1}</td>
											<td>{item.Title}</td>
											<td>{item.CreateTime.substr(0, 10)}</td>
											<td>
												<div className="action">
													<div onClick={(e) => this.drop_down('previview')} className="svg">
														<svg id={`${item.Id},${item.Title},${item.Image}`} onClick={this.handelSetNow.bind()}
															width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path id={`${item.Id},${item.Title},${item.Image}`} onClick={this.handelSetNow.bind()}
																d="M11.0769 7.26923V7.96154C11.0769 8.05529 11.0427 8.13642 10.9742 8.20493C10.9056 8.27344 10.8245 8.30769 10.7308 8.30769H8.30769V10.7308C8.30769 10.8245 8.27344 10.9056 8.20493 10.9742C8.13642 11.0427 8.05529 11.0769 7.96154 11.0769H7.26923C7.17548 11.0769 7.09435 11.0427 7.02584 10.9742C6.95733 10.9056 6.92308 10.8245 6.92308 10.7308V8.30769H4.5C4.40625 8.30769 4.32512 8.27344 4.25661 8.20493C4.1881 8.13642 4.15385 8.05529 4.15385 7.96154V7.26923C4.15385 7.17548 4.1881 7.09435 4.25661 7.02584C4.32512 6.95733 4.40625 6.92308 4.5 6.92308H6.92308V4.5C6.92308 4.40625 6.95733 4.32512 7.02584 4.25661C7.09435 4.1881 7.17548 4.15385 7.26923 4.15385H7.96154C8.05529 4.15385 8.13642 4.1881 8.20493 4.25661C8.27344 4.32512 8.30769 4.40625 8.30769 4.5V6.92308H10.7308C10.8245 6.92308 10.9056 6.95733 10.9742 7.02584C11.0427 7.09435 11.0769 7.17548 11.0769 7.26923ZM12.4615 7.61539C12.4615 6.28125 11.9874 5.14002 11.0391 4.19171C10.0907 3.24339 8.94952 2.76923 7.61539 2.76923C6.28125 2.76923 5.14002 3.24339 4.19171 4.19171C3.24339 5.14002 2.76923 6.28125 2.76923 7.61539C2.76923 8.94952 3.24339 10.0907 4.19171 11.0391C5.14002 11.9874 6.28125 12.4615 7.61539 12.4615C8.94952 12.4615 10.0907 11.9874 11.0391 11.0391C11.9874 10.0907 12.4615 8.94952 12.4615 7.61539ZM18 16.6154C18 16.9976 17.8648 17.3239 17.5944 17.5944C17.3239 17.8648 16.9976 18 16.6154 18C16.226 18 15.9014 17.863 15.6418 17.5889L11.9315 13.8894C10.6406 14.7837 9.20192 15.2308 7.61539 15.2308C6.58413 15.2308 5.59796 15.0306 4.65685 14.6304C3.71575 14.2302 2.90445 13.6893 2.22296 13.0078C1.54147 12.3263 1.0006 11.515 0.600361 10.5739C0.20012 9.63281 0 8.64664 0 7.61539C0 6.58413 0.20012 5.59796 0.600361 4.65685C1.0006 3.71575 1.54147 2.90445 2.22296 2.22296C2.90445 1.54147 3.71575 1.0006 4.65685 0.600361C5.59796 0.20012 6.58413 0 7.61539 0C8.64664 0 9.63281 0.20012 10.5739 0.600361C11.515 1.0006 12.3263 1.54147 13.0078 2.22296C13.6893 2.90445 14.2302 3.71575 14.6304 4.65685C15.0306 5.59796 15.2308 6.58413 15.2308 7.61539C15.2308 9.20192 14.7837 10.6406 13.8894 11.9315L17.5998 15.6418C17.8666 15.9087 18 16.2332 18 16.6154Z" fill="#51718C" />
														</svg>
														<div className="hover">
															預覽
														</div>
													</div>
													<div className="svg" onClick={() => this.drop_down('edit')}>
														<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M17.5375 2.83605L15.1747 0.463507C14.5232 -0.190681 13.4207 -0.147876 12.7142 0.563335C12.0076 1.27278 11.9615 2.3815 12.6148 3.03568L14.9776 5.40822C15.6291 6.06241 16.7315 6.01963 17.4398 5.3084C18.1464 4.59719 18.1908 3.49203 17.5375 2.83605ZM2.47467 10.8432L7.20033 15.5882L14.88 7.87883L10.1543 3.13374L2.47467 10.8432ZM0 18L6.23283 16.7469L1.24799 11.7415L0 18Z" fill="#51718C" />
														</svg>
														<div className="hover">
															編輯
														</div>
													</div>
													<div className="svg">
														<svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M1.01504 16.3125C1.01504 16.7601 1.17545 17.1893 1.46098 17.5058C1.74652 17.8222 2.13379 18 2.53759 18H11.6729C12.0767 18 12.464 17.8222 12.7495 17.5058C13.0351 17.1893 13.1955 16.7601 13.1955 16.3125V4.50001H1.01504V16.3125ZM9.64286 7.31251C9.64286 7.16332 9.69633 7.02025 9.79151 6.91476C9.88668 6.80927 10.0158 6.75001 10.1504 6.75001C10.285 6.75001 10.4141 6.80927 10.5092 6.91476C10.6044 7.02025 10.6579 7.16332 10.6579 7.31251V15.1875C10.6579 15.3367 10.6044 15.4798 10.5092 15.5853C10.4141 15.6908 10.285 15.75 10.1504 15.75C10.0158 15.75 9.88668 15.6908 9.79151 15.5853C9.69633 15.4798 9.64286 15.3367 9.64286 15.1875V7.31251ZM6.59774 7.31251C6.59774 7.16332 6.65122 7.02025 6.74639 6.91476C6.84157 6.80927 6.97066 6.75001 7.10526 6.75001C7.23987 6.75001 7.36896 6.80927 7.46413 6.91476C7.55931 7.02025 7.61278 7.16332 7.61278 7.31251V15.1875C7.61278 15.3367 7.55931 15.4798 7.46413 15.5853C7.36896 15.6908 7.23987 15.75 7.10526 15.75C6.97066 15.75 6.84157 15.6908 6.74639 15.5853C6.65122 15.4798 6.59774 15.3367 6.59774 15.1875V7.31251ZM3.55263 7.31251C3.55263 7.16332 3.6061 7.02025 3.70128 6.91476C3.79646 6.80927 3.92555 6.75001 4.06015 6.75001C4.19475 6.75001 4.32384 6.80927 4.41902 6.91476C4.5142 7.02025 4.56767 7.16332 4.56767 7.31251V15.1875C4.56767 15.3367 4.5142 15.4798 4.41902 15.5853C4.32384 15.6908 4.19475 15.75 4.06015 15.75C3.92555 15.75 3.79646 15.6908 3.70128 15.5853C3.6061 15.4798 3.55263 15.3367 3.55263 15.1875V7.31251ZM13.703 1.12501H9.89662L9.59845 0.467584C9.53529 0.327035 9.43799 0.208807 9.31751 0.126203C9.19703 0.0435979 9.05814 -0.000106452 8.91647 6.16385e-06H5.29088C5.14953 -0.000596082 5.01089 0.0429453 4.89083 0.125642C4.77078 0.208338 4.67417 0.326845 4.61208 0.467584L4.31391 1.12501H0.507519C0.372916 1.12501 0.243827 1.18427 0.148649 1.28976C0.0534706 1.39525 0 1.53832 0 1.68751L0 2.81251C0 2.96169 0.0534706 3.10477 0.148649 3.21025C0.243827 3.31574 0.372916 3.37501 0.507519 3.37501H13.703C13.8376 3.37501 13.9667 3.31574 14.0619 3.21025C14.1571 3.10477 14.2105 2.96169 14.2105 2.81251V1.68751C14.2105 1.53832 14.1571 1.39525 14.0619 1.28976C13.9667 1.18427 13.8376 1.12501 13.703 1.12501Z" fill="#51718C" />
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
					<div
						className={add ? "popup_background active" : "popup_background"}
						onClick={this.handelMouseDown}
					>
						<div className="window">
							<div className="form">
								<h1 className="title">
									新增輪播圖
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
										placeholder="標題"
										required="required"

									// onChange={this.handelInput}
									/>
									<label for="Email" className="label">

									</label>
								</div>
								<div id="filename">
									{upload.name}
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
					<div
						className={edit ? "popup_background active" : "popup_background"}
						onClick={this.handelMouseDown}
					>
						<div className="window">
							<div className="form">
								<h1 className="title">
									修改輪播圖
									<div className="close">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M24 2.4L21.6 0L12 9.6L2.4 0L0 2.4L9.6 12L0 21.6L2.4 24L12 14.4L21.6 24L24 21.6L14.4 12L24 2.4Z" fill="#51718C" />
										</svg>
										<div className="close_btn" onClick={() => this.drop_down('edit')} />
									</div>
								</h1>
								<div className="inputContainer">
									<input
										type="text"
										className="input"
										placeholder="標題"
										required="required"

									// onChange={this.handelInput}
									/>
									<label for="Email" className="label">

									</label>
								</div>
								<div id="filename">
									原輪播圖檔名
									{upload.name}
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
					<div
						className={previview ? "popup_background active" : "popup_background"}
						onClick={this.handelMouseDown}
					>
						<div className="window">
							<div className="form ablumform">
								<h1 className="title">
									{now === undefined ? "" : now.Title}
									<div className="close">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M24 2.4L21.6 0L12 9.6L2.4 0L0 2.4L9.6 12L0 21.6L2.4 24L12 14.4L21.6 24L24 21.6L14.4 12L24 2.4Z" fill="#51718C" />
										</svg>
										<div className="close_btn" onClick={() => this.drop_down('previview')} />
									</div>
								</h1>
								<div className='margin_t15 ablumform'>
									<div className='photo'>
										<img src={photo} /><br/>
										{/* <img src={now === undefined ? "" : now.Image}/><br/> */}
										{now === undefined ? "" : now.Image}
									</div>
								</div>
								{/* <div className='btn_block'>
									<button
										className="submitBtn"
										onClick={this.DownloadFile}>
										下載
									</button>
								</div> */}
							</div>
						</div>
					</div>
				</BackLayout>
			)
		}
	}
)