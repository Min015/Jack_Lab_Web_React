import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import GameList from './front_desk/game/GameList';
import AddGame from './front_desk/game/AddGame';
import GameInfo from './front_desk/game/info/GameInfo';

import LabProject from './front_desk/project/LabProject';
import AddProject from './front_desk/project/AddProject';
import ProjectInfo from './front_desk/project/info/ProjectInfo';
import UpdateProject from './front_desk/project/UpdateProject';

import Meeting from './front_desk/meeting/Meeting';
import AddMeeting from './front_desk/meeting/AddMeeting';
import MeetingInfo from './front_desk/meeting/info/MeetingInfo';
import UpdateMeeting from './front_desk/meeting/UpdateMeeting';

import SetInfo from './front_desk/setInfo/SetInfo';

import AdminAlbum from './admin/index/album/AdminAlbum';
import Books from './admin/index/book/Books';

import LabIntroduce from './admin/introduce/lab/LabIntroduce';
import TeacherIntroduce from './admin/introduce/teacher/TeacherIntroduce';

import PermissionManage from './admin/permission/PermissionManage';

import Member from './admin/member/Member';

import MeetingManage from './admin/meeting/MeetingManage';
import AdMeetingInfo from './admin/meeting/MeetingInfo';
import AdMeetingAdd from './admin/meeting/AdMeetingAdd';

import GameManage from './admin/game/gamelist/GameManage';
import AdGameInfo from './admin/game/gamelist/GameInfo';
import GTypeManage from './admin/game/class/GTypeManage';


import CaseManage from './admin/project/case/CaseManage';
import TypeManage from './admin/project/type/TypeManage';
import AdProjectInfo from './admin/project/case/ProjectInfo';
import AdCaseAdd from './admin/project/case/CaseAdd';

import Index from './guest/index/Index';

import Student from './guest/lab_member/Student';
import NoRoute from '../Routes/Notfound/NoRoute';

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from './../Reducers';
import MeetingMiddlewares from '../Middlewares/MeetingMiddlewares';
import MemberMiddlewares from '../Middlewares/MemberMiddlewares';
import SendfromDataMiddlewares from '../Middlewares/SendfromDataMiddlewares';
import ProjectMiddlewares from '../Middlewares/ProjectMiddlewares';
import GuestindexMiddlewares from '../Middlewares/GuestindexMiddlewares';
import IntroduceMiddlewares from '../Middlewares/IntroduceMiddlewares'
import { Router } from 'react-router-dom';


const Meetingmiddlewares = [MeetingMiddlewares, thunk];
const Membermiddlewares = [MemberMiddlewares, thunk];
const SendfromDatamiddlewares = [SendfromDataMiddlewares, thunk];
const Projectmiddlewares = [ProjectMiddlewares, thunk];
const Guestindexmiddlewares = [GuestindexMiddlewares, thunk];
const Introducemiddlewares = [IntroduceMiddlewares, thunk]


