import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import SignupPage from '../pages/signup/SignupPage';
import SignupSuccessPage from '../pages/signup/SignupSuccessPage';

import MeetingDetail from '../pages/meeting/MeetingDetail'
import MeetingAccept from '../pages/meeting/MeetingAccept'
import MeetingUpdate from '../pages/meeting/MeetingUpdate'
import MettingInsert from '../pages/meeting/MettingInsert'
import MeetingMain from '../pages/meeting/MeetingMain';
import MeetingPost from '../pages/meeting/MeetingPost';
import MeetingChat from '../pages/meeting/MeetingChat';
import MeetingList from '../pages/meeting/MeetingList';


const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path='/signupsuccess' element={<SignupSuccessPage/>} />
      <Route path='/meeting/main' element={<MeetingMain/>}/>
      <Route path='/meeting/detail' element={<MeetingDetail/>} />
      <Route path='/meeting/update' element={<MeetingUpdate/>} />
      <Route path='/meeting/post' element={<MeetingPost/>} />
      <Route path='/meeting/chat' element={<MeetingChat/>} />
      <Route path='/meeting/list' element={<MeetingList />} />

      <Route path='/meeting/insert' element={<MettingInsert/>} />
      <Route path='/meeting/accept' element={<MeetingAccept/>} />

    </Routes>
  </Router>
);

export default AppRouter;
