import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';


import MemberLayout from '../../../Components/Layout/front/member/MemberLayout';
import '../main_category/category.scss';

import CreateTable from './CreateTable';
import { GET_Meeting, DELETE_Meeting } from '../../../Action/MeetingAction';
import { SAVE_Permission, } from '../../../Action/MemberAction';

const mapStateToProps = state => {
	return {
		MeetingList: state.meetingReducer.MeetingList,
		MyPermission: state.memberReducer.MyPermission,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		GET_Meeting: (page, search, callback) => dispatch(GET_Meeting(page, search, callback)),
		DELETE_Meeting: (payload, callback) => dispatch(DELETE_Meeting(payload, callback)),
		SAVE_Permission: () => dispatch(SAVE_Permission()),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(
	class Meeting extends Component {
		state = {
			table_header: [
				"會議主題",
				"會議日期",
				"會議地點",
				"記錄者",
				"相關標籤",
				"操作",
			],
		}
		//生命週期
		componentDidMount = async () => {
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
				this.handleGetPage(nowpage, res.page);
				this.props.SAVE_Permission();
			}
			this.props.GET_Meeting(nowpage, nowsearch, callback);
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
			this.props.history.push(`/meeting/${page}/${search}`);
			this.props.GET_Meeting(page, search, callback);
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
		render() {
			const { table_header } = this.state;
			const { MeetingList, MyPermission } = this.props;
			const { pagearray, page, search, maxpage } = this.state;
			return (
				<div id='fornt_main'>
					<MemberLayout>
						<div className="works_area">
							<div className="select_list">
								{/* <select name="year" required className="select">
									{year.map((item, index) => {
										return (
											<option key={index} value={item}>{item}</option>
										)
									})}
								</select> */}
								<input type="text" placeholder="輸入搜尋值" className="search" id="search" value={search} onChange={this.handleInputChange.bind(this)} />
								<input type="submit" value="送出" className="submit" onClick={() => this.handleGoNextPage(1, search)} />
							</div>
							<div className={(MyPermission !== undefined && MyPermission !== [] && MyPermission.includes('M001')) ? "search_add" : "none"}>
								<div className="add">
									<Link to='/meeting/addmeeting'>
										<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M9.84375 11.8945H7.62891C7.58539 11.8945 7.54366 11.9118 7.5129 11.9426C7.48213 11.9734 7.46484 12.0151 7.46484 12.0586V13.043C7.46484 13.0865 7.48213 13.1282 7.5129 13.159C7.54366 13.1897 7.58539 13.207 7.62891 13.207H9.84375V15.4219C9.84375 15.4654 9.86103 15.5071 9.8918 15.5379C9.92257 15.5687 9.9643 15.5859 10.0078 15.5859H10.9922C11.0357 15.5859 11.0774 15.5687 11.1082 15.5379C11.139 15.5071 11.1562 15.4654 11.1562 15.4219V13.207H13.3711C13.4146 13.207 13.4563 13.1897 13.4871 13.159C13.5179 13.1282 13.5352 13.0865 13.5352 13.043V12.0586C13.5352 12.0151 13.5179 11.9734 13.4871 11.9426C13.4563 11.9118 13.4146 11.8945 13.3711 11.8945H11.1562V9.67969C11.1562 9.63618 11.139 9.59445 11.1082 9.56368C11.0774 9.53291 11.0357 9.51562 10.9922 9.51562H10.0078C9.9643 9.51562 9.92257 9.53291 9.8918 9.56368C9.86103 9.59445 9.84375 9.63618 9.84375 9.67969V11.8945ZM17.526 5.92061C17.649 6.04365 17.7188 6.20977 17.7188 6.38408V19.0312C17.7188 19.3942 17.4255 19.6875 17.0625 19.6875H3.9375C3.57451 19.6875 3.28125 19.3942 3.28125 19.0312V1.96875C3.28125 1.60576 3.57451 1.3125 3.9375 1.3125H12.6472C12.8215 1.3125 12.9896 1.38223 13.1127 1.50527L17.526 5.92061ZM16.2053 6.68555L12.3457 2.82598V6.68555H16.2053Z" fill="white" />
										</svg>
										<p>新增會議</p>
									</Link>
								</div>
							</div>
						</div>
						<div className="reaults_area">
							<CreateTable table_header={table_header} table_content={((MeetingList === undefined || MeetingList.length === 0) ? [] : MeetingList.list)} />
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
										{pagearray === undefined ? "" : pagearray.map((item, index) =>
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
					</MemberLayout>
				</div>
			)
		}
	}
)
