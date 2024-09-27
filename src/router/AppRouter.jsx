import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import SignupPage from '../pages/signup/SignupPage';
import SignupSuccessPage from '../pages/signup/SignupSuccessPage';
import GroupDetail from '../pages/group/GroupDetail';
import MeetingMain from '../pages/meetingPage/MeetingMain';
import Meeting from '../pages/meetingPage/Meeting';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path='/signupsuccess' element={<SignupSuccessPage/>} />
      <Route path='/groupdetail' element={<GroupDetail/>} />
      <Route path='/meetingMain' element={<MeetingMain/>}/>
      <Route path='/meeting' element={<Meeting/>}/>
    </Routes>
  </Router>
);

export default AppRouter;
