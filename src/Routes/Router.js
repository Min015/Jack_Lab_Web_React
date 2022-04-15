import React from 'react'
import {BrowserRouter,Routes,Route,Navigate,} from 'react-router-dom'

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
export default(
    <BrowserRouter>
    <Routes>
    <Route path='/' exact element={<Navigate to='/SetInfo'/>}/>
    <Route path='/Game' exact element={<GameList/>}/>
    <Route path='/Game/AddGame' exact element={<AddGame/>}/>
    <Route path='/Project' exact element={<LabProject/>}/>
    <Route path='/Project/AddProject' exact element={<AddProject/>}/>
    <Route path='/Project/ProjectInfo' exact element={<ProjectInfo/>}/>
    <Route path='/Meeting' exact element={<Meeting/>}/>
    <Route path='/Meeting/AddMeeting' exact element={<AddMeeting/>}/>
    <Route path='/Meeting/MeetingInfo' exact element={<MeetingInfo/>}/>
    <Route path='/SetInfo' exact element={<SetInfo/>}/>

    <Route path='/AdminAlbum' exact element={<AdminAlbum/>}/>
    <Route path='/Books' exact element={<Books/>}/>






    </Routes>
    </BrowserRouter>
);