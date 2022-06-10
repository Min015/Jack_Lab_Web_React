import React, { Component } from 'react';
import { connect } from "react-redux";
import '../main_category/category.scss';
import MemberLayout from '../../../Components/Layout/front/member/MemberLayout';
import { Link } from 'react-router-dom';
import CreateTable from './CreateTable';
import { handleGetPage } from '../../../Utils/MyClass';
import {
	GET_Project,
	DELETE_Project,
	GET_ProjectTypeAll
} from '../../../Action/ProjectAction';
import { SAVE_Permission, } from '../../../Action/MemberAction';

const mapStateToProps = state => {
	return {
		Project: state.projectReducer.Project,
		ProjectTypeAll: state.projectReducer.ProjectTypeAll,
		MyPermission: state.memberReducer.MyPermission,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		GET_Project: (page, search, id, callback) => dispatch(GET_Project(page, search, id, callback)),
		GET_ProjectTypeAll: () => dispatch(GET_ProjectTypeAll()),
		DELETE_Project: (payload, callback) => dispatch(DELETE_Project(payload, callback)),
		SAVE_Permission: () => dispatch(SAVE_Permission()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(
	class LabProject extends Component {
		state = {
			array: [],
			table_header: [
				"專案類型",
				"專案名",
				"建立者",
				"建立時間",
				"相關標籤",
				"操作",
			],
			delO: false,
			delAll: false,
			now: {
				Id: "",
				Name: "",
				Record_count: "",
			}
		}
		//生命週期
		componentDidMount = async () => {
			const { match } = this.props;
			const { params } = match;
			const nowpage = params.page;
			const nowsearch = params.search;
			const nowtype = params.ptype;
			this.setState({
				page: nowpage,
				search: nowsearch,
				ptype: nowtype,
			})
			const callback = (res) => {
				const pagearray = handleGetPage(nowpage, res.page);
				this.setState({
					pagearray,
					maxpage: res.page,
				})
			}
			this.props.GET_Project(nowpage, nowsearch, nowtype, callback);
			this.props.GET_ProjectTypeAll();
			this.props.SAVE_Permission();
		}
		//換頁
		handleGoNextPage = (page, search = " ", ptype = " ") => {
			const callback = (res) => {
				const { match } = this.props;
				const { params } = match;
				const nowpage = params.page;
				const nowsearch = params.search;
				const nowtype = params.ptype;
				const pagearray = handleGetPage(nowpage, res.page);
				this.setState({
					pagearray,
					page: nowpage,
					search: nowsearch,
					ptype: nowtype,
					maxpage: res.page,
				})
			}
			this.props.history.push(`/project/${page}/${search}/${ptype}`);
			this.props.GET_Project(page, search, ptype, callback);
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

		render() {
			const { table_header, pagearray, page, search, maxpage, ptype } = this.state;
			const { Project, ProjectTypeAll, MyPermission } = this.props;
			return (
				<div id='fornt_main'>
					<MemberLayout>
						<div className="works_area">
							<div className="select_list">
								<select
									name="class"
									className="select"
									id='ptype'
									value={ptype}
									onChange={this.handleInputChange.bind(this)}
								>
									<option value=" ">全部</option>
									{(ProjectTypeAll === undefined || ProjectTypeAll.length === 0) ? "" : ProjectTypeAll.map((item, index) =>
										<option key={`ptype${index}`} value={item.Id}>{item.Name}</option>
									)}
								</select>
								<input type="text" placeholder="搜尋" className="search" id="search" value={search} onChange={this.handleInputChange.bind(this)} />
								<input type="submit" value="送出" className="submit" onClick={() => this.handleGoNextPage(1, search, ptype)} />
							</div>
							<div className={(MyPermission !== undefined && MyPermission !== [] && MyPermission.includes('P001')) ? "search_add" : "none"}>
								<div className="add">
									<Link to='/project/addproject'>
										<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M9.84375 11.8945H7.62891C7.58539 11.8945 7.54366 11.9118 7.5129 11.9426C7.48213 11.9734 7.46484 12.0151 7.46484 12.0586V13.043C7.46484 13.0865 7.48213 13.1282 7.5129 13.159C7.54366 13.1897 7.58539 13.207 7.62891 13.207H9.84375V15.4219C9.84375 15.4654 9.86103 15.5071 9.8918 15.5379C9.92257 15.5687 9.9643 15.5859 10.0078 15.5859H10.9922C11.0357 15.5859 11.0774 15.5687 11.1082 15.5379C11.139 15.5071 11.1562 15.4654 11.1562 15.4219V13.207H13.3711C13.4146 13.207 13.4563 13.1897 13.4871 13.159C13.5179 13.1282 13.5352 13.0865 13.5352 13.043V12.0586C13.5352 12.0151 13.5179 11.9734 13.4871 11.9426C13.4563 11.9118 13.4146 11.8945 13.3711 11.8945H11.1562V9.67969C11.1562 9.63618 11.139 9.59445 11.1082 9.56368C11.0774 9.53291 11.0357 9.51562 10.9922 9.51562H10.0078C9.9643 9.51562 9.92257 9.53291 9.8918 9.56368C9.86103 9.59445 9.84375 9.63618 9.84375 9.67969V11.8945ZM17.526 5.92061C17.649 6.04365 17.7188 6.20977 17.7188 6.38408V19.0312C17.7188 19.3942 17.4255 19.6875 17.0625 19.6875H3.9375C3.57451 19.6875 3.28125 19.3942 3.28125 19.0312V1.96875C3.28125 1.60576 3.57451 1.3125 3.9375 1.3125H12.6472C12.8215 1.3125 12.9896 1.38223 13.1127 1.50527L17.526 5.92061ZM16.2053 6.68555L12.3457 2.82598V6.68555H16.2053Z" fill="white" />
										</svg>
										<p>新增專案 </p>
									</Link>
								</div>
							</div>
						</div>
						<div className="reaults_area">
							<CreateTable table_header={table_header} table_content={((Project === undefined || Project.list.length === 0) ? [] : Project.list)} />
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
					</MemberLayout>
				</div>
			)
		}
	}
)