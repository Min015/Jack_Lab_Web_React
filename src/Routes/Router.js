import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import GameList from './front_desk/game/GameList';
import AddGame from './front_desk/game/AddGame';
import LabProject from './front_desk/project/LabProject';
import AddProject from './front_desk/project/AddProject';
import Meeting from './front_desk/meeting/Meeting';
import AddMeeting from './front_desk/meeting/AddMeeting';
import ProjectInfo from './front_desk/project/ProjectInfo';
import MeetingInfo from './front_desk/meeting/MeetingInfo';
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
import GameInfo from './admin/game/gamelist/GameInfo';
import GTypeManage from './admin/game/class/GTypeManage';
import AdProjectInfo from './admin/project/case/ProjectInfo';

import CaseManage from './admin/project/case/CaseManage';
import GroupManage from './admin/project/group/GroupManage';
import TypeManage from './admin/project/type/TypeManage';
import PClassManage from './admin/project/class/PClassManage';

import Index from './guest/index/Index';
import TagManage from './admin/tag/TagManage';
import Student from './guest/lab_member/Student';
import NoRoute from '../Components/Notfound/NoRoute';
import UpdateMeeting from './front_desk/meeting/UpdateMeeting';

export default (
    <BrowserRouter>
        <Routes>
            <Route path='/' exact element={<Navigate to='/Index' />} />
            <Route path='/game' exact element={<GameList />} />
            <Route path='/game/addgame' exact element={<AddGame />} />
            <Route path='/project' exact element={<LabProject />} />
            <Route path='/project/addproject' exact element={<AddProject />} />
            <Route path='/project/projectinfo' exact element={<ProjectInfo />} />
            <Route path='/meeting' exact element={<Meeting />}/>
            <Route path='/meeting/meetinginfo/:id' exact element={<MeetingInfo/>}/>
            <Route path='/meeting/updatemeeting/:id' exact element={<UpdateMeeting/>}/>
            <Route path='/meeting/addmeeting' exact element={<AddMeeting />} />

            <Route path='/setinfo' exact element={<SetInfo />} />

            <Route path='/adminalbum' exact element={<AdminAlbum />} />
            <Route path='/books' exact element={<Books />} />

            <Route path='/teacherintroduce' exact element={<TeacherIntroduce />} />
            <Route path='/labintroduce' exact element={<LabIntroduce />} />

            <Route path='/pemissionManage' exact element={<PermissionManage />} />

            <Route path='/member' exact element={<Member />} />

            <Route path='/meetingmanage' exact element={<MeetingManage />} />
            <Route path="/meetingmanage/meetinginfo" exact element={<AdMeetingInfo />} />


            <Route path='/gamemanage' exact element={<GameManage />} />
            <Route path='/gamemanage/gameinfo' exact element={<GameInfo />} />
            <Route path='/gtypemanage' exact element={<GTypeManage />} />


            <Route path='/casemanage' exact element={<CaseManage />} />
            <Route path='/casemanage/caseinfo' exact element={<AdProjectInfo />} />
            <Route path='/groupmanage' exact element={<GroupManage />} />
            <Route path='/typemange' exact element={<TypeManage />} />
            <Route path='/pclassmange' exact element={<PClassManage />} />

            <Route path='/tagmanage' exact element={<TagManage />} />





            <Route path='/index' exact element={<Index />} />
            <Route path='/student' exact element={<Student />} />


            <Route path='*' exact element={<NoRoute />} />
            {/* 找不到 */}






        </Routes>
    </BrowserRouter>
);