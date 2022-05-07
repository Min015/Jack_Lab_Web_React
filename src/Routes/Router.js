import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import GameList from './front_desk/game/GameList';
import AddGame from './front_desk/game/AddGame';
import LabProject from './front_desk/project/LabProject';
import AddProject from './front_desk/project/AddProject';
import Meeting from './front_desk/meeting/Meeting';
import AddMeeting from './front_desk/meeting/AddMeeting';
import ProjectInfo from './front_desk/project/info/ProjectInfo';
import MeetingInfo from './front_desk/meeting/info/MeetingInfo';
import SetInfo from './front_desk/setInfo/SetInfo';

import AdminAlbum from './admin/index/album/AdminAlbum';
import Books from './admin/index/book/Books';

import LabIntroduce from './admin/introduce/lab/LabIntroduce';
import TeacherIntroduce from './admin/introduce/teacher/TeacherIntroduce';

import PermissionManage from './admin/permission/PermissionManage';

import Member from './admin/member/Member';

import MeetingManage from './admin/meeting/MeetingManage';
import AdMeetingInfo from './admin/meeting/MeetingInfo';

import GameManage from './admin/game/gamelist/GameManage';
import AdGameInfo from './admin/game/gamelist/GameInfo';
import GTypeManage from './admin/game/class/GTypeManage';
import AdProjectInfo from './admin/project/case/ProjectInfo';

import CaseManage from './admin/project/case/CaseManage';
import TypeManage from './admin/project/type/TypeManage';

import Index from './guest/index/Index';

import Student from './guest/lab_member/Student';
import NoRoute from '../Routes/Notfound/NoRoute';
import UpdateMeeting from './front_desk/meeting/UpdateMeeting';
import GameInfo from './front_desk/game/info/GameInfo';

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "../Reducers";
import MeetingMiddlewares from '../Middlewares/MeetingMiddlewares'
import MemberMiddlewares from '../Middlewares/MemberMiddlewares'


const Meetingmiddlewares = [MeetingMiddlewares, thunk];
const Membermiddlewares = [MemberMiddlewares, thunk];
const store = createStore(
	reducers,
	compose(
		applyMiddleware(
			...Meetingmiddlewares,
			...Membermiddlewares
			),
	)
);


export default (
	<Provider store={store}>
		<BrowserRouter>
			<Switch>
				<Route path='/' exact component={() => <Redirect to='/Index' />} />
				<Route path='/game' exact component={GameList} />
				<Route path='/game/gameinfo/:id' exact component={GameInfo} />
				<Route path='/game/addgame' exact component={AddGame} />

				<Route path='/project' exact component={LabProject} />
				<Route path='/project/addproject' exact component={AddProject} />
				<Route path='/project/projectinfo' exact component={ProjectInfo} />

				<Route path='/meeting' exact component={Meeting} />
				<Route path='/meeting/meetinginfo/:id' exact component={MeetingInfo} />
				<Route path='/meeting/updatemeeting/:id' exact component={UpdateMeeting} />
				<Route path='/meeting/addmeeting' exact component={AddMeeting} />

				<Route path='/setinfo' exact component={SetInfo} />

				<Route path='/adminalbum' exact component={AdminAlbum} />
				<Route path='/books' exact component={Books} />

				<Route path='/teacherintroduce' exact component={TeacherIntroduce} />
				<Route path='/labintroduce' exact component={LabIntroduce} />

				<Route path='/pemissionManage' exact component={PermissionManage} />

				<Route path='/member' exact component={Member} />

				<Route path='/meetingmanage' exact component={MeetingManage} />
				<Route path="/meetingmanage/meetinginfo" exact component={AdMeetingInfo} />


				<Route path='/gamemanage' exact component={GameManage} />
				<Route path='/gamemanage/gameinfo' exact component={AdGameInfo} />
				<Route path='/gtypemanage' exact component={GTypeManage} />


				<Route path='/casemanage' exact component={CaseManage} />
				<Route path='/casemanage/caseinfo' exact component={AdProjectInfo} />
				<Route path='/typemange' exact component={TypeManage} />






				<Route path='/index' exact component={Index} />
				<Route path='/student' exact component={Student} />


				<Route path='*' exact component={NoRoute} />
				{/* 找不到 */}
			</Switch>
		</BrowserRouter>
	</Provider>
);