const store = createStore(
	reducer,
	compose(
		applyMiddleware(
			...Meetingmiddlewares,
			...Membermiddlewares,
			...SendfromDatamiddlewares,
			...Projectmiddlewares,
			...Guestindexmiddlewares,
			...Introducemiddlewares,
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

				<Route path='/project/updateproject/:id' exact component={UpdateProject}/>
				<Route path='/project/:page/:search/:ptype' exact component={LabProject} />
				<Route path='/project/addproject' exact component={AddProject} />
				<Route path='/project/projectinfo/:id/:page/:search' exact component={ProjectInfo} />
				<Route path='/project' exact component={() => <Redirect to='/project/1/ / ' />} />
				<Route path='/project/:page/:search/' exact component={() => <Redirect to='/project/1/ / ' />} />


				<Route path='/meeting/updatemeeting/:id' exact component={UpdateMeeting} />
				<Route path='/meeting/meetinginfo/:id' exact component={MeetingInfo} />
				<Route path='/meeting/:page/:search' exact component={Meeting} />
				<Route path='/meeting/addmeeting' exact component={AddMeeting} />
				<Route path='/meeting' exact component={() => <Redirect to='/meeting/1/ ' />} />


				<Route path='/setinfo/:page' exact component={SetInfo} />
				<Route path='/setinfo' exact component={() => <Redirect to='/setinfo/1' />} />
				{/* 後台 */}
				<Route path='/adminalbum/:page/:search' exact component={AdminAlbum} />
				<Route path='/adminalbum/:page' exact component={() => <Redirect to='/adminalbum/1/ ' />} />
				<Route path='/adminalbum' exact component={() => <Redirect to='/adminalbum/1/ ' />} />


				<Route path='/books/:page/:search' exact component={Books} />
				<Route path='/books/:page' exact component={() => <Redirect to='/books/1/ ' />} />
				<Route path='/books' exact component={() => <Redirect to='/books/1/ ' />} />


				<Route path='/teacherintroduce/:page/:search' exact component={TeacherIntroduce} />
				<Route path='/teacherintroduce/:page' exact component={() => <Redirect to='/teacherintroduce/1/ ' />} />
				<Route path='/teacherintroduce' exact component={() => <Redirect to='/teacherintroduce/1/ ' />} />

				<Route path='/labintroduce/:page/:search' exact component={LabIntroduce} />
				<Route path='/labintroduce/:page' exact component={() => <Redirect to='/labintroduce/1/ ' />} />
				<Route path='/labintroduce' exact component={() => <Redirect to='/labintroduce/1/ ' />} />


				<Route path='/pemissionmanage/:page/:search' exact component={PermissionManage} />
				<Route path='/pemissionmanage/:page' exact component={() => <Redirect to='/pemissionmanage/1/ ' />} />
				<Route path='/pemissionmanage' exact component={() => <Redirect to='/pemissionmanage/1/ ' />} />


				<Route path='/member/:page/:search/:academic' exact component={Member} />
				{/* <Route path='/member/:page/:search' exact component={Member} />
				<Route path='/member/:page' exact component={Member} />
				<Route path='/member' exact component={Member} /> */}
				<Route path='/member/:page/:search' exact component={() => <Redirect to='/member/1/ / ' />} />
				<Route path='/member/:page//' exact component={() => <Redirect to='/member/1/ / ' />} />
				<Route path='/member' exact component={() => <Redirect to='/member/1/ / ' />} />

				<Route path='/meetingmanage/meetingadd' exact component={AdMeetingAdd} />
				<Route path="/meetingmanage/meetinginfo/:id" exact component={AdMeetingInfo} />

				<Route path='/meetingmanage/:page/:search' exact component={MeetingManage} />
				<Route path='/meetingmanage/:page' exact component={() => <Redirect to='/meetingmanage/1/ ' />} />
				<Route path='/meetingmanage' exact component={() => <Redirect to='/meetingmanage/1/ ' />} />



				<Route path='/gamemanage' exact component={GameManage} />
				<Route path='/gamemanage/gameinfo' exact component={AdGameInfo} />
				<Route path='/gtypemanage' exact component={GTypeManage} />


				<Route path='/casemanage/caseadd' exact component={AdCaseAdd} />

				<Route path='/casemanage/:page/:search/:ptype' exact component={CaseManage} />
				<Route path='/casemanage/:page/:search' exact component={() => <Redirect to='/casemanage/1/ / ' />} />
				<Route path='/casemanage/:page' exact component={() => <Redirect to='/casemanage/1/ / ' />} />
				<Route path='/casemanage/:page//' exact component={() => <Redirect to='/casemanage/1/ / ' />} />

				<Route path='/casemanage' exact component={() => <Redirect to='/casemanage/1/ /   ' />} />
				<Route path='/casemanage/caseinfo/:id/:page/:search' exact component={AdProjectInfo} />


				<Route path='/typemange/:page/:search' exact component={TypeManage} />
				<Route path='/typemange/:page' exact component={() => <Redirect to='/typemange/1/ ' />} />
				<Route path='/typemange' exact component={() => <Redirect to='/typemange/1/ ' />} />






				<Route path='/index' exact component={Index} />
				<Route path='/student' exact component={Student} />


				<Route path='*' exact component={NoRoute} />
				{/* 找不到 */}
			</Switch>
		</BrowserRouter>
	</Provider>
);