import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import SignupPage from '../pages/signup/SignupPage';
import SignupSuccessPage from '../pages/signup/SignupSuccessPage';
import MeetingDetail from '../pages/meeting/MeetingDetail'
import MeetingUpdate from '../pages/meeting/MeetingUpdate'
import MeetingMain from '../pages/meeting/MeetingMain';



const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path='/signupsuccess' element={<SignupSuccessPage/>} />
      <Route path='/meeting/main' element={<MeetingMain/>}/>
      <Route path='/meeing/detail' element={<MeetingDetail/>} />
      <Route path='/meeting/update' element={<MeetingUpdate/>} />
    </Routes>
  </Router>
);

export default AppRouter;
